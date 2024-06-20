import { useSelector } from "react-redux";
import { Outlet} from "react-router-dom";
import "./style/HomePage.css";
import MyNavbar from "./MyNavbar";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
        <h2 className="headline2">Dashboard</h2>
        <div className="flex-card">
          <img
            src={user.image}
            alt={user.username}
            style={{ width: "80px", height: "80px" }}
          /><span>&nbsp;&nbsp;</span>
          <h3 className="headline3">{user ? user.username : ""}</h3>
        </div>

        {/* <MyNavbar/> */}

      <Outlet />
    </>
  );
};

export default Navbar;
