import React, { useCallback, useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { RichTextEditor, Breadcrumb } from "matx"
import { Button, TextField } from "@material-ui/core"
import { context as c } from '../../../context'
import axios from 'axios'
import StateManager from "react-select"
import { Today } from "@material-ui/icons"

const EditorForm = () => {
  const session = sessionStorage.getItem('sessionMember')
  const history = useHistory()
  const [title, setTitle] = useState()
  const [bodycontent, setBodyContent] = useState()
  const [updateArticle, setUpdateArticle] = useState({id: 0, email: '', article_type: '', title: '', content: '', regdate: ''})

  useEffect(() => {
    if (session !== 'admin@stockpsychic.com'){
      history.push('/')
    }
    if (history.location['state']){
      setUpdateArticle(history.location['state']['detail'])
    }
  }, [])

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

  const clickSubmit = (e) => {
    e.preventDefault()
    
    // RichTextEditor의 content 가져오기
    let content = document.getElementsByClassName('quill')[0].innerHTML
    const divIndex = content.indexOf('<div class="ql-editor"')
    const divEndIndex = content.indexOf('</div><div class="ql-clipboard"')
    content = content.slice(divIndex, divEndIndex)
    content = content.slice(content.indexOf('>')+1)
    // alert(content)

    const data = {
      email: session,
      article_type: 'Notice',
      title: document.getElementById('title').value,
      content: content,
      regdate: today
    }
    const id = 0
    axios.post(`http://localhost:8080/api/board/${id}`, data)
    .then(res => {
      alert(res)
      history.push('/forms/basic')
    })
    .catch(e => {
      throw(e)
    })
  }

  const clickUpdate = useCallback(async e => {
    alert('수정!')
  })

  // const contentChange = (e) => {
  //   e.preventDefault(e.target)
  //   console.log(e.target.value)
  // }

  return (
    <div className="m-sm-30">
    <div  className="mb-sm-30">
    { updateArticle.id == 0
    ?
      <Breadcrumb        
        routeSegments={[
          { name: "게시판", path: "/forms/basic" },
          { name: "글작성" }
        ]}
      />
      :
      <Breadcrumb        
        routeSegments={[
          { name: "게시판", path: "/forms/basic" },
          { name: "글수정" }
        ]}
      />
    }
    </div>
    <TextField
        id="title"
        name="title"
        variant="outlined"
        fullWidth
        type="text"
        placeholder="Title"
    />
    <p/>
    <RichTextEditor
      id="editorContent"
      name="editorContent"
      placeholder="insert text here..."
    />
    <br/>
    { updateArticle.id == 0
    ?
    <Button
      className="capitalize mr-10"
      variant="contained"
      color="primary"
      type="submit"
      onClick={clickSubmit}
    >
      등록
    </Button>
    :
    <Button
      className="capitalize mr-10"
      variant="contained"
      color="primary"
      type="submit"
      onClick={clickUpdate}
    >
      수정
    </Button>
    }
    
    <Button
      className="capitalize"
      variant="contained"
      color="light-dark"
      type="cancel"
    >
      취소
    </Button>
  </div>

  )
}

export default EditorForm;