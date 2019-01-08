import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormGroup, InputGroup } from "@blueprintjs/core";

class Form extends Component {
    render() {
      return (
        <FormGroup
        inline={true}
        label="Prix de la grille"
        labelFor="text-input">
        <InputGroup id="text-input" placeholder="Placeholder text" />
         </FormGroup>    
      )
    }
}

export default Form;