import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormGroup, InputGroup } from "@blueprintjs/core";
import Form from './Form';
import Simulation from './Simulation';

class AppState {
  
}

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="AppHeader">
            <div className="NavBar">
              <img src={logo} className="Logo" alt="logo" />
              <span className="Title">Loto Simulator</span>
            </div>
          </div>
          <div className="AppContent">
            <div className="ConfigContent">
              <Form />
            </div>
            <div className="SimulationContent">
              <Simulation />
            </div>
          </div>
          <div className="AppFooter">Footer</div>

      </div>
    );
  }
}

export default App;
