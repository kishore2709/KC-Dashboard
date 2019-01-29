import React, { Component } from 'react';

function DataVisualizer(Chart) {

  const fifteenMinutes = 1000 * 60 * 15;

  return class extends Component {

    constructor(props) {
      super(props);
      this.state = {
        startDate: null,
        endDate: null,
        data: props.data,
      }
    }

    componentDidMount() {
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - fifteenMinutes);
      this.handleDateChange(startDate, endDate);
    }

    handleDateChange = (startDate, endDate) => {
      const { data } = this.props;
      const newData = data.filter(curData => {
        if ((curData.x.getTime() >= startDate.getTime()) && (curData.x.getTime() <= endDate.getTime())) {
          return true;
        } else {
          return false;
        }
      });
      this.setState({
        startDate: startDate,
        endDate: endDate,
        data: newData,
      });
    }

    render() {
      const { startDate, endDate, data } = this.state; 
      if (startDate !== null && endDate !== null) {
        return (
          <Chart 
            startDate={startDate}
            endDate={endDate}
            data={data}
            fireUpDateChange={this.handleDateChange}
          />
        );
      } else {
        return (null);
      }
    }
  };  
}

export default DataVisualizer;