import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {userContext} from "../../resources/Context/User"

import Firebase from "../../resources/FireBase/firebase";
import { Wrapper, Form } from "./style";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    isAuth: false,
    error: null
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleFormSubmit = async e => {
    const { email, passwordOne, username } = this.state;
    e.preventDefault();
    try {
      await Firebase.doCreateUserWithEmailAndPassword(email, passwordOne);
      this.props.doSetCurrentUser({
        username,
        email
      });
      this.setState({ isAuth: true });
    } catch (error) {
      this.setState({
        error
      });
      setTimeout(() => {
        this.setState({
          error: null
        });
      }, 5000);
    }
  };
  render() {
  
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAuth,
      error
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
      if (isAuth) {
              return <Redirect to='/' />;
            }
            return (
                    <Wrapper color={'dodgerblue'}>
                      <h1>Sign up</h1>
                      <Form onSubmit={this.handleFormSubmit}>
                        <input
                          placeholder='Full Name'
                          name='username'
                          value={username}
                          onChange={this.handleChange}
                        />
                        <input
                          placeholder='Email'
                          name='email'
                          value={email}
                          onChange={this.handleChange}
                        />
                        <input
                          placeholder='Password'
                          type='password'
                          name='passwordOne'
                          value={passwordOne}
                          onChange={this.handleChange}
                        />
                        <input
                          placeholder='Confirm password'
                          type='password'
                          name='passwordTwo'
                          value={passwordTwo}
                          onChange={this.handleChange}
                        />
                        <button disabled={isInvalid} type='submit'>
                          Submit
                        </button>
                      </Form>
                      {error && <div style={{ color: 'red' }}>{error.message}</div>}
                    </Wrapper>
            )}
}

export default SignUp;
