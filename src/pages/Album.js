import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      artistName: '',
      collection: '',
      albumContent: [],
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    this.saveMusics();
    this.favoriteSongs();
  }

  saveMusics = async () => {
    const { pathname } = window.location;
    const URL_ID_FORMAT = 7;
    const collectionId = pathname.slice(URL_ID_FORMAT, pathname.length + 1);

    const response = await getMusics(collectionId);
    const tracks = response.filter((element) => element.kind === 'song');
    const artist = response[0].artistName;
    const collection = response[0].collectionName;
    this.setState({
      artistName: artist,
      collection,
      albumContent: tracks,
    });
  }

  favoriteSongs = () => {
    this.setState({ loading: true }, async () => {
      const response = await getFavoriteSongs();

      this.setState({
        favoriteSongs: response,
        loading: false,
      });
    });
  }

  render() {
    const { artistName, collection, albumContent, loading, favoriteSongs } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading />
          : (
            <>
              <h2 data-testid="artist-name">{artistName}</h2>
              <h3 data-testid="album-name">{collection}</h3>
              {
                albumContent.map((element) => (
                  <MusicCard
                    key={ element.trackId }
                    trackName={ element.trackName }
                    previewUrl={ element.previewUrl }
                    trackId={ element.trackId }
                    trackObj={ element }
                    favoriteSongs={ favoriteSongs }
                  />
                ))
              }
            </>
          )}
      </div>
    );
  }
}

export default Album;
