import React, { Component } from "react";
import "./BalanceChart.css"
import Chart, { Point } from 'chart.js';

class BalanceChart extends Component {
    public chart ?: Chart;
    public dataPoints: Array<Point> = [];
    public dataLabels: string[] = [];
    public lastUpdate = new Date();

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.chart = new Chart("myChart", {
            type: 'line',
            data: {
                datasets: [{
                    label: "Balance",
                    data: this.dataPoints,
                    borderWidth: 1
                }]
            },
            options: {
                animation: {
                    duration: 0, // general animation time
                },
                hover: {
                    animationDuration: 0, // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0, // animation duration after a resize
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                },
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
        <canvas id="myChart" width="400" height="100%"></canvas>
      )
    }

}


export default BalanceChart;