/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";
import { useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";
const Chat = () => {
  const { roomId, user } = useSelector((state) => state.user);

  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");

  const socket = io("http://localhost:5000", {
    transports: ["websocket", "polling"], // use WebSocket first, if available
  });

  socket.on("connect_error", () => {
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
  });
  useEffect(() => {
    joinRoom(roomId);
  }, [roomId]);
  const joinRoom = (room) => {
    if (room !== "") {
      setRoom(room);
      setUsername(user?.name);
      console.log("..RoomId", room);
      socket.emit("join_room", room);
    }
  };

  return (
    <>
      <ul className="nav border-top" id="setting-panel">
        <li className="nav-item">
          <a className="nav-link">
            LIVE CHAT ({user?.name === username && username})
            <p style={{ fontSize: "10px" }}>{roomId}</p>
          </a>
        </li>
      </ul>

      <ChatWindow socket={socket} username={username} room={room} />
    </>
  );
};

export default Chat;
