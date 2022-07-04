import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      nameInput: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleClick = async () => {
    const { nameInput } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: nameInput });
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { nameInput, loading } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/album/:id">
              <Album />
            </Route>
            <Route path="/profile/edit">
              <ProfileEdit />
            </Route>
            <Route path="/search">
              <Search
                loading={ loading }
              />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route exact path="/">
              <Login
                handleSubmit={ this.handleSubmit }
                nameInput={ nameInput }
                handleChange={ this.handleChange }
                handleClick={ this.handleClick }
                loading={ loading }
              />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
