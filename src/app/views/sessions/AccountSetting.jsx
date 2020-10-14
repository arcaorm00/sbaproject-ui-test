import React from 'react'
import { Breadcrumb } from "matx";

const AccountSetting = () => <>
<div className="m-sm-30">
    <div  className="mb-sm-30">
      <Breadcrumb
        routeSegments={[
          { name: "계정 관리" }
        ]}
      />
    </div>
    <div>계정 관리</div>
</div>
</>

export default AccountSetting