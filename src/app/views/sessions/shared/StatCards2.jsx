import React, { Component, useState, useCallback, useEffect } from "react";
import {
  Grid,
  Card,
  Icon,
  Fab,
} from "@material-ui/core";
import axios from 'axios'
import { context as c } from '../../../../context'

const StatCards2 = (props) => {
  const member = props.session
  // console.log(member)
  const sessionMember = sessionStorage.getItem("sessionMember")

  // const [tradeStock, setTradeStock] = useState([])
  const [withholdings, setWithholdings] = useState(0)

  useEffect(() => {
    getTrading()
  }, [])

  const getTrading = useCallback(async e => {
    try{
      const req = {
        method: c.get,
        url: `${c.url}/api/tradings/${sessionMember}`,
      }
      const res = await axios(req)
      const tradeStock = res.data
      let temp_num = 0
      for (let i=0; i < tradeStock.length; i++){
        temp_num = temp_num + tradeStock[i].price*tradeStock[i].stock_qty
      }
      setWithholdings(temp_num)
    }catch (err){
      alert('FAIL')
      throw(err)
    }
  }, [])

  return (
    <Grid container spacing={3} className="mb-24">
      <Grid item xs={12} md={6}>
        <Card elevation={3} className="p-16">
          <div className="flex flex-middle">
            <Fab
              size="medium"
              className="bg-light-green circle-44 box-shadow-none"
            >
              <Icon className="text-green">trending_up</Icon>
            </Fab>
            <h5 className="font-weight-500 text-green m-0 ml-12">
              <b>예수금</b>
            </h5>
          </div>
          <div className="pt-16 flex flex-middle">
            <h2 className="m-0 text-muted flex-grow-1">$ {withholdings.toFixed(2)}</h2>
            {/* <div className="ml-12 small-circle bg-green text-white">
              <Icon className="small-icon">expand_less</Icon>
            </div> */}
            {/* <span className="font-size-13 text-green ml-4"> (+21%)</span> */}
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card elevation={3} className="p-16">
          <div className="flex flex-middle">
            <Fab
              size="medium"
              className="bg-light-error circle-44 box-shadow-none overflow-hidden"
            >
              <Icon className="text-error">star_outline</Icon>
            </Fab>
            <h5 className="font-weight-500 text-error m-0 ml-12">
              <b>잔 금</b>
            </h5>
          </div>
          <div className="pt-16 flex flex-middle">
            {/* <h2 className="m-0 text-muted flex-grow-1">${member.balance < 0 ? member.balance*-1 : 0}</h2> */}
            <h2 className="m-0 text-muted flex-grow-1">$ {(member.balance - withholdings).toFixed(2)}</h2>
            {/* <div className="ml-12 small-circle bg-error text-white">
              <Icon className="small-icon">expand_more</Icon>
            </div> */}
            {/* <span className="font-size-13 text-error ml-4">(+21%)</span> */}
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatCards2;
