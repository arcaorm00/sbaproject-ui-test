import {MatxLoadable} from "matx";

const Color = MatxLoadable({
  loader: () => import("./Color")
});
const Spacing = MatxLoadable({
  loader: () => import("./Spacing")
});
const Typography = MatxLoadable({
  loader: () => import("./Typography")
});
const Display = MatxLoadable({
  loader: () => import("./Display")
});

const predictionsRoutes = [
  {
    path: '/prediction/apple',
    component: Color
  },
  {
    path: "/utilities/spacing",
    component: Spacing
  },
  {
    path: "/utilities/typography",
    component: Typography
  },
  {
    path: "/prediction/tesla",
    component: Display
  },
]

export default predictionsRoutes;