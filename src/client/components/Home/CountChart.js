/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
// import openSocket from 'socket.io-client';

const socket = undefined; // openSocket('http://localhost:8000');

function subscribeToServer(attType, callback) {
  socket.on(attType, res => callback(null, res));
  socket.emit(`sub_${attType}`, attType);
}

class CountChart extends Component {
  state = {
    res: 1,
  };

  componentDidMount() {
    console.log('Component Did mount...');
    subscribeToServer('AA', (err, res) => {
      console.log(res);
      this.setState({
        res,
      });
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.res}</p>
      </div>
    );
  }
}

export default CountChart;
