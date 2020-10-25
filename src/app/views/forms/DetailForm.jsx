import React, { Component } from "react"
import { Breadcrumb } from "matx"
import { Button, TextField } from "@material-ui/core"
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'

import Paper from '@material-ui/core/Paper'
import axios from 'axios'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginBottom: '10px',
    borderBottom: '1px solid lightgrey'
  },
  tablehead: {
    display: 'inlineblock',
    padding: '20px',
    borderBottom: '1px solid lightgrey'
  },
  tablebody: {
    display: 'block',
    padding: '20px',
    borderBottom: '1px solid lightgrey'
  },
  container: {
    padding: '40px',
  },
  contents_padding: {
    height: '450px',
    padding: '20px'
  },
  lineBottom: {
    padding: '20px',
    borderBottom: '1px solid lightgrey'
  },
  commentsUl: {
    padding: '0px'
  },
  commentsDiv: {
    borderRadius: '5px',
    backgroundColor: '#F5F5F5',
    padding: '0px'
  },
  comments: {
    listStyle: 'None',
    borderBottom: '1px solid white',
    padding: '10px'
  }
});

const get_article = (id) => {
  axios.get('', {id: id})
  .then( res => {
    console.log(res.data)
    return res.data
  }).catch( err => {
    alert(err)
  })
}
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

  // board
  const clickUpdate = () => {

  }

  const clickDelete = () => {

  }

  // comment
  const clickComment = () => {

  }

  const clickCommentUpdate = () => {

  }

  const clickCommentDelete = () => {

  }

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
      {/* <Table className={classes.table} aria-label="simple table">
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
        <TableBody className={classes.tablebody} width="100%">
          <tr >
            <td width="100%" align="left">
              글 내용
            </td>
          </tr>
        </TableBody>
      </Table> */}
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
        <TableBody>
          <tr>
            <td colspan="4" height="500px">
              <div className={classes.contents_padding}>글 내용</div>
            </td>
          </tr>     
        </TableBody>
      </Table>
      <div class="mb-3">			
        <Button
          className="capitalize mr-10"
          variant="contained"
          color="primary"
          type="submit"
          onClick={clickUpdate}
        >
          수정
        </Button>
        <Button
          className="capitalize mr-10"
          variant="contained"
          color="light-grey"
          onClick={clickDelete}
        >
          삭제
        </Button>		
        <Button
          className="capitalize mr-10"
          variant="contained"
          color="secondary"
          onClick={clickDelete}
        >
          목록
        </Button>	
        </div>
        <br/>
      <h4 className={classes.lineBottom}>Comments</h4>
      <ul id="replyList" class="list-group list-group-flush" className={classes.commentsUl}>
        <div className={classes.commentsDiv}>
          <li className={classes.comments}>
            <td width="15%" align="left"><b>댓글 작성자</b></td>
            <td width="75%" align="left">댓글내용</td>
            <td width="10%" align="center">수정</td>
            <td width="5%" align="left">X</td>
          </li>
        </div>
      </ul>
          <form id="boardReply">
            <div id="replyDiv" class="form-row align-items-center">
              <input type="hidden" name="b_no"/>
              <input type="hidden" name="r_ref" value="0"/>
              <input type="hidden" name="r_level" value="0"/>
              <div class="col-sm-2 my-1">
                <input class="form-control" type="hidden" name="m_id"  readonly="readonly"/>
              </div>
              <div class="col-sm-8 my-2"> 
              <table fullWidth>
                <tr fullWidth>
                  <td width="90%"><TextField id="comment" placeholder="Leave your comment" variant="outlined" fullWidth/></td>
                  <td width="10%"><Button className="capitalize mr-10" variant="contained" color="primary" type="submit" onClick={clickUpdate}>comment</Button></td>
                </tr>
              </table>
              </div>
              <div class="col-sm-2 my-1">
                
              </div>
            </div>
          </form>
      </TableContainer>
    </div>
  )
}

export default DetailForm;
