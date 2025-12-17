import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Tutors from "../Pages/Tutors";
import Tuition from "../Pages/Tuition";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AddTuition from "../Component/AddTuition";
import AddTutors from "../Component/AddTutors";
import Root from "../Component/Root";
import Error from "../Component/Error";
import DashboardLayout from "../AuthLayout/DashboardLayout";
import Admin from "../Pages/Dashboard/Admin";
import Student from "../Pages/Dashboard/Student";
import Tuitor from "../Pages/Dashboard/Tuitor";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import TuitionDetails from "../Component/TuitionDetails";
import TutorDetails from "../Component/TutorDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/tuition",
        Component: Tuition,
      },
      {
        path: "/tutors",
        Component: Tutors,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },

      {
        path: "/add-tuition",
        Component: AddTuition,
      },

      {
        path: "/add-tutors",
        Component: AddTutors,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "/dashboard/student",
        Component: Student,
      },
      {
        path: "/dashboard/tuitor",
        Component: Tuitor,
      },
      {
        path: "/dashboard/admin",
        Component: Admin,
      },
      {
        path: "/dashboard/payment",
        Component: PaymentHistory,
      },
    ],
  },
  {
    path: "/tuition-details/:id",
    Component: TuitionDetails,
  },
  {
    path: "/tutor-details/:id",
    Component: TutorDetails,
  },
  {
    path: "*",
    Component: Error,
  },
]);
