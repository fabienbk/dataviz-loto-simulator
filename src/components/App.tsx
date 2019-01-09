import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ProgressBar } from "@blueprintjs/core";
import Form, { FormState } from './Form';
import { number } from 'prop-types';

enum SimState {
  OFF, STARTED, ENDED
}

interface AppState {
  simulationState: SimState;
  formState?: FormState,
  iteration: number;
  currentWin: number;
}

class App extends Component {
  public state: AppState = {
    simulationState: SimState.OFF,
    iteration: 0,
    currentWin: 0
  };

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
            <Form onStart={this.onStartSim} />
          </div>
          <div className="SimulationContent">
            {
              this.state.simulationState == SimState.OFF ?
                <div /> :
                <div>
                  <ProgressBar value={this.getProgressFloat()} animate={false} />
                  <table className={"bp3-html-table .modifier"}>
                    <thead>
                      <tr>
                        <th>Gains</th>
                        <th>Nombre d'occurences</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2 numéros</td>
                        <td>1</td>
                        <td>1.3€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            }
          </div>
        </div>
        <div className="AppFooter">Jouer comporte des risques stupides. Je veux dire, on est dans le mathématiquement absurde, la. Ne jouez pas au loto.</div>

      </div>
    );
  }

  componentDidUpdate() {
    if (this.state.simulationState == SimState.STARTED) {

      window.requestAnimationFrame(() => {
        let i = this.state.iteration;
        if (this.state.formState && i < this.state.formState.iterations)
          this.setState({ iteration: i + 1 });
        else
          this.setState({ simulationState: SimState.ENDED });
      });
    }
  }

  private getProgressFloat = () => {
    if (this.state.formState)
      return this.state.iteration / this.state.formState.iterations;
    return 0;
  }

  private onStartSim = (formState: FormState) => {
    this.setState({
      simulationState: SimState.STARTED,
      iteration: 0,
      formState: formState
    });
  }
}

export default App;
