import React, { useEffect, useState } from "react"
import { Breadcrumb } from "matx"
import { withStyles, makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'

import Paper from '@material-ui/core/Paper'

import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  container: {
    padding: '20px'
  }
})

const createData = (id, title, email, regdate) => {
  return { id, title, email, regdate };
}

const BasicForm = () => {

  const classes = useStyles();
  const history = useHistory()

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

  const clickTitle = (id) => {
    alert(id)
    // window.location.href('/form/detail/'+id)
    window.location.href(`/form/detail/${id}`)
  }

  return (
  <div className="m-sm-30">
    <div  className="mb-sm-30">
      <Breadcrumb
        routeSegments={[
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
          {data.map((row, idx) => (
            
            <TableRow key={row.title}>
              <TableCell align="left" width="10%">{row.id}</TableCell>
              <TableCell align='left' width="100%" onClick={() => history.push("/forms/detail/"+row.id)} style={{cursor: 'pointer'}}>
                {row.title}
              </TableCell>
              <TableCell align="center" width="20%">{row.email}</TableCell>
              <TableCell align="center" width="10%">{row.regdate}</TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default BasicForm;
