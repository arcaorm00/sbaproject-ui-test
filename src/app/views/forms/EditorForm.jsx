import React, { Component } from "react";
import { RichTextEditor, Breadcrumb } from "matx";
import { Button } from "@material-ui/core";

const EditorForm = () => <>
  <div className="m-sm-30">
    <div  className="mb-sm-30">
      <Breadcrumb
        routeSegments={[
          { name: "Forms", path: "/forms" },
          { name: "Editor" }
        ]}
      />
    </div>
    <RichTextEditor
      placeholder="insert text here..."
    /><br/>
    <Button
      className="capitalize"
      variant="contained"
      color="primary"
      type="submit"
    >
      Sign up
    </Button>
  </div>

</>


export default EditorForm;