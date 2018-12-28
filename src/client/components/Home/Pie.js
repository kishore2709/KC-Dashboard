/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

// import { socketServer as socket } from './Home';

const makeData = function(arrDataFromServer) {
  return {
    labels: ['Mirai', 'Bashlite', 'B2', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    datasets: [
      {
        data: arrDataFromServer,
        // Array.from({ length: 9 }, () => Math.floor(Math.random() * 40)),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#000',
          '#ff0',
          '#0005ff',
          '#696969',
          '#de091e',
          '#d82151',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#000',
          '#ff0',
          '#0005ff',
          '#696969',
          '#fde1ff',
          '#d82151',
        ],
      },
    ],
  };
};

class PieExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: makeData([0, 0, 0, 0, 0, 0, 0, 0, 0]),
    };
    this.subscribeToServer = this.subscribeToServer.bind(this);
  }

  subscribeToServer(_att_type, callback) {
    // socket.on(att_type, res => callback(null, res));
    // socket.emit('sub_' + att_type, att_type);
    this.myInterval = setInterval(() => {
      callback(
        null,
        Array.from({ length: 9 }, () => Math.floor(Math.random() * 40))
      );
    }, 3000);
  }

  componentDidMount() {
    this.subscribeToServer('AA', (err, res) => {
      // console.log(res);
      this.setState({
        data: makeData(res),
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    return (
      <div>
        <Pie data={this.state.data} height={720} width={700} />
      </div>
    );
  }
}

export default PieExample;
