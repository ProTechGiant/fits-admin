/* eslint-disable react-hooks/exhaustive-deps */
import { Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SplashScreen from "../../modules/Partials/SplashScreen";
import { UPDATE_UserGoal_DETAIL_BY_ID } from "../../reducers/userReducer";

const UserData = () => {
  const { loading, user_info } = useSelector((state) => state.userData);

  const [isloading, setIsLoading] = useState(false);
  const [goalKey, setGoalKey] = useState("");
  const [goalValue, setGoalValue] = useState("");
  const [levelKey, setLevelKey] = useState("");
  const [servicesKey, setServicesKey] = useState("");
  const [servicesValue, setServicesValue] = useState("");
  const [levelValue, setLevelValue] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    handleUserInfo();
  }, [user_info]);

  const handleUserInfo = () => {
    setIsLoading(true);
    if (user_info?.fitness_goal) {
      setGoalKey(user_info?.fitness_goal?.key);
      setGoalValue(user_info?.fitness_goal?.value);
    } else {
      setGoalKey("");
      setGoalValue("");
    }
    if (user_info?.fitness_level) {
      setLevelKey(user_info?.fitness_level?.key);
      setLevelValue(user_info?.fitness_level?.value);
    } else {
      setLevelKey("");
      setLevelValue("");
    }
    if (user_info?.services_offered) {
      setServicesKey(user_info?.services_offered?.key);
      setServicesValue(user_info?.services_offered?.value);
    } else {
      setServicesKey("");
      setServicesValue("");
    }
    setIsLoading(false);
  };
  const updateUserGoals = {
    id: id,
    fitness_level: {
      key: levelKey,
      value: levelValue,
    },
    fitness_goal: {
      key: goalKey,
      value: goalValue,
    },
    services_offered: {
      key: servicesKey,
      value: servicesValue,
    },
  };
  const UpdateUserDetail = () => {
    dispatch(UPDATE_UserGoal_DETAIL_BY_ID(updateUserGoals));
  };
  return (
    <>
      {!loading || isloading ? (
        <form className="form form-label-right">
          <div className="form-group row">
            <div className="col-lg-12">
              <h3>Service Offered</h3>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12">
              <h3>Fitness Goal</h3>
            </div>
            <div className="col-lg-6">
              <label htmlFor="ProductName">Fitness_goal Key</label>
              <input
                type="text"
                className="form-control"
                value={goalKey}
                onChange={(e) => {
                  setGoalKey(e.target.value);
                }}
                placeholder="Fitness_goal Key"
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="ProductName">Fitness_goal Value</label>
              <input
                type="text"
                className="form-control"
                value={goalValue}
                onChange={(e) => {
                  setGoalValue(e.target.value);
                }}
                placeholder="Fitness_goal Value"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12">
              <h3>Fitness Level</h3>
            </div>
            <div className="col-lg-6">
              <label htmlFor="ProductName">Fitness_Level Key</label>
              <input
                type="text"
                className="form-control"
                value={levelKey}
                onChange={(e) => {
                  setLevelKey(e.target.value);
                }}
                placeholder="Fitness_goal Level"
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="ProductName">Fitness_Level Value</label>
              <input
                type="text"
                className="form-control"
                value={levelValue}
                onChange={(e) => {
                  setLevelValue(e.target.value);
                }}
                placeholder="Fitness_Level Value"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12">
              <h3>services Offered</h3>
            </div>
            <div className="col-lg-6">
              <label htmlFor="ProductName">Services Offered Key</label>
              <input
                type="text"
                className="form-control"
                value={servicesKey}
                onChange={(e) => {
                  setServicesKey(e.target.value);
                }}
                placeholder="Fitness_goal Level"
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="ProductName">Services Offered Value</label>
              <input
                type="text"
                className="form-control"
                value={servicesValue}
                onChange={(e) => {
                  setServicesValue(e.target.value);
                }}
                placeholder="sercices offered Value"
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-inverse-info btn-icon mr-2"
            onClick={() => UpdateUserDetail()}
          >
            <Edit />
          </button>
        </form>
      ) : (
        <SplashScreen />
      )}
    </>
  );
};
export default UserData;
