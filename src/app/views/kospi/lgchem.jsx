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

 
class Lgchem extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], isLoaded: false, news: [], covid: [], 
      sessionMember: sessionStorage.getItem('sessionMember'), 
      member: {
        email: '',
        password: '',
        name: '',
        profile: '', 
        geography: '', 
        gender: '', 
        age: 0, 
        tenure: 0, 
        stock_qty: 0, 
        balance: 0.0, 
        has_credit: 0, 
        credit_score: 0, 
        is_active_member: 1, 
        estimated_salary: 0.0, 
        role: '',
        probability_churn: 0.0,
        exited: 0
    },
    trading: {
      id: 0,
      email: '',
      stock_type: '',
      stock_ticker: '',
      stock_qty: 0,
      trading_date: ''
    },
    isTraded: false,
    withholdings: 0, balance: 0,
    buyQty: 1, sellQty: 1, stockPrice: 0
   };
  }



  // getTime = () => {
  //     let today = new Date()
  //     let yyyy = today.getFullYear().toString()
  //     let mm = (today.getMonth() + 1).toString()
  //     let dd = today.getDate().toString()

  //     let hours = today.getHours().toString()
  //     let minutes = today.getMinutes().toString()
  //     let seconds = today.getSeconds().toString()

  //     let result = yyyy + '/' + (mm[1] ? mm : '0' + mm[0]) + '/' + (dd[1] ? dd : '0' + dd[0]) + ' ' 
  //     + (hours[1] ? hours : '0' + hours[0]) + ':' + (minutes[1] ? minutes : '0' + minutes[0]) + ':' + (seconds[1] ? seconds : '0' + seconds[0])
  //     return result
  // }
      

  // insertBuyTrading = () => {
  //   const today = this.getTime()
  //   const balance = document.getElementById('balance').value
  //   alert(this.state.buyQty*this.state.stockPrice)
  //   if((this.state.buyQty*this.state.stockPrice) > balance){
  //       alert('잔금이 부족합니다.')
  //       return
  //   }
  //   const data = {
  //       email: this.state.sessionMember,
  //       stock_type: 'KOSPI',
  //       stock_ticker: 'LG화학',
  //       stock_qty: this.state.buyQty,
  //       price: this.state.stockPrice,
  //       trading_date: today
  //   }
  //   const req = {
  //       method: c.post,
  //       url: `${c.url}/api/trading/0`,
  //       data: data
  //   }
  //   this.updateMember()
  //   alert('매수되었습니다.')
  //   // setBuyQty(1)
  // }

  // updateBuyTrading = () => {
  //   alert('UPDATE')
  // }

  // updateMember = () => {
  //   this.state.member.stock_qty = this.state.member.stock_qty + 1
  //   fetch({url: `${c.url}/api/member/${this.state.sessionMember}`, method: c.put, data: this.state.member})
  //   .then(res => {console.log('UPDATEMEMBER:', res)})
  // }

  // // 매수
  // buyStock = () => {
  //   const re = window.confirm('매수하시겠습니까?')
  //   if (re) {
  //     if(this.state.isTraded){
  //         this.updateBuyTrading()
  //     }else{
  //         this.insertBuyTrading()
  //     }
  //   }
  // }

  
 
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
            dataPoints3: dps3,
            stockPrice: data[0].low / 1129.16
          });
        }
      )

      // fetch(`http://localhost:8080/kospi/lgchemnews`)
      // .then(res => res.json())
      // .then(data => {
      //   data = data.slice(0, 5)
      //   console.log(data)
      //   for (var i in data){
      //     var date = new Date(data[i].date)
      //     var yyyy = date.getFullYear().toString()
      //     var mm = (date.getMonth()+1).toString()
      //     var dd  = date.getDate().toString()
      //     var hh = date.getHours().toString()
      //     var min = date.getMinutes().toString()
      //     var ss = date.getSeconds().toString()
      //     data[i].date = yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]) + ' ' + (hh[1]?hh:'0'+hh[0]) + ':' + (min[1]?min:'0'+min[0])
      //   }
      //   this.setState({news: data})
      // })

      // fetch(`http://localhost:8080/kospi/koreacovid`)
      // .then(res => res.json())
      // .then(data => {
      //   data = data.reverse()
      //   data = data.slice(0, 5)
      //   console.log(data)
      //   for (var i in data){
      //     var date = new Date(data[i].date)
      //     var yyyy = date.getFullYear().toString()
      //     var mm = (date.getMonth()+1).toString()
      //     var dd  = date.getDate().toString()
      //     data[i].date = yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0])
      //   }
      //   this.setState({covid: data})
      // })

      // getMember
      // fetch(`${c.url}/api/member/${this.state.sessionMember}`)
      // .then(res => res.json())
      // .then(data => {
      //   this.setState({member: data[0]})
      // })

      // // getTradings
      // fetch(`${c.url}/api/tradings/${this.state.sessionMember}`)
      // .then(res => res.json())
      // .then(data => {
      //   console.log(data)
      //   let temp_num = 0
      //   // 해당 멤버가 거래한 종목 중 이 화면의 해당 종목이 있는지 확인해서 반환
      //   const isAlready = data.filter(function(t){ return t['stock_ticker'] == 'LG화학' })
      //   this.setState({trading: isAlready[0]})

      //   if (isAlready.length > 0){
      //       this.setState({isTraded: true})
      //       // 예수금 구하기
      //       for (let i=0; i < isAlready.length; i++){
      //           temp_num = temp_num + isAlready[i].price*isAlready[i].stock_qty
      //       }
      //   }else{ 
      //       this.setState({isTraded: false})
      //       // 예수금 구하기
      //       for (let i=0; i < isAlready.length; i++){
      //           temp_num = temp_num + data[i].price*data[i].stock_qty
      //       }
      //   }
      //   alert(temp_num)
      //   this.setState({withholdings: temp_num.toFixed(2)})
      // })

      // // getBalance
      // this.setState({balance: (this.state.member.balance - this.state.withholdings).toFixed(2)})


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

export default withStyles({}, { withTheme: true } )(Lgchem); 