import Loader from "../Components/Loader";
import useRole from "../Hooks/useRole";
import AdminDasboard from "./AdminDasboard";
import ManagerDashboard from "./ManagerDashboard";
import MemberDashboard from "./MemberDashboard";

const HomeDashboard = () => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  if (role === "admin") {
    return <AdminDasboard></AdminDasboard>;
  } else if (role === "manager") {
    return <ManagerDashboard></ManagerDashboard>;
  } else return <MemberDashboard></MemberDashboard>;
};

export default HomeDashboard;
