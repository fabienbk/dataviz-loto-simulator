import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ProgressBar } from "@blueprintjs/core";
import Form, { FormState } from './Form';
import { getWinnings, getTicketPrice, euros } from './Tools';
import { accessSync } from 'fs';

enum SimState {
  OFF, STARTED, ENDED
}

interface Winning {
  count: number;
  amount: number;
}

type Winnings = { [label: string]: Winning; };

interface SimUpdate {  
  balanceDelta: number;
  winningsUpdate: Winnings;
}

interface AppState {
  simulationState: SimState;
  formState?: FormState,
  iteration: number;
  currentWin: number;
  winnings: Winnings;
}

class App extends Component {
  public state: AppState = {
    simulationState: SimState.OFF,
    iteration: 0,
    currentWin: 0,
    winnings : {}
  };

  render() {
    let simulationContent;
    if (this.state.simulationState == SimState.OFF) {
      simulationContent = <div/>
    }
    else {
      let w = this.state.winnings;
      simulationContent = <div>
        
        <h1>Balance: {euros(this.state.currentWin)}</h1>

        <ProgressBar value={this.getProgressFloat()} animate={false} intent={"primary"} />
        <table className={"bp3-html-table .modifier"}>
          <thead>
            <tr>
              <th>Gains</th>
              <th>Nombre d'occurences</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody> 
            { 
              Object.keys(w)
                  .map(key => {
                      return (<tr>
                        <td>{key}</td>
                        <td>{w[key].count}</td>
                        <td>{euros(w[key].amount)}</td>
                      </tr>)
                  })
            }
          </tbody>
        </table>
      </div>
    }

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
            {simulationContent}
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
        if (this.state.formState && i < this.state.formState.iterations) {          
            this.setState({ iteration: i + 1 });
            this.runOneGame(this.state.formState, 1);           // TODO adapt iterations
        }
        else
          this.setState({ simulationState: SimState.ENDED });
      });
      
    }
  }

  generateNumbers(n : number, max: number) {
    let balls = Array.from(Array(max + 1).keys()).slice(1);
    let result = Array<number>();
    for (let i = 0; i < n; i ++) {
      let ri = Math.round(Math.random() * balls.length);
      let ball = balls[ri]; 
      balls.splice(ri, 1);
      result.push(ball);
    }
    return result.sort();
  }

  runOneGame =  (formState: FormState, n: number) => {      
    let updateList = [ ];

    for(let i = 0; i < n; i++) {
      updateList.push(this.simOneGame(formState));
    }
    
    let accumulatedUpdate = updateList.reduce( (acc, current) => {
      acc.balanceDelta += current.balanceDelta;
      Object.keys(current.winningsUpdate).forEach( k => {
        if (acc.winningsUpdate[k]) {
          acc.winningsUpdate[k].amount += current.winningsUpdate[k].amount;
          acc.winningsUpdate[k].count += 1;
        }
        else {
          acc.winningsUpdate[k] = {count: 1, amount: current.winningsUpdate[k].amount};
        }
      });
      return acc;
    });

    // TODO merge into state

    this.setState({..accumulatedUpdate});
  }

  simOneGame =  (formState: FormState) : SimUpdate => {
    let balls = this.generateNumbers(5, 49);
    let chance = this.generateNumbers(1, 10);
    let playerBalls = this.generateNumbers(5, 49);
    let playerChance = this.generateNumbers(1, 10);
    let matchingBalls = balls.filter(value => -1 !== playerBalls.indexOf(value)).length;
    let matchingChances = chance.filter(value => -1 !== playerChance.indexOf(value)).length;

    let cost = getTicketPrice(formState.mainNum, formState.chanceNum);
    let win = getWinnings(matchingBalls, matchingChances);

    let net : number = (win - (cost || 0));
    let winUpdate : Winnings = {};

    if (win > 0) {
      let label = matchingBalls + (matchingChances > 0 ? " + Chance" : "");
      if (winUpdate[label]) {
        winUpdate[label].count ++;
        winUpdate[label].amount += net;
      }
      else {
        winUpdate[label] = {amount: net, count: 1}
      }      
    }
    
    return { balanceDelta: net, winningsUpdate: winUpdate};
  }


  getProgressFloat = () => {
    if (this.state.formState)
      return this.state.iteration / this.state.formState.iterations;
    return 0;
  }

  onStartSim = (formState: FormState) => {
    this.setState({
      simulationState: SimState.STARTED,
      iteration: 0,
      formState: formState,
      currentWin: 0,
      winnings: {},
    });
  }
}

export default App;
