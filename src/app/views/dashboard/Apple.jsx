import { withStyles } from "@material-ui/styles";
import React, { Component, Fragment } from "react";
import CanvasJSReact from './canvasjs.stock.react';
import AppleNews from './AppleNews' 
import {Grid, Card} from '@material-ui/core';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
 
class AppleGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], isLoaded: false };
  }
 
  componentDidMount() {
    //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
    // fetch("https://canvasjs.com/data/docs/ltcusd2018.json")
	  fetch(`http://localhost:8080/nasdaq/apple`)
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
    const options = {
      theme: "light2",
      title:{
        text:"Apple, Inc.(APPL)",
        fontFamily: 'roboto'
      },
      subtitles: [{
        text: "Price-Volume Trend",
        fontFamily: 'roboto'
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
          fontFamily: 'roboto',
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Price (in USD)",
          yValueFormatString: "$#,###.##",
          type: "candlestick",
          fontFamily: 'roboto',
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
          fontFamily: 'roboto',
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Volume",
          yValueFormatString: "$#,###.##",
          type: "column",
          fontFamily: 'roboto',
          dataPoints : this.state.dataPoints2
        }]
      }],
      navigator: {
        data: [{
          dataPoints: this.state.dataPoints3
        }],
        slider: {
          minimum: new Date("2000-01-01"),
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
        <div>
        {/* <div className="pb-86 pt-30 px-30 bg-primary"> */}
          <CanvasJSStockChart 
          containerProps={containerProps}
          options = {options}
          ></CanvasJSStockChart>
        </div>
        <br/>
        {/* <div className="analytics m-sm-30 mt--72">
          <Grid container spacing={2}
        direction="row"
        justify="space-evenly"
        alignItems="center">
        
            <AppleNews/>
            
            </Grid>
        </div> */}
      </Fragment>
    );
  }
}
export default withStyles({}, { withTheme: true }) (AppleGraph);