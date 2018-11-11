import React, { Component } from 'react';
import socket from 'socket.io-client';
import api from '../services/api';
import configApp from '../config';

import twitterLogo from '../twitter.svg';
import './Timeline.css';

import Tweet from '../components/Tweet';

export default class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: '',
  };

  async componentDidMount() {
    this.subscribeToEvents();
    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket(configApp.SERVER_URL);

    io.on('tweet', (data) => {
      const { tweets } = this.state;
      this.setState({ tweets: [data, ...tweets] });
    });

    io.on('like', (data) => {
      const { tweets } = this.state;

      this.setState({
        tweets: tweets.map(tweet => (tweet._id === data._id ? data : tweet)),
      });
    });
  };

  handleNewTweet = async (e) => {
    if (e.keyCode !== 13) return;

    const { newTweet: content } = this.state;

    const author = localStorage.getItem('@GoTwitter:username');

    await api.post('tweets', { content, author });

    this.setState({ newTweet: '' });
  };

  handleInputChange = (e) => {
    this.setState({ newTweet: e.target.value });
  };

  render() {
    const { tweets, newTweet } = this.state;

    return (
      <div className="timeline-wrapper">
        <img src={twitterLogo} height={24} alt="GoTwitter" />

        <form>
          <textarea
            value={newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?"
          />
        </form>

        <ul className="tweet-list">
          {tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}
