import React from "react";
import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Lgchem = MatxLoadable({
  loader: () => import("./Lgchem")
})
const Lginnotek = MatxLoadable({
  loader: () => import("./Lginnotek")
})

const kospiRoutes = [
  {
    path: "/kospi/lgchem",
    component: Lgchem,
    auth: authRoles.admin
  },
  {
    path:"/kospi/lginnotek",
    component: Lginnotek,
    auth: authRoles.admin
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









