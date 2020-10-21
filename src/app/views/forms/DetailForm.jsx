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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tablehead: {
    display: 'inlineblock',
    padding: '50px',
    borderBottom: '1px solid lightgrey'
  },
  tablebody: {
    display: 'inlineblock',
    padding: '50px',
    borderBottom: '1px solid lightgrey'
  },
  container: {
    padding: '40px',
  },
});

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const DetailForm = () => {

  const classes = useStyles();

  return (
  <div className="m-sm-30">
    <div  className="mb-sm-30">
      <Breadcrumb
        routeSegments={[
          { name: "게시판", path: "/forms/basic" },
          { name: "글 제목" }
        ]}
      />
    </div>
    {/* <SimpleForm /> */}
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tablehead}>
          <tr>
            <td width="60%" align="left">
              <Typography variant="h6" color="inherit" noWrap>
                글 제목
              </Typography>
            </td>
            <td width="20%" align="center">
              <Typography variant="subtitle1" color="inherit" noWrap>
                작성자
              </Typography>
            </td>
            <td width="20%" align="center">
              <Typography variant="subtitle1" color="inherit" noWrap>
                작성일자
              </Typography>
            </td>
          </tr>
        </TableHead>
        <br/>
        <TableBody className={classes.tablebody}>
          <tr>
            <td width="100%" align="left">
              글 내용
            </td>
          </tr>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default DetailForm;
