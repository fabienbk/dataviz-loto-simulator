import React, { Component } from 'react';
import { FormGroup, Slider, Divider, Button } from "@blueprintjs/core";
import { getTicketPriceLabel } from './Tools';
import './Form.css'

export interface FormState {
    mainNum: number;
    chanceNum: number;
    iterationIndex: number;
    iterations: number;
}

export interface FormProps {
    onStart: (arg0: FormState) => any;
}

class Form extends Component<FormProps, any> {
    public state: FormState = {
        mainNum: 5,
        chanceNum: 1,
        iterationIndex: 1,
        iterations: 1
    };
    public iterations = [ 1, 10, 100, 1000, 10000, 100000, 1000000 ];
    
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <FormGroup label="Numéros principaux" labelFor="text-input">
                    <Slider initialValue={5} min={5} max={9} stepSize={1} onChange={this.onNumChange} value={this.state.mainNum} />
                </FormGroup>
                <FormGroup label="Numéros chances" labelFor="SliderChanceNum">
                    <Slider className="SliderChanceNum" initialValue={1} min={1} max={10} stepSize={1} onChange={this.onNumChanceChange} value={this.state.chanceNum} />
                </FormGroup>

                <Divider className={"divider"}/>

                <span className={"ticketPrice"}>Coût d'une grille : {getTicketPriceLabel(this.state.mainNum, this.state.chanceNum)}</span>

                <Divider className={"divider"}/>
                
                <FormGroup label="Nombre de tickets à jouer" labelFor="text-input">
                    <Slider initialValue={0} min={0} max={6} stepSize={1} showTrackFill={true}
                    onChange={this.onIterationChange}
                    value={this.state.iterationIndex} labelRenderer={this.iterationRenderer}/>
                </FormGroup>

                <Divider className={"divider"}/>
                
                <Button text="Démarrer la simulation" onClick={this.onStart}/>
            </div>
        )
    }

    private onNumChange = (num: number) => this.setState({ mainNum: num });
    private onNumChanceChange = (num: number) => this.setState({ chanceNum: num });
    private onIterationChange = (num: number) => this.setState({ iterationIndex: num, iterations: this.iterations[num] });
    private onStart = () => this.props.onStart(this.state);
    private iterationRenderer = (val: number) => (this.iterations[val] || "N/A").toLocaleString();
    
}

export default Form;