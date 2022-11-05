import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleButton } from "../../reducers/authReducer";
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
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            pathname === "/admin/categories" ? "active" : ""
          } `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/admin/categories">
            <i className="icon-paper menu-icon"></i>
            <span className="menu-title">Categories</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            pathname === "/admin/products" ? "active" : ""
          } `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/admin/products">
            <i className="icon-layout menu-icon"></i>
            <span className="menu-title">Products</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            pathname === "/admin/orders" ? "active" : ""
          } `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/admin/orders">
            <i className="icon-columns menu-icon"></i>
            <span className="menu-title">Orders</span>
          </Link>
        </li>

        <li
          className={`nav-item ${
            pathname === "/admin/profile" ? "active" : ""
          } `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/admin/profile">
            <i className="icon-grid-2 menu-icon"></i>
            <span className="menu-title">Profile</span>
          </Link>
        </li>

        <li
          className={`nav-item ${
            pathname === "/admin/Challenges" ? "active" : ""
          } `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/admin/Challenges">
            <i className="fa fa-tasks menu-icon" aria-hidden="true"></i>
            <span className="menu-title">Challenges</span>
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
            <i className="icon-layout menu-icon"></i>
            <span className="menu-title">Users</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/admin/users/trainer">
                  Trainer
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/admin/users/trainee">
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
            <i className="icon-paper menu-icon"></i>
            <span className="menu-title">Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
