import React, { useCallback, useEffect, useState } from "react"
import { Breadcrumb } from "matx"
import { Button, TextField } from "@material-ui/core"
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'

import Paper from '@material-ui/core/Paper'

import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import { Link, useHistory } from 'react-router-dom'
import { context as c } from '../../../context'
import axios from 'axios'


const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  container: {
    padding: '20px'
  }
})


// 페이징
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

//

const BasicForm = () => {

  const classes = useStyles()
  const history = useHistory()
  const sessionMember = sessionStorage.getItem('sessionMember')

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/boards')
    .then( res => {
      setData(res.data)
    })
    .catch( err => {
      alert('list Fail')
      throw(err)
    })
  }, [])

  // 페이징
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //

  return (
  <div className="m-sm-30">
    <div  className="mb-sm-30" style={{display: 'inline-block'}}>
      <Breadcrumb
        routeSegments={[
          { name: "게시판" }
        ]}
      />
    </div>
    <div style={{display: 'inline-block', float: 'right', margin: '0px 30px 0px 0px'}}>
      {sessionMember == 'admin@stockpsychic.com' ? 
        <Button
        className="capitalize mr-10"
        variant="contained"
        color="secondary"
        type="submit"
        onClick={() => {history.push('/forms/editor')}}
        >
          글 작성
        </Button>
      : 
      null
      }
      
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
        {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left" width="10%">{row.id}</TableCell>
              <TableCell align='left' width="100%" onClick={() => history.push("/forms/detail/"+row.id)} style={{cursor: 'pointer'}} noWrap>
                {row.title}
              </TableCell>
              <TableCell align="center" width="20%">{row.email}</TableCell>
              <TableCell align="center" width="10%">{row.regdate.slice(0, 16)}</TableCell>
            </TableRow>
          ))}

          {/* {data.map((row, idx) => (
            
            <TableRow key={row.title}>
              <TableCell align="left" width="10%">{row.id}</TableCell>
              <TableCell align='left' width="100%" onClick={() => history.push("/forms/detail/"+row.id)} style={{cursor: 'pointer'}} noWrap>
                {row.title}
              </TableCell>
              <TableCell align="center" width="20%">{row.email}</TableCell>
              <TableCell align="center" width="10%">{row.regdate}</TableCell>
            </TableRow>
            
          ))} */}
          {emptyRows > 0 && (
            <TableRow style={{ height: 40 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 20, { label: 'All', value: -1 }]}
              colSpan={4}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: false,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  </div>
  )
}

export default BasicForm
