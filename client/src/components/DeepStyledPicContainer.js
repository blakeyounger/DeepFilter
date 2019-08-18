import React, { Component } from "react";
import ReactDOM from "react-dom";

class DeepStyledPicContainer extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.resultRecieved ? (
            <img
              src={`data:image/jpeg;base64,${this.props.deepStyledPicData}`}
            />
          ) : (
            <div>Result not Recieved</div>
          )}
        </div>
        <div />
      </div>
    );
  }
}

export default DeepStyledPicContainer;
