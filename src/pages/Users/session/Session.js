/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import SplashScreen from "../../../modules/Partials/SplashScreen";
import { Delete } from "@mui/icons-material";
import { fetch3 } from "../../../reducers/helper/fetch";
import { baseUrl } from "../../../config/baseUrl";
import { GET_USER_DETAIL_BY_ID } from "../../../reducers/userReducer";

const Session = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const { loading, session } = useSelector((state) => state.userData);
  const [userSession, setUserSession] = useState([]);

  useEffect(() => {
    setUserSession(session);
  }, [session]);

  const deleteSession = (sessionId) => {
    fetch3(`${baseUrl}/api/session/${sessionId}`, "delete").then((data) => {
      if (data.deleted) {
        dispatch(GET_USER_DETAIL_BY_ID(id));
      }
    });
  };
  return (
    <>
      {!loading ? (
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {userSession?.length > 0
            ? userSession?.map((value, index) => {
                return (
                  <div className="col-12 col-md-5 mx-3 my-2" key={index}>
                    <Card
                      style={{
                        background: "#2332",
                      }}
                    >
                      <Card.Body>
                        <Card.Title>
                          Session {index + 1}
                          <span className="float-right">
                            <Delete
                              style={{ color: "#4b49ac", cursor: "pointer" }}
                              onClick={() => {
                                deleteSession(value._id);
                              }}
                            />
                          </span>
                        </Card.Title>
                        <Card.Img
                          style={{ height: "50vh" }}
                          variant="top"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh86onoW2miroSdo9o7Skwgx0glHAhpan9QQ&usqp=CAU"
                        />

                        <Card.Text className="mt-3 text-success text-center font-weight-bolder ">
                          {`${value?.category}`}
                        </Card.Text>

                        <ListGroup className="list-group-flush">
                          <ListGroup.Item className="bg bg-dark text-white">
                            <small>
                              Session
                              <span className="float-right">
                                {value?.session_title}
                              </span>
                            </small>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <small>
                              Class
                              <span className="float-right">
                                {" "}
                                {value?.class_title}
                              </span>
                            </small>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <small>
                              Duration{" "}
                              <span className="float-right">
                                {" "}
                                {value?.duration}
                              </span>
                            </small>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <small>
                              {" "}
                              Number of Slots
                              <span className="float-right">
                                {" "}
                                {value?.no_of_slots}
                              </span>
                            </small>{" "}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <small>
                              Number of Reviews{" "}
                              <span className="float-right">
                                {" "}
                                {value?.numReviews}
                              </span>{" "}
                            </small>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <small>
                              Price{" "}
                              <span className="float-right">
                                {" "}
                                {value?.price}
                              </span>{" "}
                            </small>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <small>
                              Select Date{" "}
                              <span className="float-right">
                                {" "}
                                {value?.select_date}
                              </span>{" "}
                            </small>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <small>
                              Sports{" "}
                              <span className="float-right">
                                {" "}
                                {value?.sports}
                              </span>{" "}
                            </small>
                          </ListGroup.Item>
                          <ListGroup.Item className="text-black fw">
                            Equipments{" "}
                            {/* <span className="float-right"> {value?.no_of_slots}</span>{" "} */}
                          </ListGroup.Item>
                          {value.equipment.map((eq, i) => {
                            return (
                              <ListGroup.Item key={i}>
                                Sports{" "}
                                <span className="float-right">
                                  {" "}
                                  {eq?.value}
                                </span>{" "}
                              </ListGroup.Item>
                            );
                          })}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            : "Session does not exists"}
        </div>
      ) : (
        <SplashScreen />
      )}
    </>
  );
};

export default Session;
