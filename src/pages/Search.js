import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-search">
        {loading ? <Loading /> : (
          <Header
            loading={ loading }
          />
        )}
      </div>
    );
  }
}

Search.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Search;
