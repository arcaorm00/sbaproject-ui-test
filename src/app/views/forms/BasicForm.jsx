import React, { Component } from "react";
import { Breadcrumb } from "matx";
import SimpleForm from "../material-kit/forms/SimpleForm";

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

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
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width='10%' align='center'><b>번호</b></TableCell>
            <TableCell width='60%' align='center'><b>제목</b></TableCell>
            <TableCell width='15%' align='center'><b>작성자</b></TableCell>
            <TableCell width='15%' align='center'><b>작성일자</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        </TableBody>
      </Table>
    </div>
  </div>
</>

export default BasicForm;
