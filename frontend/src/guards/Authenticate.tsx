import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

function Authenticate() {
  const token = useSelector((state: RootState) => state.token);
  const user = useSelector((state: RootState) => state.user);

  if (token == "" || user.email == "") {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
}

export default Authenticate;
