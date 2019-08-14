import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  MDBJumbotron,
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBView,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFormInline,
  MDBAnimation
} from "mdbreact";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    data: null,
    styleName: "alien_goggles",
    sourceImageURL: null,
    qualityMode: false,
    collapseID: ""
  };
  constructor(props) {
    super(props);
    this.callMyAPI = this.callMyAPI.bind(this);
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.handleSourceImageChange = this.handleSourceImageChange.bind(this);
    //this.toggleQualityMode = this.toggleQualityMode.bind(this);
  }
  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  callMyAPI = async () => {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filterName: this.state.styleName,
        imageURL: this.state.sourceImageURL
      })
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log(body.imageBase64);
    let data = body.imageBase64;
    const Image = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />;
    ReactDOM.render(
      <Image data={data} />,
      document.getElementById("imageContainer")
    );
  };

  handleStyleChange() {
    let option = document.getElementById("styleDropdown");
    let styleName = option.options[option.selectedIndex].text;
    this.setState({
      styleName: styleName
    });
  }

  handleSourceImageChange(event) {
    this.setState({ sourceImageURL: event.target.value });
  }

  // toggleQualityMode() {
  //   //console.log("toggleQualityMode() triggered");
  //   // if (this.state.qualityMode === false) {
  //   //   this.setState({ qualityMode: true });
  //   // } else if (this.state.qualityMode === true) {
  //   //   this.setState({ qualityMode: false });
  //   //   console.log(this.state.qualityMode);
  //   // } else {
  //   //   console.log("Error in toggleQualityMode()");
  //   // }
  // }

  render() {
    const styleNames = [
      "alien_goggles",
      "aqua",
      "blue_brush",
      "blue_granite",
      "bright_sand",
      "cinnamon_rolls",
      "clean_view",
      "colorful_blocks",
      "colorful_dream",
      "crafty_painting",
      "creativity",
      "crunch_paper",
      "dark_rain",
      "dark_soul",
      "deep_connections",
      "dry_skin",
      "far_away",
      "gan_vogh",
      "gred_mash",
      "green_zuma",
      "hot_spicy",
      "neo_instinct",
      "oily_mcoilface",
      "plentiful",
      "post_modern",
      "purp_paper",
      "purple_pond",
      "purple_storm",
      "rainbow_festival",
      "really_hot",
      "sand_paper",
      "smooth_ride",
      "space_pizza",
      "spagetti_accident",
      "sunday",
      "yellow_collage",
      "yellow_paper"
    ];
    const dropdownStyles = styleNames.map(style => (
      <option value="{style}">{style}</option>
    ));
    return (
      <div className="App">
        <div id="classicformpage">
          <Router>
            <div>
              <MDBNavbar dark expand="md" fixed="top">
                <MDBContainer>
                  <MDBNavbarBrand>
                    <strong className="white-text">MDB</strong>
                  </MDBNavbarBrand>
                  <MDBNavbarToggler
                    onClick={this.toggleCollapse("navbarCollapse")}
                  />
                  <MDBNavbarNav left>
                    <MDBNavItem active>
                      <MDBNavLink to="#!">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#!">Link</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#!">Profile</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                </MDBContainer>
              </MDBNavbar>
            </div>
          </Router>
          <MDBView>
            <MDBMask className="d-flex justify-content-center align-items-center gradient">
              <MDBContainer>
                <MDBRow>
                  <MDBAnimation
                    type="fadeInLeft"
                    delay=".3s"
                    className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
                  >
                    <h1 className="h1-responsive font-weight-bold">
                      Deepstyle your pictures
                    </h1>
                    <hr className="hr-light" />
                    <h6 className="mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                      veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                      molestiae, quisquam iste, maiores. Nulla.
                    </h6>
                    <MDBBtn outline color="white">
                      Learn More
                    </MDBBtn>
                  </MDBAnimation>

                  <MDBCol md="6" xl="5" className="mb-4">
                    <MDBAnimation type="fadeInRight" delay=".3s">
                      <MDBCard id="classic-card" class>
                        <div className="mt-2" />
                        <h3>Image URL</h3>
                        <form action="">
                          <input
                            type="text"
                            value={this.state.sourceImageURL}
                            onChange={this.handleSourceImageChange}
                          />
                        </form>
                        <h3 className="styleName mt-4">Style Name</h3>
                        <div className="styleNameContainer">
                          <select
                            name="styleDropdown"
                            id="styleDropdown"
                            onChange={e => this.handleStyleChange()}
                          >
                            {dropdownStyles}
                          </select>
                        </div>
                        {/* <h3 className="mt-4">Quality Mode (takes longer)</h3>
          <MDBInput
            className="checkbox mt-0"
            label=" "
            filled
            type="checkbox"
            onChange={this.toggleQualityMode()}
            id="checkbox1"
            checked={this.state.qualityMode}
          /> */}
                        <p>{this.state.qualityMode.toString()}</p>

                        <MDBBtn
                          onClick={this.callMyAPI}
                          color="dark"
                          className="mt-3"
                        >
                          DeepStyle It
                        </MDBBtn>
                      </MDBCard>
                    </MDBAnimation>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBMask>
          </MDBView>
        </div>
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <MDBView className="special-color-dark">
          <MDBBtn
            color="primary"
            onClick={this.toggleCollapse("basicCollapse")}
            style={{ marginBottom: "1rem" }}
          >
            Full Style List
          </MDBBtn>
          <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
            <MDBContainer className="mx-auto">
              <div className="styleImageContainer special-color-dark ">
                <img
                  className="styleImage mx-auto"
                  src="DeepFilterStyles.jpg"
                />
              </div>
            </MDBContainer>
          </MDBCollapse>
        </MDBView>

        <div id="imageContainer" />
      </div>
    );
  }
}

export default App;
