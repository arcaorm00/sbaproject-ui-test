import React from "react";

const kospipredRoutes = [
  {
    path: "/kospi_pred/Lgchem_pred",
    component: React.lazy(() => import("./Lgchem_pred"))
  },
  {
    path: "/kospi_pred/Lginnotek_pred",
    component: React.lazy(() => import("./Lginnotek_pred"))
  },
];

export default kospipredRoutes;
