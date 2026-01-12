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
import PrivateRoute from "./PrivateRoute";
import TutorDetails from "../Component/TutorDetails";
import MyProfile from "../Component/MyProfile";
import EditProfile from "../Component/EditProfile";
import EditTuition from "../Component/EditTuition";
import EditTutor from "../Component/EditTutor";
import MyTuition from "../Pages/Dashboard/MyTuition";
import MyApplication from "../Pages/Dashboard/MyApplication";
import TermService from "../Component/TermService";
import Privacy from "../Component/Privacy";
import DashboardHome from "../Pages/Dashboard/DashboardHome";

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
        element: <Tuition></Tuition>,
      },
      {
        path: "/tutors",
        element: <Tutors></Tutors>,
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
      {
        path: "/terms-service",
        Component: TermService,
      },
      {
        path: "/privacy-policy",
        Component: Privacy,
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
        index: true,
        Component: DashboardHome,
      },
      {
        path: "/dashboard/student",
        element: (
          <PrivateRoute>
            <Student></Student>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/tuition/:id/edit",
        Component: EditTuition,
      },
      {
        path: "/dashboard/tuitor",
        element: (
          <PrivateRoute>
            <Tuitor></Tuitor>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/tutor/:id/edit",
        Component: EditTutor,
      },
      {
        path: "/dashboard/admin",
        element: (
          <PrivateRoute>
            <Admin></Admin>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment",
        Component: PaymentHistory,
      },
      {
        path: "/dashboard/my-tuition",
        Component: MyTuition,
      },
      {
        path: "/dashboard/my-application",
        Component: MyApplication,
      },
      {
        path: "/dashboard/profile",
        Component: MyProfile,
      },
      {
        path: "/dashboard/edit-profile",
        Component: EditProfile,
      },
    ],
  },
  {
    path: "/tuition-details/:id",
    element: <TuitionDetails></TuitionDetails>,
  },
  {
    path: "/tutor-details/:id",
    element: <TutorDetails></TutorDetails>,
  },
  {
    path: "*",
    Component: Error,
  },
]);
