import { withStyles } from "@material-ui/styles";
import React, { Component, useCallback, useState, useEffect } from "react";
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

 
class Lgchem extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], isLoaded: false, news: [], covid: [] };
  }
  
  componentDidMount() {
    //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
    // fetch("https://canvasjs.com/data/docs/ltcusd2018.json")
    fetch(`http://localhost:8080/kospi/lgchem`)
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

      fetch(`http://localhost:8080/kospi/lgchemnews`)
      .then(res => res.json())
      .then(data => {
        data = data.slice(0, 5)
        console.log(data)
        this.setState({news: data})
      })

      fetch(`http://localhost:8080/kospi/koreacovid`)
      .then(res => res.json())
      .then(data => {
        data = data.slice(0, 5)
        console.log(data)
        this.setState({covid: data})
      })
  }
 
  render() {
    const options = {
      theme: "light2",
      title:{
        text:"LG chem, Ltd.(051910.KS)"
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
      <div className="m-sm-30">
        <div  className="mb-sm-30" style={{display: 'inline-block'}}>
          <Breadcrumb
            routeSegments={[
              { name: "LG 화학" }
            ]}
          />
        </div>

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
          
            <Grid container spacing={3} className="mb-24">
              
              <Grid item xs={12} md={6}>
                 <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                   <div>
                     <div className="ml-12" style={{borderBottom: '1px solid lightgrey'}}>
                       <TableHead>
                        <h5 className="text-primary inlineblock">LG 화학 뉴스</h5>
                       </TableHead>
                     </div>
                     <div>
                     <TableBody>
                     {this.state.news.map((row, idx) => (
                       <TableRow key={row.id} fullWidth>
                        <TableCell align="left" width="10%">{row.id}</TableCell>
                        <TableCell align='left' width="80%" style={{cursor: 'pointer'}} noWrap>
                          <a href={row.url}>{row.headline}</a>
                        </TableCell>
                        <TableCell align="right" width="10%">{row.date}</TableCell>
                       </TableRow>
                     ))}
                     </TableBody>
                     </div>
                   </div>
                 </Card>
              </Grid>
                 {/* covid */}
                <Grid item xs={12} md={6}>
                  <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                    <div>
                      <div className="ml-12" style={{borderBottom: '1px solid lightgrey'}}>
                        <TableHead>
                          <h5 className="text-primary inlineblock">Covid-19 현황</h5>
                        </TableHead>
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">
                              <Typography variant="subtitle2" color="inherit" noWrap>
                                서울 확진자
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="subtitle2" color="inherit" noWrap>
                                서울 사망자
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="subtitle2" color="inherit" noWrap>
                                전국 확진자
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="subtitle2" color="inherit" noWrap>
                                전국 사망자
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </div>
                      <div>
                      <TableBody>
                      {this.state.covid.map((row, idx) => (
                        <TableRow fullWidth>
                          {/* <TableCell align='left' noWrap>{row.date}</TableCell> */}
                          <TableCell align='left' noWrap>{row.seoul_cases}</TableCell>
                          <TableCell align='left' noWrap>{row.seoul_deaths}</TableCell>
                          <TableCell align='left' noWrap>{row.total_cases}</TableCell>
                          <TableCell align='left' noWrap>{row.total_deaths}</TableCell>
                        </TableRow>
                      ))}
                      </TableBody>
                      </div>
                    </div>
                  </Card>
                 </Grid>
              </Grid>
            </div>
        </div>
      </>  
    );
  }
}

const LGchemNews = () => {

  const [news, setNews] = useState(null)

  return(
    <div><p>{news}</p></div>
    // <Grid container spacing={3} className="mb-24">
    //   <Grid item xs={12} md={6}>
    //     <Card className="play-card p-sm-24 bg-paper" elevation={6}>
    //       <div className="flex flex-middle">
    //         <div className="ml-12">
    //           <h5 className="text-primary inlineblock">LG 화학 뉴스</h5>
    //         </div>
    //         <div>
    //           {news}
    //         </div>
    //       </div>
    //     </Card>
    //   </Grid>
    // </Grid>
  )
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

export default withStyles({}, { withTheme: true } )(Lgchem); 