/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import SplashScreen from "../../../modules/Partials/SplashScreen";

const Session = () => {
  const { loading, session } = useSelector((state) => state.userData);
  const [userSession, setUserSession] = useState([]);

  useEffect(() => {
    setUserSession(session);
  }, [session]);
  return (
    <>
      {!loading ? (
        <div className="row">
          {userSession?.length > 0
            ? userSession?.map((value, index) => {
                return (
                  <div className="col-12 col-md-4 mx-3" key={index}>
                    <Card
                      style={{
                        background: "#2332",
                      }}
                    >
                      <Card.Body>
                        <Card.Title>Session {index + 1}</Card.Title>
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
                                {" "}
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
                          <ListGroup.Item className="bg bg-danger text-white text-center">
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
