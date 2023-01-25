import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFESSION_DETAIL_BY_ID } from "../../reducers/userReducer";
import "react-toastify/dist/ReactToastify.css";
import { Edit } from "@mui/icons-material";
import SplashScreen from "../../modules/Partials/SplashScreen";
const Professional = () => {
  const { loading, profession_info } = useSelector((state) => state.userData);

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
  useEffect(() => {
    if (profession_info?.user) {
      setQualification(profession_info?.qualification);
      setExperienceNote(profession_info?.experience_note);
      setExperienceYear(profession_info?.experience_year);
    } else {
      setQualification([
        {
          id: 1,
          degree: "",
          degree_note: "",
        },
      ]);
      setExperienceNote("");
      setExperienceYear("");
    }
  }, [profession_info, dispatch]);
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
  const upDegree = (index) => (e) => {
    let oldQualification = [...qualification];
    let { degree_note, id } = oldQualification[index];

    oldQualification[index] = {
      degree_note: degree_note,
      id: id,
      degree: e.target.value,
    };
    setQualification(oldQualification);
  }; //...Update(degree_note)...
  const upDegreeNote = (index) => (e) => {
    let oldQualification = [...qualification];

    let { degree, id } = oldQualification[index];
    oldQualification[index] = {
      degree_note: e.target.value,
      id: id,
      degree: degree,
    };
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
    id: profession_info?._id,
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
      {!loading ? (
        <form className="form form-label-right">
          <div className="form-group row">
            <div className="col-lg-6">
              <label htmlFor="ProductName">Experience(Year)</label>
              <input
                type="text"
                className="form-control"
                value={experienceYear}
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
                value={experienceNote}
                onChange={(e) => {
                  setExperienceNote(e.target.value);
                }}
                placeholder="Experience_note"
              />
            </div>
          </div>

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
                    onChange={upDegree(index)}
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
                    onChange={upDegreeNote(index)}
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

          <button
            type="button"
            className="btn btn-inverse-info btn-icon ml-2"
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
export default Professional;
