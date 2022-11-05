import React, { useState, useEffect } from "react";
import { totalRecords } from "../../helpers/auth";
import SplashScreen from "../../modules/Partials/SplashScreen";
import { GET_USER_DATA } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [total, setTotal] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    handleMe();
    dispatch(GET_USER_DATA());
  }, [dispatch]);

  const handleMe = () => {
    setIsLoading(true);
    try {
      totalRecords().then((data) => {
        setTotal(data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="row">
            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
              <h3 className="font-weight-bold">Welcome {user?.name}</h3>
              <h6 className="font-weight-normal mb-0">
                All systems are running smoothly! You have{" "}
                <span className="text-danger">3 unread alerts!</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card tale-bg">
            <div className="card-people mt-auto">
              <img src="/assets/images/dashboard/people.svg" alt="people" />
              <div className="weather-info">
                <div className="d-flex">
                  <div>
                    <h2 className="mb-0 font-weight-normal">
                      <i className="icon-sun mr-2"></i>31<sup>C</sup>
                    </h2>
                  </div>
                  <div className="ml-2">
                    <h4 className="location font-weight-normal">Islamabad</h4>
                    <h6 className="font-weight-normal">Pakistan</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin transparent">
          <div className="row">
            <div className="col-md-6 mb-4 stretch-card transparent">
              <div className="card card-danger">
                <div className="card-body">
                  <p className="mb-4"> Number Of Sessions Booked</p>
                  <p className="fs-30 mb-2"> {total?.sessions?.booked}</p>
                  <p>10.00% (30 days)</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4 stretch-card transparent">
              <div className="card card-black">
                <div className="card-body">
                  <p className="mb-4">Number Of Total Settions</p>
                  <p className="fs-30 mb-2"> {total?.sessions?.total}</p>
                  <p>22.00% (30 days)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
              <div className="card card-danger">
                <div className="card-body">
                  <p className="mb-4">Numbers of Trainer</p>
                  <p className="fs-30 mb-2">{total?.users?.trainer}</p>
                  <p>2.00% (30 days)</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 stretch-card transparent">
              <div className="card card-black">
                <div className="card-body">
                  <p className="mb-4">Number of Trainee</p>
                  <p className="fs-30 mb-2">{total?.users?.trainee}</p>
                  <p>0.22% (30 days)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
