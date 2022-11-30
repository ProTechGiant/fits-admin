import React, { useState } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import { baseUrl } from "../config/baseUrl";
const ChatWindow = ({ messageList, setMessageList }) => {
  const { roomId, user, userId, rname } = useSelector((state) => state.user);
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();

    const messageData = {
      roomId,
      senderId: user._id,
      receiverId: userId,
      senderName: `${user.name}`,
      receiverName: rname,
      mes: currentMessage,
    };
    await fetch(`${baseUrl}/api/message/send`, {
      method: "POST",
      body: JSON.stringify(messageData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setCurrentMessage("");
      })

      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="row">
      <div className="col-sm-12 col-12">
        <div className="add-items d-flex mb-0 chat-body ">
          <form className="form message-containeer">
            <div class="col-sm-12 col-sm-offset-8 frame">
              <ul className="ull">
                {messageList?.map((messageContent, i) => {
                  return (
                    <>
                      {user.name === messageContent?.senderName ? (
                        <li style={{ width: "95%" }}>
                          <div className="msj-rta macro">
                            <div className="text text-r">
                              <p className="text-msg">{messageContent.mes}</p>
                              <p></p>
                            </div>
                          </div>
                        </li>
                      ) : (
                        <div className="msj macro ">
                          <div className="text text-l ">
                            <small>
                              {messageContent.receiverId === user._id
                                ? messageContent.receiverName
                                : messageContent.senderName}
                            </small>
                            <p className="text-msg">{messageContent.mes}</p>
                            <p>{/* <small>{messageContent.time}</small> */}</p>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </ul>
            </div>
          </form>
        </div>
      </div>
      <div className="col-sm-1"> </div>
      <div className="col-sm-11 mx-3">
        <input
          className="inputtext"
          type="text"
          placeholder="Write your message..."
          style={{
            borderRadius: "50px",
            padding: "15px",

            justifyContent: "space-around",
            border: "none",
            outline: "none",

            width: "90%",
            background: "black",
            color: "white",
            position: "absolute",
          }}
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />

        <button
          style={{
            float: "right",
            marginTop: "5px",
            marginRight: "5px",
            fontSize: "30px",
            border: "none",
            outline: "none",
            background: "none",
            borderRadius: "50%",

            position: "relative",
          }}
          onClick={sendMessage}
        >
          <i
            className="fa fa-paper-plane fa-xs text-danger  icon_Send pr-1"
            aria-hidden="true"
          ></i>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
