import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {
  state = {
    username: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { props, state } = this;

    if (!state.username.length) return;

    localStorage.setItem('@GoTwitter:username', state.username);

    props.history.push('/timeline');
  };

  handleInputChege = (e) => {
    this.setState({ username: e.target.value });
  };

  render() {
    const { username } = this.state;

    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="GoTwitter" />
        <form onSubmit={this.handleSubmit}>
          <input value={username} onChange={this.handleInputChege} placeholder="Nome de usuário" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}
