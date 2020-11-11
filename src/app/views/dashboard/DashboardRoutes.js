import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Analytics = MatxLoadable({
  loader: () => import("./Analytics")
})

const Apple = MatxLoadable({
  loader: () => import("./TradingApple")
})
const Tesla = MatxLoadable({
  loader: () => import("./TradingTesla")
})
// const Apple = MatxLoadable({
//   loader: () => import("./Apple")
// })
// const Tesla = MatxLoadable({
//   loader: () => import("./Tesla")
// })

const dashboardRoutes = [
  {
    path: "/dashboard/analytics",
    component: Analytics,
    auth: authRoles.admin
  },
  {
    path: "/nasdaq/apple",
    component: Apple,
    auth: authRoles.admin
  },
  {
    path: "/nasdaq/tesla",
    component: Tesla,
    auth: authRoles.admin
  }
];

// const dashboardRoutes = [
//   {
//     path: "/dashboard/analytics",
//     component: Analytics,
//     auth: authRoles.admin
//   }
// ];

export default dashboardRoutes;
