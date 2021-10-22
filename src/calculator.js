import React from "react";
import { connect } from "react-redux";
import { AddLogs } from "./Redux/actions";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      operator: false,
      sign: "",
      equation: "",
      decimal: true,
      result: true,
    };
    this.handleNumbers = this.handleNumbers.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNegate = this.handleNegate.bind(this);
    this.clearOperand = this.clearOperand.bind(this);
    this.ommitLastDigit = this.ommitLastDigit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (Number(e.key) || e.key === "0") {
      if (this.state.sign === "=" && this.state.result) {
        this.setState({
          input: e.key,
          operator: false,
          sign: "",
          equation: "",
          decimal: true,
          result: true,
        });
      } else if (
        this.state.input !== "0" &&
        this.state.operator === false &&
        this.state.result
      ) {
        this.setState((state) => ({
          input: state.input + e.key,
        }));
      } else if (this.state.input === "0" || !this.state.result) {
        this.setState((state) => ({
          input: e.key,
          operator: false,
          result: true,
        }));
      } else if (this.state.input !== "0" && this.state.operator === true) {
        this.setState((state) => ({
          input: e.key,
          operator: false,
          result: true,
        }));
      }
    } else if (["Enter", "+", "-", "/", "*"].includes(e.key)) {
      let key = e.key === "Enter" ? "=" : e.key;
      if (!this.state.operator && this.state.result) {
        const exp = this.state.equation + this.state.input + key;

        if (key === "=") {
          this.props.NewLog([exp, String(eval(exp.slice(0, exp.length - 1)))]);
        }
        this.setState((state) => ({
          sign: key,
          equation: exp.slice(0, exp.length - 1) + key,
          operator: true,
          decimal: true,
          input: String(eval(exp.slice(0, exp.length - 1))),
        }));
      } else {
        if (key === "=") {
          this.setState((state) => ({
            sign: "=",
            operator: false,
            result: false,
            decimal: false,
            input: String(
              eval(this.state.equation.slice(0, this.state.equation.length - 1))
            ),
          }));
        } else if (
          key === "-" &&
          this.state.sign.length < 2 &&
          this.state.sign !== "="
        ) {
          const newSign = this.state.sign + "-";
          const newExp = this.state.equation + " " + "-";
          this.setState((state) => ({
            equation: newExp,
            sign: newSign,
          }));
        } else {
          const newSign = key;
          const newExp = this.state.equation.slice(
            0,
            this.state.equation.length - this.state.sign.length
          );
          this.setState((state) => ({
            equation: String(eval(newExp)) + newSign,
            sign: newSign,
          }));
        }
      }
    } else if (e.key === ".") {
      if (this.state.sign === "=") {
        this.setState((state) => ({
          input: "0.",
          decimal: false,
          equation: "",
          operator: false,
          sign: "",
          result: true,
        }));
      } else {
        if (this.state.input === "0") {
          this.setState((state) => ({
            input: "0.",
            decimal: false,
            operator: false,
            sign: "",
            result: true,
          }));
        } else if (!this.state.input.includes(".")) {
          this.setState((state) => ({
            input: state.input + ".",
            decimal: false,
          }));
        }
      }
    } else if (e.key === "Backspace") {
      if (
        this.state.sign !== "=" &&
        this.state.input !== this.state.equation &&
        this.state.input !==
          String(
            eval(this.state.equation.slice(0, this.state.equation.length - 1))
          )
      ) {
        const newInput = this.state.input.slice(0, this.state.input.length - 1);
        this.setState({
          input: newInput === "" ? "0" : newInput,
          decimal: !newInput.includes("."),
        });
      }
    }
  }

  handleNumbers(e) {
    if (this.state.sign === "=" && this.state.result) {
      this.setState({
        input: e.target.value,
        operator: false,
        sign: "",
        equation: "",
        decimal: true,
        result: true,
      });
    } else if (
      this.state.input !== "0" &&
      this.state.operator === false &&
      this.state.result
    ) {
      this.setState((state) => ({
        input: state.input + e.target.value,
      }));
    } else if (this.state.input === "0" || !this.state.result) {
      this.setState((state) => ({
        input: e.target.value,
        operator: false,
        result: true,
      }));
    } else if (this.state.input !== "0" && this.state.operator === true) {
      this.setState((state) => ({
        input: e.target.value,
        operator: false,
        result: true,
      }));
    }
  }

  handleOperation(e) {
    if (!this.state.operator && this.state.result) {
      const exp = this.state.equation + this.state.input + e.target.value;
      console.log(exp.slice(0, exp.length - 1));

      if (e.target.value === "=") {
        this.props.NewLog([exp, String(eval(exp.slice(0, exp.length - 1)))]);
      }
      this.setState((state) => ({
        sign: e.target.value,
        equation: exp.slice(0, exp.length - 1) + e.target.value,
        operator: true,
        decimal: true,
        input: String(eval(exp.slice(0, exp.length - 1))),
      }));
    } else {
      if (e.target.value === "=") {
        this.setState((state) => ({
          sign: "=",
          operator: false,
          result: false,
          decimal: false,
          input: String(
            eval(this.state.equation.slice(0, this.state.equation.length - 1))
          ),
        }));
      } else if (
        e.target.value === "-" &&
        this.state.sign.length < 2 &&
        this.state.sign !== "="
      ) {
        const newSign = this.state.sign + "-";
        const newExp = this.state.equation + " " + "-";
        this.setState((state) => ({
          equation: newExp,
          sign: newSign,
        }));
      } else {
        const newSign = e.target.value;
        const newExp = this.state.equation.slice(
          0,
          this.state.equation.length - this.state.sign.length
        );
        this.setState((state) => ({
          equation: String(eval(newExp)) + newSign,
          sign: newSign,
        }));
      }
    }
  }

  clearOperand() {
    this.setState((state) => ({
      input: "0",
      equation: state.sign === "=" ? "" : state.equation,
      operator: state.sign === "=" || state.equation !== "" ? false : true,
      sign: state.sign === "=" ? "" : state.sign,
      decimal: true,
    }));
  }

  handleDecimal() {
    if (this.state.sign === "=") {
      this.setState((state) => ({
        input: "0.",
        decimal: false,
        equation: "",
        operator: false,
        sign: "",
        result: true,
      }));
    } else {
      if (this.state.input === "0") {
        this.setState((state) => ({
          input: "0.",
          decimal: false,
          operator: false,
          sign: "",
          result: true,
        }));
      } else if (!this.state.input.includes(".")) {
        this.setState((state) => ({
          input: state.input + ".",
          decimal: false,
        }));
      }
    }
  }

  handleNegate() {
    if (eval(this.state.input) !== 0) {
      if (this.state.sign === "=" || this.state.input === this.state.equation) {
        this.setState({
          input: String(-1 * Number(this.state.input)),
          equation: "",
          sign: "",
          result: true,
          operator: false,
        });
      } else if (this.state.sign !== "=") {
        this.setState({
          input: String(-1 * Number(this.state.input)),
        });
      }
    }
  }

  clearDisplay() {
    this.setState({
      input: "0",
      equation: "",
      decimal: true,
      operator: false,
      sign: "",
      result: true,
    });
  }

  ommitLastDigit() {
    if (
      this.state.sign !== "=" &&
      this.state.input !== this.state.equation &&
      this.state.input !==
        String(
          eval(this.state.equation.slice(0, this.state.equation.length - 1))
        )
    ) {
      const newInput = this.state.input.slice(0, this.state.input.length - 1);
      this.setState({
        input: newInput === "" ? "0" : newInput,
        decimal: !newInput.includes("."),
      });
    }
  }

  render() {
    return (
      <div className="calculator">
        <div id="upperDisplay">{this.state.equation}</div>
        <div id="display">{this.state.input}</div>
        <div className="buttonsContainer">
          <button className="buttons op" id="clear" onClick={this.clearDisplay}>
            C
          </button>
          <button
            className="buttons op"
            id="clearOperand"
            onClick={this.clearOperand}
          >
            CE
          </button>
          <button
            className="buttons op"
            id="undo"
            onClick={this.ommitLastDigit}
          >
            {"Undo"}
          </button>
          <button
            className="buttons op"
            id="divide"
            value="/"
            onClick={this.handleOperation}
          >
            /
          </button>
          <button
            className="buttons numbers"
            id="seven"
            value="7"
            onClick={this.handleNumbers}
          >
            7
          </button>
          <button
            className="buttons numbers"
            id="eight"
            value="8"
            onClick={this.handleNumbers}
          >
            8
          </button>
          <button
            className="buttons numbers"
            id="nine"
            value="9"
            onClick={this.handleNumbers}
          >
            9
          </button>
          <button
            className="buttons op"
            id="multiply"
            value="*"
            onClick={this.handleOperation}
          >
            x
          </button>
          <button
            className="buttons numbers"
            id="four"
            value="4"
            onClick={this.handleNumbers}
          >
            4
          </button>
          <button
            className="buttons numbers"
            id="five"
            value="5"
            onClick={this.handleNumbers}
          >
            5
          </button>
          <button
            className="buttons numbers"
            id="six"
            value="6"
            onClick={this.handleNumbers}
          >
            6
          </button>
          <button
            className="buttons op"
            id="subtract"
            value="-"
            onClick={this.handleOperation}
          >
            -
          </button>
          <button
            className="buttons numbers"
            id="one"
            value="1"
            onClick={this.handleNumbers}
          >
            1
          </button>
          <button
            className="buttons numbers"
            id="two"
            value="2"
            onClick={this.handleNumbers}
          >
            2
          </button>
          <button
            className="buttons numbers"
            id="three"
            value="3"
            onClick={this.handleNumbers}
          >
            3
          </button>
          <button
            className="buttons op"
            id="add"
            value="+"
            onClick={this.handleOperation}
          >
            +
          </button>
          <button
            className="buttons negate"
            id="negate"
            onClick={this.handleNegate}
          >
            +/-
          </button>
          <button
            className="buttons numbers"
            id="zero"
            value="0"
            onClick={this.handleNumbers}
          >
            0
          </button>
          <button
            className="buttons op"
            id="decimal"
            value="."
            onClick={this.handleDecimal}
          >
            .
          </button>
          <button
            className="buttons result"
            id="equals"
            value="="
            onClick={this.handleOperation}
          >
            =
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    NewLog: (equation) => {
      dispatch(AddLogs(equation));
    },
  };
};

const CalculatorConnected = connect(null, mapDispatchToProps)(Calculator);
export default CalculatorConnected;
