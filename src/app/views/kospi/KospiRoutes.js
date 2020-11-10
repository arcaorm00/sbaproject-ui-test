import React from "react";
import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Lgchem = MatxLoadable({
  loader: () => import("./lgchem")
})
const Lginnotek = MatxLoadable({
  loader: () => import("./lginnotek")
})

const kospiRoutes = [
  {
    path: "/kospi/lgchem",
    component: Lgchem,
  },
  {
    path:"/kospi/lginnotek",
    component: Lginnotek,
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









