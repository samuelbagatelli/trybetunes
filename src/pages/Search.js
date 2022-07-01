import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Search extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-search">
        {loading && <Loading />}
      </div>
    );
  }
}

Search.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Search;
