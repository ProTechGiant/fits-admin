import React from "react";
import Navbar from "./Partials/Navbar";
import SideBar from "./Partials/Sidebar";
import Footer from "./Partials/Footer";
import SettingPanel from "./Partials/SettingPanel";

const Layout = ({ children }) => {
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <SettingPanel />
          {/* Sidebar */}
          <SideBar />
          <div className="main-panel">
            {/* Begin: Content Wrapper */}
            <main>{children}</main>
            {/* End: Content Wrapper */}
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
