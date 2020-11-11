import React, { useCallback, useState, useEffect } from "react"
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
import { useHistory } from 'react-router-dom'
import { context as c } from '../../../context'

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

const DetailForm = () => {

  const classes = useStyles()
  const history = useHistory()
  const id = window.location.href.split("/").reverse()[0]

  const [article, setArticle] = useState({
    id: 0,
    email: '',
    article_type: '',
    title: '',
    content: ''
  })
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    getArticle()
    getComments()
  })

  const getArticle = useCallback(async e => {
    try{
      const req = {
        method: c.get,
        url: `${c.url}/api/board/${id}`,
      }
      const res = await axios(req)
      if (res.data == null) { 
        history.push('/session/404')
      }else{
        setArticle(res.data[0])
        console.log(article)
      }
      
      // if (document.getElementById('contentDiv') != null) {
      //   document.getElementById('contentDiv').innerHTML = article.content
      // }
    }catch (err){
      throw(err)
    }    
  }, [])

  const getComments = useCallback(async e => {
    try{
      const req = {
        method: c.get,
        url: `${c.url}/api/comments/${id}`,
      }
      const res = await axios(req)
      setCommentList(res.data)
    }catch (err){
      throw(err)
    }
  }, [])


  // board
  const clickUpdate = useCallback(async e => {
    try{
      const req = {
        method: c.get,
        url: `${c.url}/api/board/${id}`
      }
      const res = await axios(req)
      history.push({pathname: '/forms/editor', state: {detail: res.data[0]}})
    }catch (err){
      throw(err)
    }
  }, [])

  const clickDelete = useCallback(async e => {
    let re = window.confirm('게시물을 삭제하시겠습니까?')
    if (re){
      try{
        const req = {
          method: c.delete,
          url: `${c.url}/api/board/${id}`
        }
        history.push('/forms/basic')
        const res = await axios(req)
        alert('게시물이 삭제되었습니다.')
        window.location.reload()
      }catch (err){
        alert('Delete Fail')
        throw(err)
      }
    } 
  }, [])

  // comment

  const [comment, setComment] = useState('')
  const sessionMember = sessionStorage.getItem("sessionMember")
  const [isCommentUpdate, setIsCommentUpdate] = useState(false)

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

  // comment 버튼 클릭 이벤트 => 항상 모댓글
  const clickComment = useCallback(async e => {

    try{
      e.preventDefault()
      // alert(today)
      const id = 0
      const data = {
        board_id: article.id, 
        email: sessionMember, 
        comment: comment, 
        regdate: today,
        comment_ref: article.id,
        comment_level: 0,
        comment_step: 0 }

      const req = {
        method: c.post,
        url: `${c.url}/api/comment/${id}`,
        data: data
      }
      const res = await axios(req)
      alert('댓글이 등록되었습니다.')
      document.getElementById('comment').value = ''

    }catch (err){
      alert('댓글 등록에 실패했습니다.')
      throw(err)
    }
  })

  const clickCommentUpdateBtn = (row) => {
    setIsCommentUpdate(true)
    alert(`update => ${isCommentUpdate}`)
  }

  const clickCommentDelete = useCallback(async row => {
    let re = window.confirm('댓글을 삭제하시겠습니까?')
    if(re){
      try{      
        const req = {
          method: c.delete,
          url: `${c.url}/api/comment/${row.id}`
        }
        const res = await axios(req)
        alert('댓글이 삭제되었습니다.')
      }catch(err){
        alert('댓글 삭제에 실패했습니다.')
        throw(err)
      }
    }
  }, [])

  return (
  <div className="m-sm-30">
    <div  className="mb-sm-30">
      <Breadcrumb
        routeSegments={[
          { name: "공지", path: "/forms/basic" },
          { name: '공지글' }
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
              <Typography variant="h6" color="inherit">
                { article !== undefined ? article.title : '' }
              </Typography>
            </td>
            <td width="20%" align="center">
              <Typography variant="subtitle1" color="inherit" noWrap>
                { article !== undefined ? article.email.split('@')[0] : '' }
              </Typography>
            </td>
            <td width="20%" align="center">
              <Typography variant="subtitle1" color="inherit" noWrap>
                { article !== undefined ? article.regdate : ':' }
              </Typography>
            </td>
          </tr>
        </TableHead>
        <TableBody>
          <tr>
            <td colspan="4">
              <div id='contentDiv' className={classes.contents_padding} style={{minHeight: '400px'}}>
                {/* { article !== undefined? article.content: '' } */}
                <div dangerouslySetInnerHTML={ {__html: article.content} }></div>
              </div>
            </td>
          </tr>
        </TableBody>
      </Table>
      <div class="mb-3">
      {sessionMember == 'admin@stockpsychic.com' 
      ? <>
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
        </>
      : null
      }		
          		
        <Button
          className="capitalize mr-10"
          variant="contained"
          color="secondary"
          onClick={() => {history.push('/forms/basic')}}
        >
          목록
        </Button>	
        </div>
        <br/>
      <h4 className={classes.lineBottom}>Comments</h4>
      <ul id="replyList" class="list-group list-group-flush" className={classes.commentsUl}>
      {commentList.map((row, idx) => (
        <div className={classes.commentsDiv}>
          
            <li className={classes.comments}>
              <td width="15%" align="left"><b>{row.email.split('@')[0]}</b>&nbsp;&nbsp;</td>
              <td width="70%" align="left">{row.comment}</td>
              
              <td width="15%" align="left"><small>{row.regdate}</small></td>
              { sessionMember == row.email 
              ? <>
              {/* <td width="10%" align="center" style={{cursor: 'pointer'}} onClick={() => clickCommentUpdateBtn(row)}>수정</td> */}
              <td width="5%" align="left" style={{cursor: 'pointer'}} onClick={() => clickCommentDelete(row)}>X</td>
              </>
              : <>
              <td width="10%" align="center"></td>
              <td width="5%" align="left"></td>
              </>
              }
              
            </li>
          
        </div>
      ))}
      </ul>
          <form id="boardComment">
            <div id="commentDiv" class="form-row align-items-center">
              <input type="hidden" name="b_no"/>
              <input type="hidden" name="r_ref" value="0"/>
              <input type="hidden" name="r_level" value="0"/>
              <div class="col-sm-2 my-1">
                <input class="form-control" type="hidden" name="m_id"  readonly="readonly"/>
              </div>
              <div class="col-sm-8 my-2"> 
              <table fullWidth>
                <tr fullWidth>
                  <td width="90%"><TextField id="comment" placeholder="Leave your comment" variant="outlined" fullWidth onChange={e=> setComment(e.target.value)}/></td>
                  {sessionMember !== null 
                  ? <td width="10%"><Button className="capitalize mr-10" variant="contained" color="primary" type="submit" onClick={clickComment}>comment</Button></td> 
                  : <td width="10%"><Button className="capitalize mr-10" variant="contained" color="primary" type="submit" disabled>comment</Button></td>
                  }
                  
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
