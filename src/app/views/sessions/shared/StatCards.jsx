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
import { useHistory } from 'react-router-dom'


const StatCards = ({theme}) => {

  const sessionMember = sessionStorage.getItem('sessionMember')
  const history = useHistory()
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
                <h5 className="text-primary inlineblock">{row.stock_ticker}&nbsp;&nbsp;<small className="text-muted">{row.stock_type}</small></h5>
                {/* <h6 className="m-0 mt-4 text-primary font-weight-500">3050</h6> */}
              </div>
            </div>
            {row.stock_ticker == 'LG화학'
            ?
            <Tooltip title="View Details" placement="top" onClick={() => history.push('/kospi/lgchem')}>
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
            : row.stock_ticker == 'LG이노텍'
            ?
            <Tooltip title="View Details" placement="top" onClick={() => history.push('/kospi/lginnotek')}>
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
            :row.stock_ticker == 'AAPL'
            ?
            <Tooltip title="View Details" placement="top" onClick={() => history.push('/nasdaq/apple')}>
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
            :row.stock_ticker == 'TSLA'
            ?
            <Tooltip title="View Details" placement="top" onClick={() => history.push('/nasdaq/tesla')}>
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
            : null
            }
            
          </Card>
        </Grid>
      ))}

    </Grid>
  );
};

export default StatCards;
