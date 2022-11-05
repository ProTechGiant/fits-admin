import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { UPDATE_PROFESSION_DETAIL_BY_ID } from "../../reducers/userReducer";
import "react-toastify/dist/ReactToastify.css";
const UserData = (props) => {
  const { profession } = props;
  useEffect(() => {
    setQualification(profession?.qualification);
  }, [props, profession]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [experienceNote, setExperienceNote] = useState("");
  const [experienceYear, setExperienceYear] = useState(0);
  const [qualification, setQualification] = useState([
    {
      id: 1,
      degree: "",
      degree_note: "",
    },
  ]);

  //.......................... Update date...............................//
  const addQualification = (e) => {
    e.preventDefault();
    let oldQualification = [...qualification];
    let newQualification = {
      id: qualification.length + 1,
      degree: "",
      degree_note: "",
    };
    oldQualification.push(newQualification);
    setQualification(oldQualification);
  };

  //...Update(degree)...
  const upDegree = (index, value) => {
    let oldQualification = [...qualification];
    oldQualification[index].degree = value;
    setQualification(oldQualification);
  }; //...Update(degree_note)...
  const upDegreeNote = (index, value) => {
    let oldQualification = [...qualification];
    oldQualification[index].degree_note = value;
    setQualification(oldQualification);
  }; //...Delete Items...

  const delQualification = (e, id) => {
    e.preventDefault();
    let oldQualification = [...qualification];
    let NewDataForQualification = oldQualification.filter(
      (task) => task.id !== id
    );
    setQualification(NewDataForQualification);
  };
  const ForUpdate = {
    id,
    experience_note: experienceNote,
    experience_year: experienceYear,
    qualification,
  };
  // ...fetching api...
  const UpdateUserDetail = () => {
    dispatch(UPDATE_PROFESSION_DETAIL_BY_ID(ForUpdate));
  };
  return (
    <>
      <form className="form form-label-right">
        {/*  Form */}
        <div className="form-group row">
          <div className="col-lg-6">
            <label htmlFor="ProductName">Experience(Year)</label>
            <input
              type="text"
              className="form-control"
              defaultValue={profession?.experience_year}
              onChange={(e) => {
                setExperienceYear(e.target.value);
              }}
              placeholder="Experience Year"
            />
          </div>
          <div className="col-lg-6">
            <label htmlFor="ProductName">
              Any description about experience
            </label>
            <input
              type="text"
              className="form-control"
              defaultValue={profession?.experience_note}
              onChange={(e) => {
                setExperienceNote(e.target.value);
              }}
              placeholder="Experience_note"
            />
          </div>
        </div>

        <>
          {" "}
          {qualification?.map((data, index) => (
            <Fragment key={index}>
              <div className="form-group row">
                <div className="col-lg-6">
                  <label htmlFor="ProductName">Degree</label>
                  <input
                    type="text"
                    placeholder="Degree"
                    className="form-control"
                    value={data?.degree}
                    onChange={(e) => upDegree(index, e.target.value)}
                  />
                </div>{" "}
                <div className="col-lg-6">
                  <label htmlFor="ProductName">
                    Any description about experience
                  </label>

                  <input
                    type="text"
                    placeholder="Degree Note"
                    className="form-control"
                    value={data?.degree_note}
                    onChange={(e) => upDegreeNote(index, e.target.value)}
                  />
                </div>
              </div>
              <button
                style={{
                  height: "46px",
                  width: "40px",
                  borderRadius: "4px",
                  marginTop: "17px",
                  backgroundColor: "transparent",
                  objectFit: "cover",
                  border: "1px solid #5ba600",
                }}
                onClick={addQualification}
              >
                +
              </button>
              {data?.id === 1 ? (
                ""
              ) : (
                <button
                  style={{
                    height: "46px",
                    width: "40px",
                    marginLeft: "5px",
                    marginTop: "17px",

                    borderRadius: "4px",
                    backgroundColor: "transparent",
                    objectFit: "cover",
                    border: "1px solid red",
                  }}
                  onClick={(e) => delQualification(e, data?.id)}
                >
                  -
                </button>
              )}
            </Fragment>
          ))}
        </>
        <button
          type="button"
          class="btn btn-inverse-info btn-icon mr-2"
          onClick={() => UpdateUserDetail()}
        >
          <i class="ti-pencil"></i>
        </button>
      </form>
    </>
  );
};
export default UserData;
