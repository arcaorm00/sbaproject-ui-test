import React from 'react'
import { Breadcrumb } from "matx";

const Mypage = () => <>
<div className="m-sm-30">
    <div  className="mb-sm-30">
      <Breadcrumb
        routeSegments={[
          { name: "Mypage" }
        ]}
      />
    </div>
    <div>Mypage</div>
</div>
</>

export default Mypage