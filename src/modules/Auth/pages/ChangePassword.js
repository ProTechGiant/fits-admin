import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const ChangePassword = (props) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const history = useHistory();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  useEffect(() => {
    setCode(props.location.state.OTP);

    setEmail(props.location.state.email);
  }, []);
  const url = "http://localhost:5000/api/change-password";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      email: email,
      code: code,
      password: password,
    }),
  };
  const handleSubmit = () => {
    if (password === "") {
      setTimeout(() => {
        toast.error("New Password is empty", {
          autoClose: 1500,
        });
      }, 1000);
    } else {
      try {
        fetch(url, options)
          .then((response) => response.json())
          .then((data) => {
            if (data === "Update Success") {
              setTimeout(() => {
                toast.success("Password Change Successfully ", {
                  autoClose: 1500,
                });
              }, 1000);
              history.push({ pathname: "/auth/login" });
            } else {
              setTimeout(() => {
                toast.error("Incorrect Password", {
                  autoClose: 1500,
                });
              }, 1000);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src="/assets/images/logo2.png" alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>

                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    type={passwordShown ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordShown ? (
                    <span
                      toggle="#password-field"
                      class="fa fa-fw fa-eye field-icon toggle-password mx-4"
                      aria-hidden="false"
                      onClick={togglePassword}
                    ></span>
                  ) : (
                    <span
                      toggle="#password-field"
                      class="fa fa-eye-slash field-icon toggle-password mx-4"
                      aria-hidden="true"
                      onClick={togglePassword}
                    ></span>
                  )}
                </div>

                <div className="mt-3">
                  <button
                    className="btn btn-block btn-danger btn-lg font-weight-medium auth-form-btn"
                    onClick={(e) => handleSubmit()}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  content-wrapper ends  */}
      </div>
      ;{/* <!-- page-body-wrapper ends --> */}
    </div>
  );
};

export default ChangePassword;
