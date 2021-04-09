import React from "react";
import { connect } from "react-redux";
import { DeleteLogs } from "./Redux/actions";
import { ListGroup } from "react-bootstrap";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

class History extends React.Component {
  render() {
    const divStyle = {
      overflowY: "auto",
      height: "400px",
      position: "relative",
      marginTop:'5px'
    };
    const logs = this.props.equationLogs.reverse();
    return (
      <div>
      <button className='buttons' onClick={this.props.DeleteLogs}>delete history</button>
        <div style={divStyle}>
          <ListGroup>
            {logs.length === 0 ? (
              <ListGroup.Item>No History for the moment </ListGroup.Item>
            ) : (
              logs.map((x, index) => (
                <ListGroup.Item key={index}>
                  <div>{x[0]}</div>
                  <div style={{fontSize:'1.5em',fontWeight:'400'}}>{x[1]}</div>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </div>
  </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    DeleteLogs: () => {
      dispatch(DeleteLogs());
    }
  };
};

const mapStateToProps = (state) => {
  return { equationLogs: state };
};

const HistoryConnected = connect(mapStateToProps, mapDispatchToProps)(History);
export default HistoryConnected;
