/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NetworkError from "../../Hoc/NetworkError";
import { toggleButton } from "../../reducers/authReducer";
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
          <h2>Wegoz</h2>
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
              <i className="icon-bell mx-0"></i>
              <span className="count"></span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list border border-danger"
              aria-labelledby="notificationDropdown "
            >
              <p className="mb-0 font-weight-normal float-left dropdown-header">
                Notifications
              </p>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-success">
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
                    <i className="ti-settings mx-0"></i>
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
                    <i className="ti-user mx-0"></i>
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
                <i className="ti-settings text-danger"></i>
                Settings
              </a>
              <Link className="nav-link" to="/logout">
                <a className="dropdown-item">
                  <i className="ti-power-off text-danger"></i>
                  Logout
                </a>
              </Link>
            </div>
          </li>
          <li className="nav-item nav-settings d-none d-lg-flex">
            <a className="nav-link" href="#">
              <i className="icon-ellipsis" onClick={() => ShowFun()}></i>
            </a>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="icon-menu" onClick={() => ShowFun()}></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
