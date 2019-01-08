import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormGroup, InputGroup } from "@blueprintjs/core";
import Form, { FormState } from './Form';
import Simulation from './Simulation';

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
              <Form onStart={this.onStartSim}/>
            </div>
            <div className="SimulationContent">
              <Simulation />
            </div>
          </div>
          <div className="AppFooter">Jouer comporte des risques stupides. Je veux dire, on est dans le mathématiquement absurde, la. Ne jouez pas au loto.</div>

      </div>
    );
  }
  //private onStartSim = (formState: FormState) =>  
}

export default App;
