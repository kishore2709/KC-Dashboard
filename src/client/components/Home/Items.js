import React, { Component } from 'react'
import {
    Alert_Logo, ListAlert_Logo, DNS_Logo, Group_Logo, Agent_Logo, ArrowDown_Logo
    , Analyze_Logo, Sms_Logo, Statitic_Logo, Search_Logo, Transfer_Logo, User_Logo, Web_Logo, Email_Logo
} from '../icon/Icon'
import PieExample from './Pie'
import LineExample from './Line'
import CountChart from './CountChart'
import { Line } from 'react-chartjs-2';
import './Card.css'
const Items_Log = () => (
    <div id="containerItems">
        <div>
            <figure>
                <a href="#">
                    <img src={Web_Logo} style={{ width: 60, height: 60 }} alt="Image" />
                </a>
                <figcaption style={{ textAlign: "center" }}>WebLog</figcaption>
            </figure>
        </div>
        <div>
            <figure>
                <a href="#">
                    <img src={DNS_Logo} style={{ width: 60, height: 60 }} alt="Image" />
                </a>
                <figcaption style={{ textAlign: "center" }}>DNSLog</figcaption>
            </figure>
        </div>
        <div>
            <figure>
                <a href="#">
                    <img src={Transfer_Logo} style={{ width: 60, height: 60 }} alt="Image" />
                </a>
                <figcaption style={{ textAlign: "center" }}>Transfer</figcaption>
            </figure>
        </div>
        <div>
            <figure>
                <a href="#">
                    <img src={Agent_Logo} style={{ width: 60, height: 60 }} alt="Image" />
                </a>
                <figcaption style={{ textAlign: "center" }}>Log Agent</figcaption>
            </figure>
        </div>
    </div>
)

class Items extends Component {

    render() {
        let chartLine = <LineExample />
        if (this.props.showChart === 0)
            chartLine = <div></div>
        return (
            <div>
                <div id="containerItems">
                    <div>
                        <figure>
                            <a href="#">
                                <img src={this.props.firstImg} style={{ width: 60, height: 60 }} alt="Image" />
                            </a>
                            <figcaption style={{ textAlign: "center" }}>{this.props.figure_1}</figcaption>
                        </figure>

                    </div>
                    <div>
                        <figure>
                            <a href="#">
                                <img src={this.props.secondImg} style={{ width: 60, height: 60 }} alt="Image" />
                            </a>
                            <figcaption style={{ textAlign: "center" }}>{this.props.figure_2}</figcaption>
                        </figure>
                    </div>
                    <div>
                        <figure>
                            <a href="#">
                                <img src={this.props.thirdImg} style={{ width: 60, height: 60 }} alt="Image" />
                            </a>
                            <figcaption style={{ textAlign: "center" }}>{this.props.figure_3}</figcaption>
                        </figure>
                    </div>
                </div>
                {chartLine}
            </div>
        );
    }
}


const Items_Dectects = () => (
    <div>
        <div id="containerItems">
            <div>
                <figure>
                    <a href="#">
                        <img src={Search_Logo} style={{ width: 60, height: 60 }} alt="Image" />
                    </a>
                    <figcaption style={{ textAlign: "center" }}>User</figcaption>
                </figure>
            </div>
            <div>
                <figure>
                    <a href="#">
                        <img src={Group_Logo} style={{ width: 60, height: 60 }} alt="Image" />
                    </a>
                    <figcaption style={{ textAlign: "center" }}>Group</figcaption>
                </figure>
            </div>
            <div>
                <figure>
                    <a href="#">
                        <img src={Alert_Logo} style={{ width: 60, height: 60 }} alt="Image" />
                    </a>
                    <figcaption style={{ textAlign: "center" }}>Alert</figcaption>
                </figure>
            </div>
        </div>

        <PieExample />

    </div>
)

export { Items, Items_Log, Items_Dectects }