import React from "react";
import axios from "axios";

const initialState = {
  coordinate: { x: 2, y: 2 },
  steps: "",
  email: "",
  message: "",
};
export default class AppClass extends React.Component {
  state = initialState;

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ ...this, state, email: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newPayload = {
      x: this.state.coordinate.x,
      y: this.state.coordinate.y,
      steps: this.state.steps,
      email: this.state.email,
    };
    axios
      .post(`http://localhost:9000/api/result`, newPayload)
      .then((res) => {
        this.setState({ ...this.state, message:res.data.message, email:''   });
      })
      .catch((err) => {this.setState({ ...this.state, message:err.response.data.message   }
      });
  };
  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            {`Coordinates (${this.state.coordinate.x}, ${this.state.coordinate.y}`}
          </h3>
          <h3 id="steps">
            You moved {this.state.steps}{" "}
            {this.state.steps === 1 ? "time" : "times"}
          </h3>
        </div>
        <div id="grid">
          {}
          {/* <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div> */}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            onChange={this.onChange}
            value={this.state.email}
            placeholder="type email"
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
