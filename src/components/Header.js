import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      username: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const response = await getUser();

      this.setState({
        username: response.name,
        loading: false,
      });
    });
  }

  render() {
    const { loading, username } = this.state;

    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (
          <>
            <h1>Header</h1>
            <p data-testid="header-user-name">{username}</p>
            <Link to="/search" data-testid="link-to-search" />
            <Link to="/favorites" data-testid="link-to-favorites" />
            <Link to="/profile" data-testid="link-to-profile" />
          </>
        ) }
      </header>
    );
  }
}

export default Header;
