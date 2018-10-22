import React, { Component } from "react";
import "./setting.css";
import "../App.css";
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipServer: "0.0.0.0",
      timeInterval: 3000
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    fetch("http://" + "localhost:8000" + "/api/setting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timeInterval: 233232 })
    })
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad respond from server");
        }
        //console.log(res);
        return res;
      })
      .then(res => {
        alert("Your favorite flavor is: " + res);
      })
      .catch(err => {
        alert(err);
      });
      event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    //console.log(this.state);
  }
  render() {
    return (
      <div>
        <h4>Thiết lập</h4>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Setting;
