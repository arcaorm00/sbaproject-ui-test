// import React,{useState} from 'react'
// import {Item} from '../../templates'
// import axios from 'axios'

// export default function CabbageContainer () {
    
//     const [date, setdate] = useState('')
//     const [total_cases, settotal_cases] = useState('')
//     const [total_death, settotal_death] = useState('')
//     const [seoul_cases, setseoul_cases] = useState('')
//     const [seoul_death, setseoul_death] = useState('')
//     const predict = e => {
//         e.preventDefault()
//         axios.post(`http://localhost:8080/api/cabbage`, {avg_temp:avgTemp,min_temp: minTemp,
//         max_temp: maxTemp,rain_fall: rainFall})
//             .then(res => {
//                 alert(`The Price Prediction is ${res.data["price"]} won.`)

                
//             })
//             .catch(error => {
//                 alert("Please check your ID or password.");
//                 window.location.reload();
//             })

//     }
//     return (<Item>
//         <table>
//             <tr>
//                 <td>평균 온도</td>
//                 <td><input type="text" onChange={e => setAvgTemp(`${e.target.value}`)}/></td>
//             </tr>
//             <tr>
//                 <td>최저 온도</td>
//                 <td><input type="text" onChange={e => setMinTemp(`${e.target.value}`)}/></td>
//             </tr>
//             <tr>
//                 <td>최고 온도</td>
//                 <td><input type="text" onChange={e => setMaxTemp(`${e.target.value}`)}/></td>
//             </tr>
//             <tr>
//                 <td>평균 강수량</td>
//                 <td><input type="text" onChange={e => setRainFall(`${e.target.value}`)}/></td>
//             </tr>
//             <tr>
//                 <td colSpan='2'><button onClick={predict}>예측 가격 조회</button></td>
//             </tr>
//         </table>

//     </Item>)
// }