import React, { Component } from 'react';
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

      console.log(response.name);

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
          </>
        ) }
      </header>
    );
  }
}

export default Header;
