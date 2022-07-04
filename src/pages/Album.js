import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collection: '',
      albumContent: [],
    };
  }

  async componentDidMount() {
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

  render() {
    const { artistName, collection, albumContent } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{artistName}</h2>
        <h3 data-testid="album-name">{collection}</h3>
        {
          albumContent.map((element) => (
            <MusicCard
              key={ element.trackId }
              trackName={ element.trackName }
              previewUrl={ element.previewUrl }
            />
          ))
        }
      </div>
    );
  }
}

export default Album;
