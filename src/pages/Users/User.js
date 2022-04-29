import React, { useState } from "react";
// import MultiSelect from "react-multiple-select-dropdown-lite";
// import "react-multiple-select-dropdown-lite/dist/index.css";
const UserData = (props) => {
  const { user } = props;
  const [fitnessLevel, setFitnessLevel] = useState(0);
  const [services, setServices] = useState("");
  const [goalKey, setGoalKey] = useState("");
  const [goalValue, setGoalValue] = useState("");
  const [levelKey, setLevelKey] = useState("");
  const [levelValue, setLevelValue] = useState("");
  const [value, setValue] = useState("");
  // const Services = [
  //   { label: "Adobe", value: "Adobe" },
  //   { label: "Brick", value: "Brick" },
  //   { label: "Concrete Block", value: "Concrete Block" },
  //   { label: "Log", value: "Log" },
  //   { label: "Metal", value: "Metal" },
  //   { label: "Stone", value: "Stone" },
  //   { label: "Straw", value: "Straw" },
  //   { label: "Wood", value: "Wood" },
  // ];
  // const handleServices = (val) => {
  //   setServices(val);
  // };
  return (
    <>
      {/* ...form... */}
      <form className="form form-label-right">
        <div className="form-group row">
          <div className="col-lg-12">
            <h3>Service Offered</h3>
          </div>
          {/* <MultiSelect
            onChange={handleServices}
            options={Services}
            // defaultValue={flooring}
          /> */}
          {/* <div className="col-lg-6">
            <label htmlFor="ProductName">Key</label>
            <input
              type="text"
              className="form-control"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
              }}
              placeholder="Key"
            />
          </div>
          <div className="col-lg-6">
            <label htmlFor="ProductName">Value</label>
            <input
              type="text"
              className="form-control"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="Value"
            />
          </div> */}
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
      </form>
    </>
  );
};
export default UserData;
