import React, { useEffect, useCallback, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { context as c } from '../../../context'

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
    
    const [tradings, setTradings] = useState([])
    const [isTraded, setIsTraded] = useState(false)
    const [withholdings, setWithholdings] = useState(0)
    const [balance, setBalance] = useState(0)

    const [buyQty, setBuyQty] = useState(1)
    const [sellQty, setSellQty] = useState(1)
    const temp_price = 53.4923

    useEffect(() => {
        getMember()
        getTradings()
        getBalance()
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
            setTradings(res.data)
            // 해당 멤버가 거래한 종목 중 이 화면의 해당 종목이 있는지 확인해서 반환 (현재는 임의로 테슬라)
            const isAlready = res.data.filter(function(t){ return t['stock_ticker'] == 'TSLA' })
            if (isAlready.length > 0){
                setIsTraded(true)
            }else{ setIsTraded(false) }
            // 예수금 구하기
            let temp_num = 0
            for (let i=0; i < isAlready.length; i++){
                temp_num = temp_num + isAlready[i].price*isAlready[i].stock_qty
            }
            setWithholdings(temp_num.toFixed(2))
        }catch(err){
            throw(err)
        }
    }, [])

    // 잔금 구하기
    const getBalance = () => {setBalance((member.balance - withholdings).toFixed(2))}

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

    // 매수
    const buyStock = useCallback(async e => {
        insertTrading()
        updateMember()
    })

    const insertTrading = useCallback(async e => {
        const balance = document.getElementById('balance').value
        alert(buyQty*temp_price)
        if((buyQty*temp_price) > balance){
            alert('잔금이 부족합니다.')
            return
        }
        try{
            const data = {
                email: sessionMember,
                stock_type: 'NASDAQ',
                stock_ticker: 'TSLA',
                stock_qty: buyQty,
                price: temp_price,
                trading_date: today
            }
            const req = {
                method: c.post,
                url: `${c.url}/api/trading/${sessionMember}`,
                data: data,
                auth: c.auth
            }
            const res = await axios(req)
            alert('매수되었습니다.')
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
        }catch(err){
            throw(err)
        }
    })

    //매도
    const sellStock = useCallback(async e => {
    })


    

    return (
        <div>
            <div>TSLA 예수금: $ <span id='withholdings'>{withholdings}</span></div>
            <div>현재 계좌 잔액: $ <span id='balance'>{(member.balance - withholdings).toFixed(2)}</span></div>
            <TextField
                id="buyQty"
                name="buyQty"
                label="수량"
                type="number"
                value={buyQty}
                autoComplete="buyQty"
                onChange={ e => {setBuyQty(e.target.value)}}
            />
            {sessionMember != null 
            ? <Button id='buyBtn' className='m-5' variant='contained' color='primary' onClick={buyStock}>매수</Button>
            : <Button id='buyBtn' className='m-5' variant='contained' color='primary' disabled>매수</Button>
            }
            <br/>
            <TextField
                id="sellQty"
                name="sellQty"
                label="수량"
                type="number"
                value={sellQty}
                autoComplete="sellQty"
                onChange={ e => {setSellQty(e.target.value)}}
            />
            {isTraded 
            ? <Button id='sellBtn' className='m-5' variant='contained' color='secondary' onClick={sellStock}>매도</Button>
            : <Button id='sellBtn' className='m-5' variant='contained' color='secondary' disabled>매도</Button>
            }
            
        </div>
        
    )

}

export default Trading