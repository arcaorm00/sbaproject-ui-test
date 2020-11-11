import React, { Component, useCallback, useState, useEffect } from "react";
import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { useHistory } from 'react-router-dom'

import { context as c } from '../../../../context'
import axios from 'axios'

const TableCard = () => {

  const [tradeStock, setTradeStock] = useState([])
  const history = useHistory()
  const sessionMember = sessionStorage.getItem("sessionMember")

  useEffect(() => { getTrading() }, [])

  const getTrading = useCallback(async e => {
    try{
      const req = {
        method: c.get,
        url: `${c.url}/api/tradings/${sessionMember}`,
      }
      const res = await axios(req)
      console.log(res.data)
      setTradeStock(res.data)
    }catch (err){
      alert('FAIL')
      throw(err)
    }
  }, [])

  const productList = [
    {
      name: "temp",
      price: 100,
      available: 15
    },
    {
      name: "temp",
      price: 1500,
      available: 30
    },
    {
      name: "temp",
      price: 1900,
      available: 35
    },
    {
      name: "temp",
      price: 100,
      available: 0
    },
    {
      name: "temp",
      price: 1190,
      available: 5
    }
  ];

  return (
    <Card elevation={3} className="pt-20 mb-24">
      <div className="card-title px-24 mb-12">보유 주식</div>
      <div className="overflow-auto">
        <Table className="product-table">
          <TableHead>
            <TableRow>
              <TableCell className="px-24" colSpan={4}>
                종목
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                보유주 수량
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                투자 금액
              </TableCell>
            </TableRow>
          </TableHead>
          {tradeStock.length < 1
            ?
            <TableBody>
              <TableRow>
                <TableCell className="px-0" align="center" colSpan={8}>
                  <h5 className="text-muted mt-40 mb-40">아직 투자 중인 종목이 없습니다.</h5>
                </TableCell>
              </TableRow>
            </TableBody>
            :
            <TableBody>
            {tradeStock.map((product, index) => (
              <TableRow key={index}>
                {product.stock_ticker == 'LG화학'
                ?
                <TableCell className="px-0" colSpan={4} onClick={() => history.push('/kospi/lgchem')}>
                  <IconButton>
                    <h4>{product.stock_ticker}</h4>
                  </IconButton>
                </TableCell>
                : product.stock_ticker == 'LG이노텍'
                ?
                <TableCell className="px-0" colSpan={4} onClick={() => history.push('/kospi/lginnotek')}>
                  <IconButton>
                    <h4>{product.stock_ticker}</h4>
                  </IconButton>
                </TableCell>
                : product.stock_ticker == 'AAPL'
                ?
                <TableCell className="px-0" colSpan={4} onClick={() => history.push('/nasdaq/apple')}>
                  <IconButton>
                    <h4>{product.stock_ticker}</h4>
                  </IconButton>
                </TableCell>
                : product.stock_ticker == 'TSLA'
                ?
                <TableCell className="px-0" colSpan={4} onClick={() => history.push('/nasdaq/tesla')}>
                  <IconButton>
                    <h4>{product.stock_ticker}</h4>
                  </IconButton>
                </TableCell>
                : null
                }

                <TableCell className="px-0" align="left" colSpan={2}>
                  {/* {product.available ? (
                    product.available < 20 ? (
                      <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                        {product.available} available
                      </small>
                    ) : (
                      <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                        in stock
                      </small>
                    )
                  ) : (
                    <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                      out of stock
                    </small>
                  )} */}
                  {product.stock_qty} 주
                </TableCell>
                
                <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                  $
                  {product.price > 999
                    ? (product.price / 1000).toFixed(1) + "k"
                    : product.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          }
        </Table>
      </div>
    </Card>
  );
};

export default TableCard;
