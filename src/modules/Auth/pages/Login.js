import React, { useState } from "react";
import "./Login.css";
import {
  loginPending,
  loginFail,
  loginSuccess,
} from "../../../reducers/authReducer";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, authenticate } from "../../../helpers/auth";
toast.configure();

const Login = () => {
  const dispatch = useDispatch();

  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginPending());

    console.log("email ", email, " password: ", password);

    try {
      login({ email, password }).then((data) => {
        if (data?.message === "success") {
          authenticate(data, () => {
            setTimeout(() => {
              dispatch(loginSuccess({ data }));
              setLoading(false);
              toast.success("Login Successfully!", {
                autoClose: 1000,
              });
            }, 1000);
          });
        } else {
          const error = data?.message;
          setTimeout(() => {
            dispatch(loginFail({ error }));
            setLoading(false);
            toast.error(error, {
              autoClose: 1500,
            });
          }, 1000);
        }
      });
    } catch (error) {
      console.log("login page catch error", error);
      toast.error(error, {
        autoClose: 1500,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    <h3>Wegoz</h3>
                  </div>
                  <h4>Hello! let's get started</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  <form className="pt-3">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="exampleInputEmail1"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
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
                          className="fa fa-fw fa-eye field-icon toggle-password mx-4"
                          aria-hidden="false"
                          onClick={togglePassword}
                        ></span>
                      ) : (
                        <span
                          toggle="#password-field"
                          className="fa fa-eye-slash field-icon toggle-password mx-4"
                          aria-hidden="true"
                          onClick={togglePassword}
                        ></span>
                      )}
                    </div>

                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-block btn-danger btn-lg font-weight-medium auth-form-btn"
                        onClick={(e) => handleSubmit(e)}
                        disabled={loading ? "true" : null}
                      >
                        {loading ? (
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                          ></div>
                        ) : (
                          "SIGN IN"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/*  content-wrapper ends  */}
        </div>
        ;{/* <!-- page-body-wrapper ends --> */}
      </div>
    </>
  );
};

export default Login;
