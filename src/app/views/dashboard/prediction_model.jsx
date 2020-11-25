import React,{useState} from 'react'
import {Table} from '@material-ui/core'
import axios from 'axios'

export default function Container () {
    
    const [high, setHigh] = useState('')
    const [low, setLow] = useState('')
    const [open, setOpen] = useState('')
    const [ticker, setTicker] = useState('')
    const [price, setPrice] = useState('')
    const predict = e => {
        e.preventDefault()
        axios.post(`http://localhost:8080/nasdaq/pred`, {high, low, open, ticker})
            .then(res => {
                const data = JSON.parse(res.data)
                setPrice(data.price)
                
            })
            .catch(error => {
                alert("Please check the right number");
                window.location.reload();
            })

    }
    return (
        <Table>
        <table>
        <tr>
            <td>Ticker</td>
                <td><input type="text" onChange={e => setTicker(`${e.target.value}`)}/></td>
            </tr>
            <tr>
                <td>High</td>
                <td><input type="text" onChange={e => setHigh(`${e.target.value}`)}/></td>
            </tr>
            <tr>
                <td>Low</td>
                <td><input type="text" onChange={e => setLow(`${e.target.value}`)}/></td>
            </tr>
            <tr>
                <td>Open</td>
                <td><input type="text" onChange={e => setOpen(`${e.target.value}`)}/></td>
            </tr>
            {price == "" ? <tr>
                <td colSpan='2'><button onClick={predict}> Check Today's Adjust Close price </button></td>
            </tr> : <h1 >예측된 종가 : $ {price}</h1>}
            
        </table>
    </Table>
    )  
}