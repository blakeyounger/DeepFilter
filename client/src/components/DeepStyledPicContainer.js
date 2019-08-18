import React, { Component } from "react";
import ReactDOM from "react-dom";
import { MDBRow, MDBCol } from "mdbreact";

class DeepStyledPicContainer extends Component {
  render() {
    return (
      <div className="special-color-dark pt-4 pb-4">
        {this.props.resultRecieved ? (
          <MDBRow>
            <MDBCol md="1" />
            <MDBCol md="10">
              <img
                className="img-fluid fadeIn"
                src={`data:image/jpeg;base64,${this.props.deepStyledPicData}`}
              />
            </MDBCol>
            <MDBCol md="1" />
          </MDBRow>
        ) : (
          <div>
            <h4 className="text-white">
              Processing the image. This will take 30 to 60 seconds.
            </h4>
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DeepStyledPicContainer;
