import React, { useState } from "react";
import axios from "axios";

export default function AppFunctional(props) {
  const [coordinate, setCoordinate] = useState({ x: 2, y: 2 });
  const [steps, setSteps] = useState(0);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newPayload = {
      x: coordinate.x,
      y: coordinate.y,
      steps: steps,
      email: email,
    };
    axios
      .post("http://localhost:9000/api/result", newPayload)
      .then((res) => {
        setMessage(res.data.message);
        setEmail("");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates (${coordinate.x}, ${coordinate.y})`}</h3>
        <h3 id="steps">
          You moved {steps} {steps === 1 ? "time" : "times"}
        </h3>
      </div>
      <div id="grid">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square active">B</div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="info">
        <h3 id="message">{message} </h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          onChange={onChange}
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
