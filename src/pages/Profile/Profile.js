import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";

import ProfileUpdate from "./ProfileUpdate";
import SplashScreen from "../../modules/Partials/SplashScreen";
import { me } from "../../helpers/auth";
import { isMeAuth } from "../../reducers/authReducer";
import { Edit } from "@mui/icons-material";
toast.configure();

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const [userInfo, setUserInfo] = useState({});

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: false,
    id: "",
  });
  const [newEdit, setNewEdit] = useState(false);
  const handleClose = () => setNewEdit(false);
  const handleShowName = () => {
    setData({
      name: userInfo?.name,
      email: "",
      password: false,
      id: userInfo?._id,
    });
    setNewEdit(true);
  };
  const handleMe = () => {
    setLoading(true);
    try {
      me().then((data) => {
        setUserInfo(data?.data?.personal_info);
        if (data?.data?.user?._id) {
          dispatch(isMeAuth({ data: data?.data?.user }));
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("login page catch error", error);
    }
  };

  useEffect(() => {
    handleMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleShowEmail = () => {
    setNewEdit(true);
    setData({ name: "", email: user?.email, password: false });
  };
  const handleShowPassword = () => {
    setNewEdit(true);
    setData({ name: "", email: "", password: true });
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">
            <div
              className="row "
              style={{
                border: "2px solid #ffff",
                borderRadius: "10px",
              }}
            >
              <div className="col-md-4 border-right ">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    className="rounded-circle mt-5"
                    width="150px"
                    alt="not_found"
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  />
                  <span className="font-weight-bold">{userInfo?.name}</span>
                  <span className="text-black-50">{user?.email}</span>
                  <span> </span>
                </div>
              </div>

              <div className="col-md-8  grid-margin stretch-card mt-4  ">
                <div className="p-3 " style={{ width: "100%" }}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="card-title"> Update Password</h4>
                  </div>
                  <div
                    className="card border px-4 pb-3  mt-3"
                    style={{
                      boxShadow: "4px 4px 4px 4px white",
                    }}
                  >
                    <div
                      className="row"
                      style={{
                        borderRadius: "10px",
                      }}
                    >
                      <div className="col-md-11 col-sm-11 col-10">
                        <label className="labels mt-3">Name</label>
                        <h4>{userInfo?.name}</h4>
                      </div>
                      <div className="col-md-1 col-sm-1 col-2 mt-1">
                        <Edit
                          className="update"
                          onClick={() => handleShowName()}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="card border px-4 pb-3  mt-3"
                    style={{
                      boxShadow: "4px 4px 4px 4px white",
                    }}
                  >
                    <div
                      className="row"
                      style={{
                        borderRadius: "10px",
                      }}
                    >
                      <div className="col-md-11 col-sm-11 col-10">
                        <label className="labels mt-3">Email</label>
                        <h4>{user?.email}</h4>
                      </div>
                      <div className="col-md-1 col-sm-1 col-2 mt-1">
                        <Edit
                          className="update"
                          onClick={() => handleShowEmail()}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="card border px-4 pb-3  mt-3"
                    style={{
                      boxShadow: "4px 4px 4px 4px white",
                    }}
                  >
                    <div
                      className="row"
                      style={{
                        borderRadius: "10px",
                      }}
                    >
                      <div className="col-md-11 col-sm-11 col-10">
                        <label className="labels mt-3">Password</label>
                        <h4>********</h4>
                      </div>
                      <div className="col-md-1 col-sm-1 col-2 mt-1">
                        <Edit
                          className="update"
                          onClick={() => handleShowPassword()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProfileUpdate
          data={data}
          newEdit={newEdit}
          handleClose={handleClose}
          reload={handleMe}
        />
      </div>
    </>
  );
};

export default Profile;
