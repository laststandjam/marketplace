import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Firebase from '../Firebase/firebase';

import { PasswordForgetLink } from '../PasswordForget';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isAuth: false,
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = async e => {
    const { email, password } = this.state;
    e.preventDefault();
    try {
      await Firebase.doSignInWithEmailAndPassword(email, password);
      this.props.doSetCurrentUser({
        email,
      });
      this.setState({
        isAuth: true,
      });
    } catch (error) {
      console.log(error);
    }

    // this.props.doSetCurrentUser(user);
    // this.setState({
    //   isAuth: true,
    // });
  };

  render() {
    const { email, password, isAuth } = this.state;
    if (isAuth) {
      return <Redirect to='/' />;
    }
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input
            name='email'
            onChange={this.handleChange}
            value={email}
            placeholder='email'
          />
          <input
            name='password'
            onChange={this.handleChange}
            value={password}
            placeholder='password'
          />
          <button type='submit'>Login</button>
        </form>
        <PasswordForgetLink />
      </>
    );
  }
}

export default Login;
