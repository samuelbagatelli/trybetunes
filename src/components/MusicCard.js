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
    };
  }

  componentDidMount() {
    const { trackObj } = this.props;

    this.setState({
      trackObj,
    });
  }

  handleChange = () => {
    const { trackObj } = this.state;

    this.setState({ loading: true }, async () => {
      await addSong(trackObj);
      this.setState({ loading: false });
    });
  }

  render() {
    const { trackName, previewUrl, trackId, checked } = this.props;
    const { loading } = this.state;

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
              checked={ checked }
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
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
