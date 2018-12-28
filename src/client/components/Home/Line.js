/* eslint-disable no-unused-vars */
/* eslint-disable react/sort-comp */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
// import { socketServer as socket } from './Home';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          userCallback(label, _index, _labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }
          },
        },
      },
    ],
  },
};

const initialState = function(arrLabels, arrData) {
  return {
    labels: arrLabels,
    datasets: [
      {
        label: 'Thống kê lượng truy cập',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: arrData,
      },
    ],
  };
};

class LineExample extends Component {
  constructor(props) {
    super(props);

    this.subscribeToServer = this.subscribeToServer.bind(this);
  }

  componentWillMount() {
    this.setState(
      initialState(
        ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        [0, 0, 0, 0, 0, 0, 0]
      )
    );
  }

  subscribeToServer(_att_type, callback) {
    /*
    socket.on(att_type, res => callback(null, res));
    socket.emit('sub_' + att_type, att_type);
    socket.on('connect', ()(=>{
      openNotificationWithIcon('success');
    })
    */
    this.myInterval = setInterval(() => {
      callback(null, {
        newData: Math.floor(Math.random() * 100),
        newLabel: moment()
          .format('hh:mm:ss')
          .toString(),
      });
    }, 1000);
  }

  componentDidMount() {
    // notification
    // console.log('wtffffffffffffffffffffffffffffffffffff');
    // ////////////
    const _this = this;
    this.subscribeToServer('UserAccess', (_err, res) => {
      const oldDataSet = _this.state.datasets[0];
      const oldLabels = _this.state.labels;
      const newData = [];
      const newLabels = [];
      console.log(res);
      for (let x = 0; x < _this.state.labels.length - 1; x += 1) {
        // newData.push(Math.floor(Math.random() * 100));
        newData.push(oldDataSet.data[x + 1]);
        newLabels.push(oldLabels[x + 1]);
      }
      newData.push(res.newData);
      newLabels.push(res.newLabel);
      const newDataSet = {
        ...oldDataSet,
      };

      newDataSet.data = newData;
      console.log(newLabels);
      const newState = {
        ...initialState,
        datasets: [newDataSet],
        labels: newLabels,
      };

      _this.setState(newState);
    });
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    return (
      <div>
        <Line data={this.state} options={options} height={720} width={700} />
      </div>
    );
  }
}

export default LineExample;
