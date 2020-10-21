import React, { useState } from "react"
import { RichTextEditor, Breadcrumb } from "matx"
import { Button, TextField } from "@material-ui/core"
import axios from 'axios'
import StateManager from "react-select"

const EditorForm = () => {
  const [title, setTitle] = useState()
  const [content, setContent] = useState()

  const clickSubmit = (e) => {
    e.preventDefault()
    alert(`${title}, ${content}`)
  }

  const titleChange = (e) => {
    e.preventDefault()
    // setTitle(e.target.value)
    
    console.log(e.target.value)
    
  }

  // const contentChange = (e) => {
  //   e.preventDefault(e.target)
  //   console.log(e.target.value)
  // }

  return (
    <div className="m-sm-30">
    <div  className="mb-sm-30">
      <Breadcrumb
        routeSegments={[
          { name: "게시판", path: "/forms/basic" },
          { name: "글작성" }
        ]}
      />
    </div>
    <TextField
        id="title"
        name="title"
        label="Title"
        variant="outlined"
        fullWidth
        type="text"
        onChange={titleChange}
    />
    <p/>
    <RichTextEditor
      id="content"
      name="content"
      placeholder="insert text here..."
    />
    <br/>
    <Button
      className="capitalize mr-10"
      variant="contained"
      color="primary"
      type="submit"
      onClick={clickSubmit}
    >
      등록
    </Button>
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