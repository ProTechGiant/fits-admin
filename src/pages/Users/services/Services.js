/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import SplashScreen from "../../../modules/Partials/SplashScreen";
const Services = () => {
  const { loading, services } = useSelector((state) => state.userData);
  const [userServices, setUserServices] = useState([]);

  useEffect(() => {
    setUserServices(services);
  }, [services]);
  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <div className="row">
          {userServices?.length > 0
            ? userServices?.map((value, index) => {
                return (
                  <div className="col-12 col-md-4 mx-3 my-2" key={index}>
                    <Card
                      key={index}
                      style={{
                        textTransform: "uppercase",
                      }}
                      className="text-center bg bg-facebook text-white"
                    >
                      <Card.Body>
                        <Card.Title className="text-white">
                          Service {index + 1}
                        </Card.Title>

                        <Card.Text className="mt-3 text-white bg bg-dark py-4">
                          <title className="d-inline">
                            {" "}
                            {value?.service_name}
                          </title>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            : "Service does not found"}
        </div>
      )}
    </>
  );
};

export default Services;
