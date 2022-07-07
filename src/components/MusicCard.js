import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      trackObj: {},
      check: false,
    };
  }

  componentDidMount() {
    const { trackObj } = this.props;

    this.setState({
      trackObj,
    });
    this.checked();
  }

  handleChange = () => {
    const { trackObj, check } = this.state;

    this.setState({
      loading: true,
      check: !check,
    }, async () => {
      await addSong(trackObj);
      this.setState({ loading: false });
    });
  }

  checked = () => {
    const { favoriteSongs, trackObj } = this.props;

    const validation = favoriteSongs.some((obj) => obj.trackId === trackObj.trackId);
    console.log(validation);
    this.setState({ check: validation });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, check } = this.state;

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <form>
          <label htmlFor="favorita">
            Favorita
            <input
              type="checkbox"
              name="favorita"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleChange }
              checked={ check }
            />
            {loading && <Loading />}
          </label>
        </form>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  trackObj: PropTypes.objectOf.isRequired,
  favoriteSongs: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
