import React, { Component, Fragment } from "react"
import {
  Grid,
  Card
} from "@material-ui/core"

import DoughnutChart from "../charts/echarts/Doughnut"

import ModifiedAreaChart from "./shared/ModifiedAreaChart"
import StatCards from "./shared/StatCards"
import TableCard from "./shared/TableCard"
import RowCards from "./shared/RowCards"
import StatCards2 from "./shared/StatCards2"
import UpgradeCard from "./shared/UpgradeCard"
import Campaigns from "./shared/Campaigns"
import { withStyles } from "@material-ui/styles"

import axios from 'axios'

const Mypage =()=> {
  return (
    <>
    <div className="pb-86 pt-30 px-30 bg-secondary">
      {/* <ModifiedAreaChart
        height="280px"
        option={{
          series: [
            {
              data: [34, 45, 31, 45, 31, 43, 26, 43, 31, 45, 33, 40],
              type: "line"
            }
          ],
          xAxis: {
            data: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ]
          }
        }}
      ></ModifiedAreaChart> */}
    </div>

    <div className="analytics m-sm-30 mt--72">
      {/* <Grid container spacing={3}> */}
        {/* <Grid item lg={8} md={8} sm={12} xs={12}> */}
          {/* Top Selling Products */}
          <TableCard/>
          <h4 className="card-title text-muted mb-16">OO님을 위한 종목 추천</h4>
          <StatCards />
          <StatCards2/>
          {/* <RowCards /> */}

        {/* </Grid> */}

        {/* <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card className="px-24 py-16 mb-16">
            <div className="card-title">Traffic Sources</div>
            <div className="card-subtitle">Last 30 days</div>
            <DoughnutChart
              height="300px"
            />
          </Card>

          <UpgradeCard/>

          <Campaigns/>

        </Grid> */}
      {/* </Grid> */}
    </div>
    </>
  )
}
  

export default withStyles({}, { withTheme: true })(Mypage);