import React, { Component, useCallback, useState, useEffect } from "react"
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Tooltip,
} from "@material-ui/core"

import { context as c } from '../../../../context'
import axios from 'axios'


const StatCards = ({theme}) => {

  const sessionMember = sessionStorage.getItem('sessionMember')
  const [recommend, setRecommend] = useState([])

  useEffect(() => {
    getRecommendStocks()
  }, [])

  const getRecommendStocks = useCallback(async e => {
    try{
      const req = {
        method: c.get,
        url: `${c.url}/api/trading-recommend/${sessionMember}`
      }
      const res = await axios(req)
      console.log(res.data)
      setRecommend(res.data)
    }catch(err){
      throw(err)
    }
  })

  return (
    <Grid container spacing={3} className="mb-24">

      {recommend.map((row) => (
        <Grid item xs={12} md={6}>
          <Card className="play-card p-sm-24 bg-paper" elevation={6}>
            <div className="flex flex-middle">
              <div className="ml-12">
                <h5 className="text-muted inlineblock">{row.stock_ticker}&nbsp;&nbsp;<small className="text-muted">{row.stock_type}</small></h5>
                <h6 className="m-0 mt-4 text-primary font-weight-500">3050</h6>
              </div>
            </div>
            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </Card>
        </Grid>
      ))}

    </Grid>
  );
};

export default StatCards;
