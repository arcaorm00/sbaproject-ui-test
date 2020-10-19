import { MatxLoadable } from "matx";

const BasicForm = MatxLoadable({
  loader: () => import("./BasicForm")
});

const EditorForm = MatxLoadable({
  loader: () => import("./EditorForm")
});

const DetailForm = MatxLoadable({
  loader: () => import("./DetailForm")
});

const formsRoutes = [
  {
    path: "/forms/basic",
    component: BasicForm
  },
  {
    path: "/forms/detail",
    component: DetailForm
  },
  {
    path: "/forms/editor",
    component: EditorForm
  }  
];

export default formsRoutes;
