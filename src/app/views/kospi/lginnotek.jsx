import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import CanvasJSReact from './canvasjs.stock.react';
import { Breadcrumb } from "matx"
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core"
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import {axios} from 'axios'
import ReactEcharts from "echarts-for-react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

 
class Lginnotek extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], isLoaded: false, news: [], covid: [] };
  }
  
  componentDidMount() {
    //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
    // fetch("https://canvasjs.com/data/docs/ltcusd2018.json")
    fetch(`http://localhost:8080/kospi/lginnotek`)
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
                Number(data[i].close)
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

      fetch(`http://localhost:8080/kospi/lginnoteknews`)
      .then(res => res.json())
      .then(data => {
        data = data.slice(0, 5)
        console.log(data)
        for (var i in data){
          var date = new Date(data[i].date)
          var yyyy = date.getFullYear().toString()
          var mm = (date.getMonth()+1).toString()
          var dd  = date.getDate().toString()
          var hh = date.getHours().toString()
          var min = date.getMinutes().toString()
          var ss = date.getSeconds().toString()
          data[i].date = yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]) + ' ' + (hh[1]?hh:'0'+hh[0]) + ':' + (min[1]?min:'0'+min[0])
        }
        this.setState({news: data})
      })

      fetch(`http://localhost:8080/kospi/koreacovid`)
      .then(res => res.json())
      .then(data => {
        data = data.slice(0, 5)
        console.log(data)
        for (var i in data){
          var date = new Date(data[i].date)
          var yyyy = date.getFullYear().toString()
          var mm = (date.getMonth()+1).toString()
          var dd  = date.getDate().toString()
          data[i].date = yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0])
        }
        this.setState({covid: data})
      })
  }
 
  render() {
    const options = {
      theme: "light2",
      title:{
        text:"LG Innotek, Ltd.(011070.KS)"
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
          title: "KRW",
          prefix: "₩",
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Price (in KRW)",
          yValueFormatString: "#,###.## ₩",
          type: "candlestick",
          risingColor: "red",
          fallingColor: "blue",
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
          prefix: "₩",
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Volume",
          yValueFormatString: "#,###.## ₩",
          type: "column",
          dataPoints : this.state.dataPoints2
        }]
      }],
      navigator: {
        data: [{
          dataPoints: this.state.dataPoints3
        }],
        slider: {
          minimum: new Date("2017-01-01"),
          maximum: new Date("2020-12-31")
        }
      }
    };
    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto"
    };


    return (
      <>

        <div> 
          <div>
            {
              // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
              this.state.isLoaded && 
              <CanvasJSStockChart containerProps={containerProps} options = {options}
                /* onRef = {ref => this.chart = ref} */
              />
            }
          </div>
          <br/>
        </div>
      </>
      
    );

    
    
  }
}

// const DoughnutChart = ({ height, color = [], theme }) => {
//   const option = {
//     legend: {
//       show: true,
//       itemGap: 20,
//       icon: "circle",
//       bottom: 0,
//       textStyle: {
//         color: theme.palette.text.secondary,
//         fontSize: 13,
//         fontFamily: "roboto"
//       }
//     },
//     tooltip: {
//       show: false,
//       trigger: "item",
//       formatter: "{a} <br/>{b}: {c} ({d}%)"
//     },
//     xAxis: [
//       {
//         axisLine: {
//           show: false
//         },
//         splitLine: {
//           show: false
//         }
//       }
//     ],
//     yAxis: [
//       {
//         axisLine: {
//           show: false
//         },
//         splitLine: {
//           show: false
//         }
//       }
//     ],

//     series: [
//       {
//         name: "Traffic Rate",
//         type: "pie",
//         radius: ["45%", "72.55%"],
//         center: ["50%", "50%"],
//         avoidLabelOverlap: false,
//         hoverOffset: 5,
//         stillShowZeroSum: false,
//         label: {
//           normal: {
//             show: false,
//             position: "center", // shows the description data to center, turn off to show in right side
//             textStyle: {
//               color: theme.palette.text.secondary,
//               fontSize: 13,
//               fontFamily: "roboto"
//             },
//             formatter: "{a}"
//           },
//           emphasis: {
//             show: true,
//             textStyle: {
//               fontSize: "14",
//               fontWeight: "normal"
//               // color: "rgba(15, 21, 77, 1)"
//             },
//             formatter: "{b} \n{c} ({d}%)"
//           }
//         },
//         labelLine: {
//           normal: {
//             show: false
//           }
//         },
//         data: [
//           {
//             value: 65,
//             name: "Google"
//           },
//           {
//             value: 20,
//             name: "Facebook"
//           },
//           { value: 15, name: "Others" }
//         ],
//         itemStyle: {
//           emphasis: {
//             shadowBlur: 10,
//             shadowOffsetX: 0,
//             shadowColor: "rgba(0, 0, 0, 0.5)"
//           }
//         }
//       }
//     ]
//   };

//   return (
//     <ReactEcharts
//       style={{ height: height }}
//       option={{
//         ...option,
//         color: [...color]
//       }}
//     />
//   );
// };

export default withStyles({}, { withTheme: true } )(Lginnotek); 