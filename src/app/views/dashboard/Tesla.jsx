import { withStyles } from "@material-ui/styles";
import React, { Component, Fragment } from "react";
import CanvasJSReact from './canvasjs.stock.react';
import DoughnutChart from '../charts/echarts/Doughnut';
// import TableCard from '../shared/TableCard'
import {Grid, Card} from '@material-ui/core';
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
class TeslaGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], isLoaded: false };
  }
  componentDidMount() {
    //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
    // fetch("https://canvasjs.com/data/docs/ltcusd2018.json")
	  fetch(`http://localhost:8080/nasdaq/tesla`)
      .then(res => res.json())
      .then(
        (data) => {
          var dps1 = [], dps2 = [], dps3 = [];
          for (var i = 0; i < data.length; i++) {
            dps1.push({
              x: new Date(data[i].date),
              y: [
                Number(data[i].open),
                Number(data[i].high),
                Number(data[i].low),
                Number(data[i].close),
                Number(data[i].adjclose)
              ]
            });
            dps2.push({x: new Date(data[i].date), y: Number(data[i].volume)});
            dps3.push({x: new Date(data[i].date), y: Number(data[i].close)});
          }
          this.setState({
            isLoaded: true,
            dataPoints1: dps1,
            dataPoints2: dps2,
            dataPoints3: dps3
          });
        }
      )
  }
  render() {
    let {theme} = this.props;
    const options = {
      theme: "dark2",
      title:{
        text:"Tesla, Inc.(TSLA)"
      },
      subtitles: [{
        text: "Price-Volume Trend"
      }],
      charts: [{
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter: function(e) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function(e) {
              return "";
            }
          }
        },
        axisY: {
          title: "US Dollar",
          prefix: "$",
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{ 
          name: "Price (in USD)",
          yValueFormatString: "$#,###.##",
          type: "candlestick",
          dataPoints : this.state.dataPoints1
        }]
      },{
        height: 100,
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        axisY: {
          title: "Volume",
          prefix: "$",
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Volume",
          yValueFormatString: "$#,###.##",
          type: "column",
          dataPoints : this.state.dataPoints2
        }]
      }],
      navigator: {
        data: [{
          dataPoints: this.state.dataPoints3
        }],
        slider: {
          minimum: new Date("2010-06-29"),
          maximum: new Date("2020-10-28")
        }
      }
    };
    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto"
    };
    return (
      <Fragment>
        <div className="pb-86 pt-30 px-30 bg-primary">
          <CanvasJSStockChart 
          containerProps={containerProps}
          options = {options}
          ></CanvasJSStockChart>
        </div>
        <div className="analytics m-sm-30 mt--72">
          <Grid container spacing={2}
        direction="row"
        justify="space-evenly"
        alignItems="center">
            <Card className="px-30 py-30 mb-16">
              <div className="card-title">News Sentiment</div>
              <div className="card-subtitle">First half of 2020</div>
              <DoughnutChart
              height="300px"
              color={[
                "#b28704",
                "#e91e63",
                "#8bc34a"
              ]}
              />
            </Card>
            </Grid>
        </div>
      </Fragment>
    );
  }
}
export default withStyles({}, { withTheme: true }) (TeslaGraph, DoughnutChart);