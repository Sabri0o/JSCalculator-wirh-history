import CalculatorConnected from "./calculator";
import HistoryConnected from "./history";
import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends React.Component {
  render() {
    return (
      <div>
      <Container style={{marginTop:'20px'}}>
        <Row>
          <h2>JavaScript Calculator fcc project</h2>
          <p>
            <b>Note On Calculator Logic:</b> It should be noted that there are two main
            schools of thought on calculator input logic: immediate execution
            logic and formula logic. Our example utilizes formula logic and
            observes order of operation precedence, immediate execution does
            not. <br/>
            <b>EXAMPLE:</b><mark> 3 + 5 x 6 - 2 / 4 =</mark> <br/>
            <li>Immediate Execution Logic: <mark>11.5</mark></li>
            <li>Formula/Expression Logic: <mark>32.5</mark></li>
          </p>
        </Row>
        <Row>
          <Col sm={8}>
            <h4 style={{textAlign:'center'}}>Calculator</h4>
            <CalculatorConnected />
          </Col>
          <Col sm={4}>
            <h4 style={{textAlign:'center'}}>History</h4>

            <HistoryConnected />
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}
