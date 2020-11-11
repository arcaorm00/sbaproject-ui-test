import React from "react";
import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const TradingLGchem = MatxLoadable({
  loader: () => import("./TradingLGchem")
})
// const Lgchem = MatxLoadable({
//   loader: () => import("./lgchem")
// })
const TradingLGinnotek = MatxLoadable({
  loader: () => import("./TradingLGinnotek")
})
// const Lginnotek = MatxLoadable({
//   loader: () => import("./lginnotek")
// })

const kospiRoutes = [
  {
    path: "/kospi/lgchem",
    component: TradingLGchem,
  },
  {
    path:"/kospi/lginnotek",
    component: TradingLGinnotek,
  }
];

export default kospiRoutes;


// const kospiRoutes = [
//   {
//     path: "/kospi/Lgchem",
//     component: React.lazy(() => import("./Lgchem")),
//   },
//   {
//     path:"/kospi/Lginnotek",
//     component: React.lazy(() => import("./Lginnotek")),
//   }
// ];

// export default kospiRoutes;









