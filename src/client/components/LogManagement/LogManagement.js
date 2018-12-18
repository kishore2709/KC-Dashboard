/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import '../App.css';
import ServiceAccessChart from './ServiceAccessChart';
import './Log.css';

const LogManagement = () => (
  <div>
    <div>
      <h4 className="h4Title">Quản lý log truy cập theo thời gian thực</h4>
      <br />
      <div className="container">
        <div className="row" style={{ marginLeft: '100px' }}>
          <div className="col-md-3">
            <label className="bold">Date:</label> &nbsp;&nbsp;
            <input id="date" type="date" value="2018-10-10" />
          </div>
          <div className="col-md-3">
            <label className="bold">Time Begin:</label> &nbsp;&nbsp;{' '}
            <input id="time_start" type="time" required />
          </div>
          <div className="col-md-3">
            <label className="bold">Time End:</label> &nbsp;&nbsp;{' '}
            <input id="time_end" type="time" required />
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-info">
              Info
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="chartLog">
      <ServiceAccessChart />
    </div>
    <div id="showRealtime">
      <button type="button" className="btn btn-danger">
        Show Realtime
      </button>
    </div>
  </div>
);

export default LogManagement;
