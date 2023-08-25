import React from 'react';
import './App.css';
import Clarifai from "clarifai";
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import Logo from './components/Logo/Logo';


const app = new Clarifai.App({
  apiKey: "1d295a477b734570b395a0d0e9205dc5"
});

const initialState = {
    input: "",
    imageUrl: "",
    box: {},
    button: "",
    route: "signin",
    isSignedIn: false, 
    start: "cool",
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: ""
    }
  }

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState
  }

 loadUser = (data) => {
  this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
 }

  calculateFaceLocation = (response) => {
    const Positions = []
    const multipleFace = response.outputs[0].data.regions;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    for (let i=0; i < multipleFace.length; i++){
      let clarifaiFace2 = response.outputs[0].data.regions[i].region_info.bounding_box
      let clarifaiSinglePositions = {
        leftCol: clarifaiFace2.left_col * width,
        topRow: clarifaiFace2.top_row * height,
        rightCol: width - (clarifaiFace2.right_col * width),
        bottomRow: height - (clarifaiFace2.bottom_row * height) - (-0.01*height)
      };
      Positions.push(clarifaiSinglePositions)

    }
    return(Positions)
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // this.displayFaceBox(this.calculateFaceLocation(response)
  onButtonSubmit = () => {
    if (this.state.button === "Delete"){
      this.setState({input: ""})
    }

    if (this.state.input.length >= 10){
      if (this.state.button === "Detect" || this.state.button === ""){
        app.models
        .predict(
          "face-detection",
          this.state.input)
        .then(response => {
          if (response) {
            fetch("http://localhost:3000/image", {
              method: "put",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                  id: this.state.user.id,
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count }))
              })
              .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
  
        })
        .catch(err => console.log(err))
        
        this.setState({button: "Delete"})
      }else{
        this.setState({button: "Detect"})
      }
    }
    
    this.setState({ imageUrl: this.state.input });
  
   
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({isSignedIn: false})
      this.setState(initialState)
    }else if (route === "home"){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const {isSignedIn, imageUrl, route, box, button} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === "home" 
          ? <div>
              <Logo />
              <Rank userName={this.state.user.name} userEntries={this.state.user.entries} />
              <ImageLinkForm
              input={this.state.input}
              onButtonSubmit={this.onButtonSubmit}
              onInputChange={this.onInputChange}
              button2={button}
              />
              <FaceRecognition style={{marginBottom: "50px"}} box={box} imageUrl={imageUrl} />
            </div>
          : (
            route === "signin"
            ?
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
            
         
        }
      </div>
    );
  }
}

export default App;
