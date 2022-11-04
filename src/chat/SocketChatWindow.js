import React, { useEffect, useState } from "react";
import "./Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from "react-redux";
const ChatWindow = ({ socket, username, room }) => {
  const { user } = useSelector((state) => state.user);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="row">
      <div className="col-sm-12 col-12">
        <div className="add-items d-flex mb-0 chat-body ">
          <form className="form message-containeer">
            <div class="col-sm-12 col-sm-offset-8 frame">
              <ul className="ull">
                {messageList.map((messageContent) => {
                  return (
                    <>
                      {username === messageContent?.author ? (
                        <li style={{ width: "95%" }}>
                          <div className="msj-rta macro">
                            <div className="text text-r">
                              <p className="text-msg">
                                {messageContent.message}
                              </p>
                              <p>
                                <small>{messageContent.time}</small>
                              </p>
                            </div>
                            {/* <div
                                className="avatar"
                                style={{
                                  padding: "0px 0px 0px 10px !important",
                                }}
                              >
                                <img
                                  className="img-circle"
                                  style={{ width: "100%" }}
                                  src=""
                                />
                              </div> */}
                          </div>
                        </li>
                      ) : (
                        <div className="msj macro ">
                          {/* <div className="avatar">
                             <img
                                className="img-circle"
                                style={{ width: "100%" }}
                                src="'+ me.avatar +'"
                              /> 
                          </div>*/}

                          <div className="text text-l ">
                            <small>{messageContent.author}</small>
                            <p className="text-msg">{messageContent.message}</p>
                            <p>
                              <small>{messageContent.time}</small>
                            </p>
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
      <div className="col-sm-11 mb-5 mx-3">
        <input
          className="inputtext"
          type="text"
          placeholder="Write your message..."
          style={{
            borderRadius: "50px",
            padding: "15px",
            // marginBottom: "10px",
            // overflowX: "hidden",
            // overflowY: "scroll",
            height: "1.8rem",
            justifyContent: "space-around",
            border: "none",
            outline: "none",
            // border: "2px solid silver",
            // textAlign: "center",
            // justifyContent: "center",
            // alignItems: "center",
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
          // className="submit  "
          style={{
            float: "right",

            border: "none",
            outline: "none",
            background: "none",
            borderRadius: "50%",

            position: "relative",
            // height: "1rem",
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
