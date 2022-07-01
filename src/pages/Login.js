import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { handleClick, nameInput, handleChange, handleSubmit, loading } = this.props;
    const NAME_VALIDATION = 3;

    return (
      <div data-testid="page-login">
        <form onSubmit={ handleSubmit }>
          <label htmlFor="nameInput">
            Login
            <input
              name="nameInput"
              data-testid="login-name-input"
              value={ nameInput }
              onChange={ handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ nameInput.length < NAME_VALIDATION }
            onClick={ handleClick }
          >
            Entrar

          </button>
        </form>
        {loading && <Redirect to="/search" />}
      </div>
    );
  }
}

Login.propTypes = {
  handleClick: PropTypes.func.isRequired,
  nameInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Login;
