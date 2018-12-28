/* eslint-disable jsx-a11y/heading-has-content */
import React, { Component } from 'react';
import './Card.css';
// import openSocket from 'socket.io-client';
import Footer from './Footer';
import { Items, ItemsLog, ItemsDectects } from './Items';
import {
  alertLogo,
  listAlertLogo,
  dnsLogo,
  groupLogo,
  smsLogo,
  searchLogo,
  userLogo,
  webLogo,
  emailLogo,
} from '../icon/Icon';

export const socketServer = undefined; // openSocket("http://localhost:8000");
const Card = () => (
  <div className="cardContent">
    <div className="cardText">
      <h1>Quản lý người dùng</h1>
      <hr />
      <Items
        firstImg={userLogo}
        figure1="User"
        secondImg={groupLogo}
        figure2="Group"
        thirdImg={alertLogo}
        figure3="Alert"
      />
    </div>
  </div>
);

const CardLog = () => (
  <div className="cardContent">
    <div className="cardText">
      <h1>Quản lý log truy cập</h1>
      <hr />
      <ItemsLog />
    </div>
  </div>
);

const CardService = () => (
  <div className="cardContent">
    <div className="cardText">
      <h1>Quản lý dịch vụ truy cập</h1>
      <hr />

      <Items
        firstImg={searchLogo}
        figure_1="Search"
        secondImg={webLogo}
        figure_2="Web"
        thirdImg={dnsLogo}
        figure_3="DNS"
        showChart={1}
      />
    </div>
  </div>
);

const CardBoardcast = () => (
  <div className="cardContent">
    <div className="cardText">
      <h1>Quảng bá cảnh báo</h1>
      <hr />
      <Items
        firstImg={listAlertLogo}
        figure_1="Danh sách"
        secondImg={emailLogo}
        figure_2="Gửi Email"
        thirdImg={smsLogo}
        figure_3="Gửi SMS"
        showChart={1}
      />
    </div>
  </div>
);

// ///////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////
// ///////////////////Phat hien tan cong///////////////////////////
// ///////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////

const CardBotnet = () => (
  <div className="cardContent">
    <div className="cardText">
      <h1>Botnet</h1>
      <hr />
      <ItemsDectects />
    </div>
  </div>
);

const CardWebServiceAtt = () => (
  <div className="cardContent">
    <div className="cardText">
      <h1>Web Service Attack</h1>
      <hr />
      <ItemsDectects />
    </div>
  </div>
);
const CardAPT = () => (
  <div className="cardContent">
    <div className="cardText">
      <h1>APT</h1>
      <hr />
      <ItemsDectects />
    </div>
  </div>
);

const CardAccessAtt = () => (
  <div className="cardContent">
    <div className="cardText">
      <h1>Access Attack</h1>
      <hr />
      <ItemsDectects />
    </div>
  </div>
);

class Home extends Component {
  render() {
    return (
      <div>
        <h4 className="h4Title">IT Operation</h4>
        <div id="container">
          <div className="prettyBox fullCard ">
            {' '}
            <Card />
          </div>
          <div className="prettyBox fullCardLog ">
            <CardLog />
          </div>
          <div className="prettyBox fullCard  ">
            <CardService />
          </div>
          <div className="prettyBox fullCard ">
            <CardBoardcast />
          </div>
        </div>
        <h4 />
        <h4 className="title">Phát hiện tấn công</h4>

        <div id="container">
          <div className="prettyBox fullCardDetection">
            <CardBotnet />
          </div>
          <div className="prettyBox fullCardDetection">
            <CardWebServiceAtt />
          </div>
          <div className="prettyBox fullCardDetection">
            <CardAPT />
          </div>
          <div className="prettyBox fullCardDetection">
            <CardAccessAtt />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Home;
