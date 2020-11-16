import React, { useEffect, useCallback, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Grid, Card } from "@material-ui/core"
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import { Breadcrumb } from 'matx'

import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { context as c } from '../../../context'
import Lginnotek from './lginnotek'

const Trading = () => {

    const sessionMember = sessionStorage.getItem('sessionMember')
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
        role: '',
        probability_churn: 0.0,
        exited: 0
    })
    
    const [tradings, setTradings] = useState({
        id: 0,
        email: '',
        stock_type: '',
        stock_ticker: '',
        stock_qty: 0,
        trading_date: ''
    })
    const [isTraded, setIsTraded] = useState(false)
    const [withholdings, setWithholdings] = useState(0)
    const [balance, setBalance] = useState(0)
    const [totalStockPrice, setTotalStockPrice] = useState(0)
    const [thisPrice, setThisPrice] = useState(0)

    const [buyQty, setBuyQty] = useState(1)
    const [sellQty, setSellQty] = useState(1)

    const [news, setNews] = useState([])
    const [covid, setCovid] = useState([])

    useEffect(() => {
        getMember()
        getTradings()
        getBalance()
        getPrice()
        getNews()
        getCovid()
    }, [])

    const getMember = useCallback(async e => {
        try{
          const req = {
            method: c.get,
            url:`${c.url}/api/member/${sessionMember}`
          }
          const res = await axios(req)
          setMemberInfo(res.data[0])
        }catch(err){
          throw(e)
        }
    })

    const getTradings = useCallback(async e => {
        try{
            const req = {
                method: c.get,
                url: `${c.url}/api/tradings/${sessionMember}`
            }
            const res = await axios(req)
            console.log(res.data)

            let total = 0
            for (let i=0; i < res.data.length; i++){
                total = total + res.data[i].price * res.data[i].stock_qty
            }

            setTotalStockPrice(total)

            let temp_num = 0
            // 해당 멤버가 거래한 종목 중 이 화면의 해당 종목이 있는지 확인해서 반환
            const isAlready = res.data.filter(function(t){ return t['stock_ticker'] == 'LG이노텍' })
            setTradings(isAlready[0])
            if (isAlready.length > 0){
                setIsTraded(true)
                // 예수금 구하기
                for (let i=0; i < isAlready.length; i++){
                    temp_num = temp_num + isAlready[i].price*isAlready[i].stock_qty
                }
            }else{ 
                setIsTraded(false)
                // 예수금 구하기
                for (let i=0; i < isAlready.length; i++){
                    temp_num = temp_num + isAlready[i].price*isAlready[i].stock_qty
                }
            }
            setWithholdings(temp_num.toFixed(2))
        }catch(err){
            throw(err)
        }
    })

    // 잔금 구하기
    const getBalance = () => {setBalance((totalStockPrice - withholdings).toFixed(2))}

    let today = new Date()

    const getTime = () => {
        let yyyy = today.getFullYear().toString()
        let mm = (today.getMonth() + 1).toString()
        let dd = today.getDate().toString()

        let hours = today.getHours().toString()
        let minutes = today.getMinutes().toString()
        let seconds = today.getSeconds().toString()

        let result = yyyy + '/' + (mm[1] ? mm : '0' + mm[0]) + '/' + (dd[1] ? dd : '0' + dd[0]) + ' ' 
        + (hours[1] ? hours : '0' + hours[0]) + ':' + (minutes[1] ? minutes : '0' + minutes[0]) + ':' + (seconds[1] ? seconds : '0' + seconds[0])
        return result
    }
      
    today = getTime()

    const getPrice = useCallback(async e => {
        try{
            const req = {
                method: c.get,
                url: `${c.url}/kospi/lgchem`
            }
            const res = await axios(req)
            setThisPrice((res.data[0].low/1129.16).toFixed(2))
        }catch(err){
            throw(err)
        }
    })

    // 매수
    const buyStock = () => {
        const re = window.confirm('매수하시겠습니까?')
        if (re) {
            if(isTraded){
                updateBuyTrading()
            }else{
                insertBuyTrading()
            }
        }
    }

    const insertBuyTrading = useCallback(async e => {
        try{
            const balance = (member.balance - totalStockPrice).toFixed(2)
            alert(buyQty*thisPrice)
            if((buyQty*thisPrice) > balance){
                alert('잔금이 부족합니다.')
                return
            }
            const data = {
                email: sessionMember,
                stock_type: 'KOSPI',
                stock_ticker: 'LG이노텍',
                stock_qty: buyQty,
                price: thisPrice,
                trading_date: today
            }
            const req = {
                method: c.post,
                url: `${c.url}/api/trading/0`,
                data: data
            }
            const res = await axios(req)
            updateMember()
            alert('매수되었습니다.')
            setBuyQty(1)
        }catch(err){
            alert('매수에 실패했습니다.')
            throw(err)
        }
    })

    const updateBuyTrading = useCallback(async e => {
        const balance = (member.balance - totalStockPrice).toFixed(2)
        if((buyQty*thisPrice) > balance){
            alert('잔금이 부족합니다.')
            return
        }
        try{
            console.log(tradings)
            const data = {
                id: tradings.id,
                email: sessionMember,
                stock_type: 'KOSPI',
                stock_ticker: 'LG이노텍',
                stock_qty: ((tradings.stock_qty*1) + (buyQty * 1)),
                price: ( (tradings.price * tradings.stock_qty) + (thisPrice * buyQty) ) / ((tradings.stock_qty*1) + (buyQty * 1)),
                trading_date: today
            }
            console.log(data)
            const req = {
                method: c.put,
                url: `${c.url}/api/trading`,
                data: data
            }
            const res = await axios(req)
            alert('매수되었습니다.')
            setBuyQty(1)
            window.location.reload()
        }catch(err){
            alert('매수에 실패했습니다.')
            throw(err)
        }
    })

    const updateMember = useCallback(async e => {
        try{
            member.stock_qty = member.stock_qty + 1
            const req = {
                method: c.put,
                url: `${c.url}/api/member/${sessionMember}`,
                data: member
              }
            const res = await axios(req)
            window.location.reload()
        }catch(err){
            throw(err)
        }
    })


    //매도
    const sellStock = () => {
        const re = window.confirm('매도하시겠습니까?')
        if (re) {
            if(tradings.stock_qty > sellQty){
                member.balance = (member.balance - (tradings.stock_qty * tradings.price)) + (((tradings.stock_qty - sellQty) * tradings.price) + (sellQty * thisPrice))
                updateSellTrading()
            }else if(tradings.stock_qty == sellQty){
                member.balance = (member.balance - (tradings.stock_qty * tradings.price)) + (((tradings.stock_qty - sellQty) * tradings.price) + (sellQty * thisPrice))
                member.stock_qty = member.stock_qty - 1
                deleteTradings()
            }else{
                alert('보유하신 수량보다 많이 매도할 수 없습니다.')
            }
        } 
    }

    const updateSellTrading = useCallback(async e => {
        try{
            const data = {
                id: tradings.id,
                email: sessionMember,
                stock_type: 'KOSPI',
                stock_ticker: 'LG이노텍',
                stock_qty: tradings.stock_qty - sellQty,
                price: ( (tradings.price * tradings.stock_qty) - (thisPrice * sellQty) ) / (tradings.stock_qty - sellQty),
                trading_date: today
            }
            console.log(data)
            const req = {
                method: c.put,
                url: `${c.url}/api/trading`,
                data: data,
                auth: c.auth
            }
            const res = await axios(req)
            alert('매도 되었습니다.')
            setSellQty(1)
            window.location.reload()
        }catch(err){
            alert('매도에 실패했습니다.')
            throw(err)
        }
    })

    const deleteTradings = useCallback(async e => {
        try{
            const req = {
                method: c.delete,
                url: `${c.url}/api/trading/${tradings.id}`
            }
            const res = await axios(req)
            alert('매도 되었습니다.')
            updateSellMember()
            setSellQty(1)
        }catch(err){
            alert('매도에 실패했습니다.')
            throw(err)
        }
    })

    const updateSellMember = useCallback(async e => {
        try{
            const req = {
                method: c.put,
                url: `${c.url}/api/member/${sessionMember}`,
                data: member
            }
            const res = await axios(req)
            window.location.reload()
        }catch(err){
            throw(err)
        }
    })

    // getNews
    const getNews = useCallback(async e => {
        try{
            const req = {
                method: c.get,
                url: `${c.url}/kospi/lginnoteknews`
            }
            const res = await axios(req)
            let data = res.data.slice(0, 5)
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
            setNews(data)
        }catch(err){
            throw(err)
        }
    })

    // getCovid
    const getCovid = useCallback(async e => {
        try{
            const req = {
                method: c.get,
                url: `${c.url}/kospi/koreacovid`
            }
            const res = await axios(req)
            let data = res.data.reverse()
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
            data[i].date = yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0])
            }
            setCovid(data)
        }catch(err){
            throw(err)
        }
    })


    

    return (
    <div>
        <div className="m-sm-30">
            <div  className="mb-sm-30" style={{display: 'inline-block'}}>
            <Breadcrumb
                routeSegments={[
                { name: "LG이노텍" }
                ]}
            />
            </div>
            <Lginnotek/>
            <Grid container spacing={3} className="mb-24">
                <Grid item xs={12}>
                    <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                        <div>LG이노텍  <p><h3 id='price' className='text-primary'>$ {thisPrice}</h3></p></div>
                        <div>LG이노텍 예수금  <p id='withholdings'>$ {withholdings}</p></div>
                        {sessionMember != null
                        ? <div>현재 계좌 잔액  <p id='balance'>$ <span id='balance'>{(member.balance - totalStockPrice).toFixed(2)}</span></p></div>
                        : null }
                        
                        <TextField
                            id="buyQty"
                            name="buyQty"
                            label="수량"
                            type="number"
                            value={buyQty}
                            autoComplete="buyQty"
                            onChange={ e => {if (e.target.value < 1) { setBuyQty(1) } else { setBuyQty(e.target.value) }}}
                        />
                        {sessionMember != null 
                        ? <Button id='buyBtn' className='m-5' variant='contained' color='primary' onClick={buyStock}>매수</Button>
                        : <Button id='buyBtn' className='m-5' variant='contained' color='primary' disabled>매수</Button>
                        }
                        <TextField
                            id="sellQty"
                            name="sellQty"
                            label="수량"
                            type="number"
                            value={sellQty}
                            autoComplete="sellQty"
                            onChange={ e => {if (e.target.value < 1) { setSellQty(1) } else { setSellQty(e.target.value) }}}
                        />
                        {sessionMember != null && isTraded 
                        ? <Button id='sellBtn' className='m-5' variant='contained' color='secondary' onClick={sellStock}>매도</Button>
                        : <Button id='sellBtn' className='m-5' variant='contained' color='secondary' disabled>매도</Button>
                        }
                    </Card>
                </Grid>
                
              {/* News */}
              <Grid item xs={12} md={6}>
                 <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                   <div>
                     <div className="ml-12">
                        <h5 id="news" className="text-primary inlineblock">LG이노텍 뉴스</h5>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center" width="75%">
                                <Typography variant="subtitle2" color="inherit" noWrap>
                                  제목
                                </Typography>
                              </TableCell>
                              <TableCell align="center" width="20%">
                                <Typography variant="subtitle2" color="inherit" noWrap>
                                  날짜
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                        {news.map((row, idx) => (
                          <TableRow>
                            {/* <TableCell align="left" width="5%">{row.id}</TableCell> */}
                            <TableCell align='left' width="75%" style={{cursor: 'pointer', whiteSpace: 'noWrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                              <a href={row.url}>{row.headline}</a>
                            </TableCell>
                            <TableCell align="right" width="20%"><small>{row.date}</small></TableCell>
                          </TableRow>
                        ))}
                        </TableBody>
                        </Table>
                     </div>
                   </div>
                 </Card>
              </Grid>
                 {/* covid */}
                <Grid item xs={12} md={6}>
                  <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                    <div>
                      <div className="ml-12">
                          <h5 className="text-primary inlineblock">Covid-19 현황</h5>
                          <Table aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">
                                  <Typography variant="subtitle2" color="inherit" noWrap>
                                    날짜
                                  </Typography>
                                </TableCell>
                                <TableCell align="center">
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
                            <TableBody>
                            {covid.map((row) => (
                                <TableRow>
                                  <TableCell align="center">{row.date}</TableCell>
                                  <TableCell align="center">{row.seoul_cases}</TableCell>
                                  <TableCell align='center'>{row.seoul_deaths}</TableCell>
                                  <TableCell align="center">{row.total_cases}</TableCell>
                                  <TableCell align="center">{row.total_deaths}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                      </div>
                    </div>
                  </Card>
                 </Grid>
              </Grid>   
        </div>
    </div>     
    )

}

export default Trading