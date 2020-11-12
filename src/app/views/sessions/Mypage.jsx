import React, { useCallback, Fragment, useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
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

import { context as c } from '../../../context'
import axios from 'axios'

const Mypage =(props)=> {

  const history = useHistory()
  const sessionMember = sessionStorage.getItem("sessionMember")

  const [member, setMemberInfo] = useState({
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
    role: ''
  })

  useEffect(()=> {
    if (sessionMember == null){
      // alert('로그인 후 이용 가능한 서비스입니다.')
      history.push('/session/signin')
    }else{
      axios.get(`http://localhost:8080/api/member/${sessionMember}`)
      .then( res => {
        setMemberInfo(res.data[0])
      })
      .catch( e => {
        throw e
      })
    }
  }, [])

  


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
          <h4 className="card-title text-muted mb-16">{member.name||''}님을 위한 종목 추천</h4>
          <StatCards />
          <StatCards2 session={member}/>
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