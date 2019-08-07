import React, { Component } from "react";
import ReactDOM from "react-dom";
import { MDBJumbotron, MDBBtn, MDBContainer } from "mdbreact";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    data: null,
    styleName: "alien_goggles",
    sourceImageURL: null
  };
  constructor(props) {
    super(props);
    this.callMyAPI = this.callMyAPI.bind(this);
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.handleSourceImageChange = this.handleSourceImageChange.bind(this);
  }

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
        <div className="styleImageContainer">
          <img className="styleImage" src="DeepFilterStyles.jpg" />
        </div>
        <div className="bg" />
        <MDBJumbotron>
          <form action="">
            <input
              type="text"
              value={this.state.sourceImageURL}
              onChange={this.handleSourceImageChange}
            />
          </form>
        </MDBJumbotron>

        <div className="styleNameContainer">
          <select
            name="styleDropdown"
            id="styleDropdown"
            onChange={e => this.handleStyleChange()}
          >
            {dropdownStyles}
          </select>
          <p className="styleName">Style Name</p>
        </div>
        <div>styleName state: {this.state.styleName}</div>
        <div>sourceImageURL state: {this.state.sourceImageURL}</div>
        <button onClick={this.callMyAPI}>Call API</button>
        <div id="imageContainer" />
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;
