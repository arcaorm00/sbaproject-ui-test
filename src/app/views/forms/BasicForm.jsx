import React, { Component } from "react";
import { Breadcrumb } from "matx";
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import Paper from '@material-ui/core/Paper';
import axios from 'axios'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  container: {
    padding: '20px'
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const BasicForm = () => {

  const classes = useStyles();

  const connect_test = () => {
    axios.get('http://localhost:8080/api')
    .then( res => {
      console.log(res)
    }).catch( err => alert('Failure!'))
  }

  return (
  <div className="m-sm-30">
    <div  className="mb-sm-30">
      <Breadcrumb
        routeSegments={[
          { name: "게시판", path: "/forms" },
          { name: "게시판" }
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
                글번호
              </Typography>
            </TableCell>
            <TableCell align="center" width="50%">
              <Typography variant="subtitle2" color="inherit" noWrap>
                제목
              </Typography>
            </TableCell>
            <TableCell align="center" width="20%">
              <Typography variant="subtitle2" color="inherit" noWrap>
                작성자
              </Typography>
            </TableCell>
            <TableCell align="center" width="10%">
              <Typography variant="subtitle2" color="inherit" noWrap>
                작성일자
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} onClick={connect_test}>
              <TableCell align="left" width="10%">{row.calories}</TableCell>
              <TableCell align='left' width="50%">
                {row.name}
              </TableCell>
              <TableCell align="center" width="20%">{row.fat}</TableCell>
              <TableCell align="center" width="10%">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default BasicForm;
