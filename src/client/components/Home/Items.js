/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Line } from 'react-chartjs-2';
import {
  alertLogo,
  dnsLogo,
  groupLogo,
  agentLogo,
  searchLogo,
  transferLogo,
  webLogo,
} from '../icon/Icon';
import PieExample from './Pie';
import LineExample from './Line';
// import CountChart from './CountChart';
import './Card.css';

const ItemsLog = () => (
  <div id="containerItems">
    <div>
      <figure>
        <a href="#">
          <img src={webLogo} style={{ width: 60, height: 60 }} alt="" />
        </a>
        <figcaption style={{ textAlign: 'center' }}>WebLog</figcaption>
      </figure>
    </div>
    <div>
      <figure>
        <a href="#">
          <img src={dnsLogo} style={{ width: 60, height: 60 }} alt="" />
        </a>
        <figcaption style={{ textAlign: 'center' }}>DNSLog</figcaption>
      </figure>
    </div>
    <div>
      <figure>
        <a href="#">
          <img src={transferLogo} style={{ width: 60, height: 60 }} alt="" />
        </a>
        <figcaption style={{ textAlign: 'center' }}>Transfer</figcaption>
      </figure>
    </div>
    <div>
      <figure>
        <a href="#">
          <img src={agentLogo} style={{ width: 60, height: 60 }} alt="" />
        </a>
        <figcaption style={{ textAlign: 'center' }}>Log Agent</figcaption>
      </figure>
    </div>
  </div>
);

class Items extends Component {
  render() {
    const {
      showChart,
      firstImg,
      secondImg,
      thirdImg,
      figure1,
      figure2,
      figure3,
    } = this.props;
    let chartLine = <LineExample />;
    if (showChart === 0) chartLine = <div />;
    return (
      <div>
        <div id="containerItems">
          <div>
            <figure>
              <a href="#">
                <img src={firstImg} style={{ width: 60, height: 60 }} alt="" />
              </a>
              <figcaption style={{ textAlign: 'center' }}>{figure1}</figcaption>
            </figure>
          </div>
          <div>
            <figure>
              <a href="#">
                <img src={secondImg} style={{ width: 60, height: 60 }} alt="" />
              </a>
              <figcaption style={{ textAlign: 'center' }}>{figure2}</figcaption>
            </figure>
          </div>
          <div>
            <figure>
              <a href="#">
                <img src={thirdImg} style={{ width: 60, height: 60 }} alt="" />
              </a>
              <figcaption style={{ textAlign: 'center' }}>{figure3}</figcaption>
            </figure>
          </div>
        </div>
        {chartLine}
      </div>
    );
  }
}
Items.propTypes = {
  showChart: PropTypes.any.isRequired,
  firstImg: PropTypes.any.isRequired,
  secondImg: PropTypes.any.isRequired,
  thirdImg: PropTypes.any.isRequired,
  figure1: PropTypes.any.isRequired,
  figure2: PropTypes.any.isRequired,
  figure3: PropTypes.any.isRequired,
};
const ItemsDectects = () => (
  <div>
    <div id="containerItems">
      <div>
        <figure>
          <a href="#">
            <img src={searchLogo} style={{ width: 60, height: 60 }} alt="" />
          </a>
          <figcaption style={{ textAlign: 'center' }}>User</figcaption>
        </figure>
      </div>
      <div>
        <figure>
          <a href="#">
            <img src={groupLogo} style={{ width: 60, height: 60 }} alt="" />
          </a>
          <figcaption style={{ textAlign: 'center' }}>Group</figcaption>
        </figure>
      </div>
      <div>
        <figure>
          <a href="#">
            <img src={alertLogo} style={{ width: 60, height: 60 }} alt="" />
          </a>
          <figcaption style={{ textAlign: 'center' }}>Alert</figcaption>
        </figure>
      </div>
    </div>

    <PieExample />
  </div>
);

export { Items, ItemsLog, ItemsDectects };
