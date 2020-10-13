import React, { Component } from "react";
import { Breadcrumb } from "matx";
import SimpleForm from "../material-kit/forms/SimpleForm";

const BasicForm = () => <>
  <div className="m-sm-30">
    <div  className="mb-sm-30">
      <Breadcrumb
        routeSegments={[
          { name: "Forms", path: "/forms" },
          { name: "Basic" }
        ]}
      />
    </div>
    {/* <SimpleForm /> */}
  </div>
</>

export default BasicForm;
