/*!

=========================================================
* * NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import Description from "@material-ui/icons/Description";
import People from "@material-ui/icons/People";
import Store from "@material-ui/icons/Store";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,

    layout: "/admin",
  },
  {
    path: "/create-admin",
    name: "Create Admin",
    rtlName: "إخطارات",
    icon: People,

    layout: "/admin",
  },
  {
    path: "/show-admin",
    name: "Show Admin",
    rtlName: "إخطارات",
    icon: People,

    layout: "/admin",
  },
  {
    path: "/create-role",
    name: "Create Role",
    rtlName: "إخطارات",
    icon: People,

    layout: "/admin",
  },
  {
    path: "/show-roles",
    name: "Show Roles",
    rtlName: "إخطارات",
    icon: People,

    layout: "/admin",
  },
  {
    path: "/edit-role",
    name: "Edit Role",
    rtlName: "إخطارات",
    icon: People,

    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,

    layout: "/admin",
  },
  {
    path: "/table-list",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",

    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "إخطارات",
    icon: People,

    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    rtlName: "إخطارات",
    icon: Store,

    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,

    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,

  //   layout: "/admin",
  // },
    // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,

  //   layout: "/admin",
  // },
  // {
  //   path: "/sign-in",
  //   name: "Sign-in",
  //   rtlName: "إخطارات",
  // },
];

export default dashboardRoutes;
