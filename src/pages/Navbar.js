import { useSelector } from "react-redux";
import { Outlet, useNavigate} from "react-router-dom";
import "./style/HomePage.css";
import MyNavbar from "./MyNavbar";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <>
        <h2 className="headline2">Dashboard</h2>
        <div className="flex-card" onClick={()=>{navigate('/profile')}}>
          <img
            src={user.image}
            alt={user.username}
            style={{ width: "90px", height: "90px", marginRight:'10px' }}
          /><span>&nbsp;&nbsp;</span>
          <h3 className="headline3">{user ? user.username : ""}</h3>
        </div>
      <Outlet />
    </>
  );
};

export default Navbar;
