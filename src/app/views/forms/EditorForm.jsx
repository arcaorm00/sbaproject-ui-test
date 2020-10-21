import React, { Component } from "react";
import { RichTextEditor, Breadcrumb } from "matx";
import { Button, TextField } from "@material-ui/core";

const EditorForm = () => <>
  <div className="m-sm-30">
    <div  className="mb-sm-30">
      <Breadcrumb
        routeSegments={[
          { name: "게시판", path: "/forms" },
          { name: "새글작성" }
        ]}
      />
    </div>
    <TextField
        id="title"
        label="Title"
        variant="outlined"
        fullWidth
    />
    <p/>
    <RichTextEditor
      placeholder="insert text here..."
    /><br/>
    <Button
      className="capitalize mr-10"
      variant="contained"
      color="primary"
      type="submit"
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

</>


export default EditorForm;