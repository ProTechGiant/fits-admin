import React, { useState } from "react";
import "../../chat/Chat.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleChatButton } from "../../reducers/authReducer";
import Chat from "../../chat/Chat";
import { Settings } from "@mui/icons-material";
const SettingPanel = () => {
  const dispatch = useDispatch();
  const { toggleChat } = useSelector((state) => state.user);

  const [hover, setHover] = useState(true);

  const SettingFun = () => {
    dispatch(toggleChatButton(hover));
    setHover(!hover);
  };
  return (
    <>
      <div className="theme-setting-wrapper ">
        <div id="settings-trigger">
          <Settings className="ti-settings text-white" />
          {/* <i className="ti-settings"></i> */}
        </div>
        <div id="theme-settings" className="settings-panel">
          <i className="settings-close ti-close"></i>
          <p className="settings-heading">SIDEBAR SKINS</p>
          <div className="sidebar-bg-options selected" id="sidebar-light-theme">
            <div className="img-ss rounded-circle bg-light border mr-3"></div>
            Light
          </div>
          <div className="sidebar-bg-options" id="sidebar-dark-theme">
            <div className="img-ss rounded-circle bg-dark border mr-3"></div>
            Dark
          </div>
          <p className="settings-heading mt-2">HEADER SKINS</p>
          <div className="color-tiles mx-0 px-4">
            <div className="tiles success"></div>
            <div className="tiles warning"></div>
            <div className="tiles danger"></div>
            <div className="tiles info"></div>
            <div className="tiles dark"></div>
            <div className="tiles default"></div>
          </div>
        </div>
      </div>
      <div
        id="right-sidebar"
        className={`settings-panel ${toggleChat ? "open" : ""} `}
      >
        <i
          className={`settings-close ti-close ${hover ? "fontHover" : ""}`}
          onClick={() => SettingFun()}
        ></i>
        <>{toggleChat ? <Chat /> : ""}</>
      </div>
    </>
  );
};

export default SettingPanel;
