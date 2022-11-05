import React, { useState, useEffect } from "react";

import "./Chat.css";
import { useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";
import { baseUrl } from "../config/baseUrl";
const Chat = () => {
  const { roomId, user, rname } = useSelector((state) => state.user);

  const [messageList, setMessageList] = useState([
    {
      roomId: "",
      senderId: "",
      receiverId: "",
      senderName: ``,
      receiverName: "",
      mes: "",
    },
  ]);

  const getAllMessages = async () => {
    await fetch(`${baseUrl}/api/message/all/${roomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setMessageList(res2.messages);
      })
      .catch((err) => console.log("err deleted", err));
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  useEffect(() => {
    if (!user._id === "") {
      const interval = setInterval(() => {
        getAllMessages();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [getAllMessages, roomId, user._id]);

  return (
    <>
      <ul className="nav border-top" id="setting-panel">
        <li className="nav-item">
          <a className="nav-link">
            LIVE CHAT ({rname})<p style={{ fontSize: "10px" }}>{roomId}</p>
          </a>
        </li>
      </ul>

      <ChatWindow messageList={messageList} setMessageList={setMessageList} />
    </>
  );
};

export default Chat;
