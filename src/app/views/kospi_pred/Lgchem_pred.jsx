import React , {useEffect, useState} from "react";
import { Breadcrumb, SimpleCard } from "matx";
import { Grid } from "@material-ui/core";
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'

import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  container: {
    padding: '20px'
  }
})

// const useStyles1 = makeStyles((theme) => ({
//   root: {
//     flexShrink: 0,
//     marginLeft: theme.spacing(2.5),
//   },
// }));

 
const TableForm = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionMember = sessionStorage.getItem('sessionMember')

  const [data, setData] = useState([])

  useEffect (()=> {
    axios.get(`http://localhost:8080/kospi/koreacovid`)
    .then( res => {
      setData(res.data)
    })
    .catch(err => {
      alert('list Fail')
      throw(err)
    })
  },[])

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "kospi_pred", path: "/kospi_pred" },
            { name: "LG chem" }
          ]}
        />
      </div>
  
      
      {/* <SimpleForm /> */}
    <TableContainer className={classes.container} component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left" width="10%">
            <Typography variant="subtitle2" color="inherit" noWrap>
              total_cases
            </Typography>
          </TableCell>
          <TableCell align="center" width="50%">
            <Typography variant="subtitle2" color="inherit" noWrap>
              total_death
            </Typography>
          </TableCell>
          <TableCell align="center" width="20%">
            <Typography variant="subtitle2" color="inherit" noWrap>
              seoul_cases
            </Typography>
          </TableCell>
          <TableCell align="center" width="10%">
            <Typography variant="subtitle2" color="inherit" noWrap>
              seoul_death
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

        {data.map((row, idx) => (
          
          <TableRow key={row.date}>
            <TableCell align='left' width="100%" noWrap>
              {row.date}
            </TableCell>
            <TableCell align="center" width="20%">{row.total_cases}</TableCell>
            <TableCell align="center" width="10%">{row.total_death}</TableCell>
            <TableCell align="center" width="10%">{row.seoul_cases}</TableCell>
            <TableCell align="center" width="10%">{row.seoul_death}</TableCell>
          </TableRow>
          
        ))}

      </TableBody>
      
    </Table>
  </TableContainer>
</div>

  )
};







  const bgClassList = [
    
  ];

  const textClassList = [
    
  ];


export default TableForm;
