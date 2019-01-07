import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormGroup, InputGroup } from "@blueprintjs/core";

import { getTicketPrice } from './Simulation'

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

              {getTicketPrice(5,1)}

              <FormGroup
                inline={true}
                label="Prix de la grille"
                labelFor="text-input">
                <InputGroup id="text-input" placeholder="Placeholder text" />
          </FormGroup>    

            </div>
            <div className="SimulationContent">bb</div>
          </div>
          <div className="AppFooter">Footer</div>

      </div>
    );
  }
}

export default App;
