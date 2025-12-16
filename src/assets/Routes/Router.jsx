import { createBrowserRouter } from "react-router";
import RootLayOut from "../Layouts/RootLayOut";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Clubs from "../Pages/Clubs";
import Events from "../Pages/Events";
import AuthLayout from "../Layouts/AuthLayout";
import BeAManager from "../Pages/BeAManager";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyClub from "../Pages/MyClub";
import MemberEvents from "../Pages/MemberEvents";
import ClubMembers from "../Pages/ClubMembers";
import ClubEvent from "../Pages/ClubEvent";
import CreateClub from "../Pages/CreateClub";
import ClubRequest from "../Pages/ClubRequest";
import AllMembers from "../Pages/AllMembers";
import ManagerRepApproved from "../Pages/ManagerRepApproved";
import AllClubs from "../Pages/AllClubs";
import AllEvents from "../Pages/AllEvents";
import ClubDetails from "../Pages/ClubDetails";
import PaymentSuccess from "../Components/PaymentSuccess";
import MyClubsMember from "../Pages/MyClubsMember";
import CreateEvent from "../Pages/CreateEvent";
import HomeDashboard from "../Dashboard/HomeDashboard";
import AllClubTotalPayments from "../Pages/AllClubTotalPayments";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/clubs",
        element: <Clubs></Clubs>,
      },
      {
        path: "/events",
        element: <Events></Events>,
      },
      {
        path: "/be-a-manager",
        element: (
          <PrivateRoute>
            <BeAManager></BeAManager>
          </PrivateRoute>
        ),
      },

      {
        path: "/club-details/:id",
        element: (
          <PrivateRoute>
            <ClubDetails></ClubDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeDashboard></HomeDashboard>,
      },
      {
        path: "dashboard/my-clubs",
        element: <MyClubsMember></MyClubsMember>,
      },
      {
        path: "dashboard/member-event",
        element: <MemberEvents></MemberEvents>,
      },
      {
        path: "dashboard/my-club",
        element: <MyClub></MyClub>,
      },
      {
        path: "dashboard/club-members",
        element: <ClubMembers></ClubMembers>,
      },
      {
        path: "dashboard/club-events",
        element: <ClubEvent></ClubEvent>,
      },
      {
        path: "dashboard/create-club",
        element: <CreateClub></CreateClub>,
      },
      {
        path: "dashboard/create-event",
        element: <CreateEvent></CreateEvent>,
      },
      {
        path: "dashboard/club-request",
        element: <ClubRequest></ClubRequest>,
      },
      {
        path: "dashboard/all-members",
        element: <AllMembers></AllMembers>,
      },
      {
        path: "dashboard/manager-request",
        element: <ManagerRepApproved></ManagerRepApproved>,
      },
      {
        path: "dashboard/all-clubs",
        element: <AllClubs></AllClubs>,
      },
      {
        path: "dashboard/all-events",
        element: <AllEvents></AllEvents>,
      },
      {
        path: "dashboard/all-revenue",
        element: <AllClubTotalPayments></AllClubTotalPayments>,
      },
    ],
  },
]);
