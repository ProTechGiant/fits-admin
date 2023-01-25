/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NetworkError from "../../Hoc/NetworkError";
import { toggleButton } from "../../reducers/authReducer";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Info, Menu, Person2, Settings } from "@mui/icons-material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Navbar = () => {
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();

  const ShowFun = () => {
    setHide(!hide);
    dispatch(toggleButton(hide));
  };

  return (
    <nav className="navbar col-lg-12 col-12 col-md-12 colsm-12 p-0 fixed-top d-flex flex-row ">
      <NetworkError />
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center ">
        <Link className="navbar-brand brand-logo mr-5" to="/">
          <h3>Fits Admin</h3>
        </Link>
        <Link className="navbar-brand brand-logo-mini" to="/">
          <img src="/assets/images/logo-mini.svg" alt="logo" />
        </Link>
      </div>

      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end ">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        ></button>

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="notificationDropdown"
              href="#"
              data-toggle="dropdown"
            >
              <NotificationsNoneIcon className="mx-0" />

              <span className="count"></span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="notificationDropdown "
            >
              <p className="mb-0 font-weight-normal float-left dropdown-header">
                Notifications
              </p>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-success">
                    <Info />
                    <i className="ti-info-alt mx-0"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal">
                    Application Error
                  </h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    Just now
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-warning">
                    <Settings className="mx-0" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal">
                    Settings
                  </h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    Private message
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-info">
                    <Person2 />
                  </div>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal">
                    New user registration
                  </h6>
                  <p className="font-weight-light small-text mb-0 text-muted">
                    2 days ago
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="nav-item nav-profile dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              id="profileDropdown"
            >
              <img src="/assets/images/faces/face28.jpg" alt="profile" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="profileDropdown"
            >
              <a className="dropdown-item">
                <Settings className="text-danger mx-2" />
                Settings
              </a>
              <Link className="nav-link " to="/logout">
                <p className="dropdown-item">
                  <PowerSettingsNewIcon className="text-danger mx-2" />
                  Logout
                </p>
              </Link>
            </div>
          </li>
          <li className="nav-item nav-settings d-none d-lg-flex">
            <MoreHorizIcon onClick={() => ShowFun()} />
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center mr-3"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="icon-menu text-center" onClick={() => ShowFun()}>
            <Menu />
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
