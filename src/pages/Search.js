import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistSearch: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { loading } = this.props;
    const { artistSearch } = this.state;
    const SEARCH_VALIDATION = 2;

    return (
      <div data-testid="page-search">
        {loading ? <Loading /> : (
          <>
            <Header
              loading={ loading }
            />
            <form>
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
              >
                Pesquisar

              </button>
            </form>
          </>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Search;
