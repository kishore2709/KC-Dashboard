import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { notification } from "antd";
import moment from "moment";
import {socketServer as socket} from "./Home"

const openNotificationWithIcon = type => {
  if (type === "success") {
    notification[type]({
      message: "Websocket đã kết nối với máy chủ",
      description: "Dữ liệu sẽ được gửi về liên tục"
    });
  }
  if (type === "error") {
    notification[type]({
      message: "Kết nối tới máy chủ thất bại",
      description: "Reload lại trang web"
    });
  }
};

function subscribeToServer(att_type, callback) {
  /*
  socket.on(att_type, res => callback(null, res));
  socket.emit('sub_' + att_type, att_type);
  socket.on('connect', ()(=>{
    openNotificationWithIcon('success');
  })
  */
  setInterval(() => {
    callback(null, {
      newData: Math.floor(Math.random() * 100),
      newLabel: moment()
        .format("hh:mm:ss")
        .toString()
    });
  }, 1000);
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          userCallback: function(label, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }
          }
        }
      }
    ]
  }
};

const initialState = function(arrLabels, arrData) {
  return {
    labels: arrLabels,
    datasets: [
      {
        label: "Thống kê lượng truy cập",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: arrData
      }
    ]
  };
};

class LineExample extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.setState(
      initialState(
        ["January", "February", "March", "April", "May", "June", "July"],
        [0, 0, 0, 0, 0, 0, 0]
      )
    );
  }
  componentDidMount() {
    //notification
    //console.log('wtffffffffffffffffffffffffffffffffffff');
    //////////////
    var _this = this;
    subscribeToServer("UserAccess", (err, res) => {
      var oldDataSet = _this.state.datasets[0];
      var oldLabels = _this.state.labels;
      var newData = [];
      var newLabels = [];
      console.log(res);
      for (var x = 0; x < _this.state.labels.length - 1; x++) {
        // newData.push(Math.floor(Math.random() * 100));
        newData.push(oldDataSet.data[x + 1]);
        newLabels.push(oldLabels[x + 1]);
      }
      newData.push(res.newData);
      newLabels.push(res.newLabel);
      var newDataSet = {
        ...oldDataSet
      };

      newDataSet.data = newData;
      console.log(newLabels);
      var newState = {
        ...initialState,
        datasets: [newDataSet],
        labels: newLabels
      };

      _this.setState(newState);
    });
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
