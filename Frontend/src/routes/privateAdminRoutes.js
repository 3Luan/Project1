import { useSelector } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FiltersCard from "../components/FiltersCard";
import { useNavigate } from "react-router-dom";

const PrivateAdminRoutes = (props) => {
  const authAdmin = useSelector((state) => state.authAdmin);
  const navigate = useNavigate();

  if (authAdmin.isInit) {
    return <></>;
  } else {
    if (authAdmin.isLoading) {
      return <></>;
    } else {
      if (!authAdmin.auth) {
        return navigate("/");
      }
    }
  }

  return <>{props.children}</>;
};

export default PrivateAdminRoutes;
