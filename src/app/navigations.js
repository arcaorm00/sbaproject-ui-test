export const navigations = [
  {
    name: "NASDOQ",
    icon: "dashboard",
    children: [
      {
        name: "Current Market",
        children:[
          {
            name: "Apple",
            icon: 'apple',
            path: "/nasdaq/apple"
          },
          {
            name: "Tesla",
            icon : 'drive_eta',
            path: "/nasdaq/tesla"
          }
        ]
      },
      {
      name: "Stock Prediction",
      icon: "show_chart",
      children: [
      {
        name: "Apple",
        // icon: ()=> <AppleIcon/>,
        icon: "phone_iphone",
        path: "/nasdaq/pred_apple",
        iconText: "C"
      },
      {
        name: "Tesla",
        icon: "battery_charging_full",
        path: "/nasdaq/pred_tesla",
        iconText: "D"
      }
    ]
    }]
  },
  {
    name: "Kospi",
    icon: "dashboard",
    children:[

      {name: "Current Marekt",
      icon: "multiline_chart",
      children:[
        {name: "LG Chem",
         path: "/kospi/lgchem",
         icon:"battery_charging_full"},
         
         {name: "LG Innotek",
          path: "/kospi/lginnotek",
          icon:"camera"}
    ]
  },
    
    {
      name: "Kospi Prediction",
      icon: "multiline_chart",
      children: [
        {
          name: "LG Chem",
          path: "/kospi_pred/lgchem_pred",
          icon:"battery_charging_full",
          iconText: "C"
        },
        {
          name: "LG Innotek",
          icon:"camera",
          path: "/kospi_pred/lginnotek_pred",
          iconText: "S"
        }

      ]
    }]
  },

  {
    name: "Notice",
    icon: "description",
    path: "/forms/basic"
  },
  // {
  //   name: "거래",
  //   icon: "format_list_bulleted",
  //   path: "/session/tradingtest"
  // },

  // {
  //   name: "관심 종목",
  //   icon: "control_camera",
  //   path: "/others/drag-and-drop"
  // },
  // {
  //   name: "Multilevel",
  //   icon: "trending_up",
  //   children: [
  //     {
  //       name: "Level 1",
  //       icon: "list",
  //       children: [
  //         {
  //           name: "Item 1",
  //           path: "/charts/victory-charts",
  //           iconText: "1"
  //         },
  //         {
  //           name: "Item 2",
  //           path: "/charts/react-vis",
  //           iconText: "2"
  //         },
  //         {
  //           name: "Item 3",
  //           path: "/charts/recharts",
  //           iconText: "3"
  //         },
  //         {
  //           name: "Item 4",
  //           path: "/charts/echarts",
  //           iconText: "4"
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   name: "주가 예측",
  //   icon: "format_list_bulleted",
  //   children: [
  //     {
  //       name: "Samsung",
  //       path: "/utilities/color",
  //       iconText: "C"
  //     },
  //     {
  //       name: "Apple",
  //       path: "/utilities/spacing",
  //       iconText: "S"
  //     },
  //     {
  //       name: "temp",
  //       path: "/utilities/typography",
  //       iconText: "T"
  //     },
  //     {
  //       name: "temp",
  //       path: "/utilities/display",
  //       iconText: "D"
  //     }
  //   ]
  // },
  // {
  //   name: "회원 관리",
  //   icon: "trending_up",
  //   children: [
  //     {
  //       name: "Sign in",
  //       iconText: "SI",
  //       path: "/session/signin"
  //     },
  //     {
  //       name: "Sign up",
  //       iconText: "SU",
  //       path: "/session/signup"
  //     },
      // {
      //   name: "Forgot password",
      //   iconText: "FP",
      //   path: "/session/forgot-password"
      // },
      // {
      //   name: "Error",
      //   iconText: "404",
      //   path: "/session/404"
      // }
  //   ]
  // },

  // {
  //   name: "UI Kits",
  //   icon: "favorite",
  //   badge: { value: "50+", color: "secondary" },
  //   children: [
  //     {
  //       name: "Auto Complete",
  //       path: "/material/autocomplete",
  //       iconText: "A"
  //     },
  //     {
  //       name: "Buttons",
  //       path: "/material/buttons",
  //       iconText: "B"
  //     },
  //     {
  //       name: "Checkbox",
  //       path: "/material/checkbox",
  //       iconText: "C"
  //     },
  //     {
  //       name: "Dialog",
  //       path: "/material/dialog",
  //       iconText: "D"
  //     },
  //     {
  //       name: "Expansion Panel",
  //       path: "/material/expansion-panel",
  //       iconText: "E"
  //     },
  //     {
  //       name: "Form",
  //       path: "/material/form",
  //       iconText: "F"
  //     },
  //     {
  //       name: "Icons",
  //       path: "/material/icons",
  //       iconText: "I"
  //     },
  //     {
  //       name: "Menu",
  //       path: "/material/menu",
  //       iconText: "M"
  //     },
  //     {
  //       name: "Progress",
  //       path: "/material/progress",
  //       iconText: "P"
  //     },
  //     {
  //       name: "Radio",
  //       path: "/material/radio",
  //       iconText: "R"
  //     },
  //     {
  //       name: "Switch",
  //       path: "/material/switch",
  //       iconText: "S"
  //     },
  //     {
  //       name: "Slider",
  //       path: "/material/slider",
  //       iconText: "S"
  //     },
  //     {
  //       name: "Snackbar",
  //       path: "/material/snackbar",
  //       iconText: "S"
  //     },
  //     {
  //       name: "Table",
  //       path: "/material/table",
  //       iconText: "T"
  //     }
  //   ]
  // },
  
  // {
  //   name: "Map",
  //   icon: "add_location",
  //   path: "/map"
  // },
  
  
];
