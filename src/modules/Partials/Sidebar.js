import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleButton } from "../../reducers/authReducer";
import WindowIcon from "@mui/icons-material/Window";
import GroupIcon from "@mui/icons-material/Group";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FitnessCenter, PowerSettingsNew, Task } from "@mui/icons-material";
const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const { toggle } = useSelector((state) => state.user);

  const handleClose = () => {
    dispatch(toggleButton(false));
  };
  return (
    <nav
      className={`sidebar sidebar-offcanvas ${toggle ? "active" : ""}`}
      id="sidebar"
    >
      <ul className="nav ">
        <li
          className={`nav-item ${
            pathname === "/admin/dashboard" ? `active ` : ""
          } `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link " to="/admin/dashboard">
            <WindowIcon className="mr-2" />
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>

        <li
          className={`nav-item ${
            pathname === "/admin/profile" ? "active" : ""
          } `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/admin/profile">
            <AccountCircleIcon className="mr-2" />
            <span className="menu-title">Profile</span>
          </Link>
        </li>

        <li
          className={`nav-item ${pathname === "/admin/users" ? "active" : ""} `}
        >
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#ui-basic"
            aria-expanded="false"
            aria-controls="ui-basic"
          >
            <GroupIcon className="mr-3" />

            <span className="menu-title">Users</span>
            <ArrowDropDownIcon className="ml-5" />
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column my-0 ">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/users/trainer">
                  <FitnessCenter className="mr-3" />
                  Trainer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/users/trainee">
                  <SportsGymnasticsIcon className="mr-3" />
                  Trainee
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li
          className={`nav-item ${pathname === "/logout" ? "active" : ""} `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/logout">
            <PowerSettingsNew className="mr-2" />
            <span className="menu-title">Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
