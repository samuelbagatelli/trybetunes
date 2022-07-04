import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchLoading: false,
      artistInput: '',
      artistSearch: '',
      responseAPI: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { artistSearch } = this.state;
    const param = artistSearch;
    this.setState({
      artistInput: param,
      artistSearch: '',
      searchLoading: true,
    }, async () => {
      const response = await searchAlbumsAPI(param);

      this.setState({
        searchLoading: false,
        responseAPI: response,
      });
    });
  }

  render() {
    const { loading, handleSubmit } = this.props;
    const { artistSearch, artistInput, searchLoading, responseAPI } = this.state;
    const SEARCH_VALIDATION = 2;

    return (
      <div data-testid="page-search">
        {loading ? <Loading /> : (
          <>
            <Header
              loading={ loading }
            />
            {searchLoading ? <Loading /> : (
              <>
                <form onSubmit={ handleSubmit }>
                  <label htmlFor="artistSearch">
                    <input
                      type="text"
                      data-testid="search-artist-input"
                      name="artistSearch"
                      value={ artistSearch }
                      onChange={ this.handleChange }
                    />
                  </label>
                  <button
                    type="submit"
                    data-testid="search-artist-button"
                    disabled={ artistSearch.length < SEARCH_VALIDATION }
                    onClick={ this.handleClick }
                  >
                    Pesquisar

                  </button>
                </form>
                {responseAPI && (
                  <>
                    <p>
                      Resultado de álbuns de:
                      {` ${artistInput}`}
                    </p>
                    {responseAPI.length === 0 ? <h2>Nenhum álbum foi encontrado</h2>
                      : (responseAPI.map((element) => (
                        <Link
                          to={ `/album/${element.collectionId}` }
                          key={ element.collectionId }
                          data-testid={ `link-to-album-${element.collectionId}` }
                        >
                          <div>
                            <img src={ element.artworkUrl100 } alt="album cover" />
                            <h3>{element.artistName}</h3>
                            <p>{element.collectionName}</p>
                          </div>
                        </Link>
                      )))}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Search;
