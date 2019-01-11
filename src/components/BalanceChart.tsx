import React, { Component } from "react";
import "./BalanceChart.css"
import Chart from 'chart.js';

class BalanceChart extends Component {
    public chart ?: Chart;
    public dataPoints: Array<number> = [];
    public lastUpdate = new Date();

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.chart = new Chart("myChart", {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'Balance',
                    data: this.dataPoints,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
      this.lastUpdate = new Date();
      return (
        <canvas id="myChart" width="400" height="400"></canvas>
      )
    }

}


export default BalanceChart;