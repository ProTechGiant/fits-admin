import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PERSONAL_DETAIL_BY_ID } from "../../reducers/userReducer";
import { Edit } from "@mui/icons-material";
import SplashScreen from "../../modules/Partials/SplashScreen";
import { toast } from "react-toastify";
const Personal = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [state, setState] = useState("");
  const { loading, personal_info } = useSelector((state) => state.userData);
  console.log("perios al", personal_info);
  const ForUpdate = {
    id: personal_info?._id,
    name: name,
    city: city,
    country: country,
    state: state,
    gender: gender,
    date_of_birth: birthDate,
    profileImage:
      "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
  };

  const UpdateUserDetail = () => {
    dispatch(UPDATE_PERSONAL_DETAIL_BY_ID(ForUpdate));
    if (personal_info) {
      toast.success("update successfully");
    }
  };

  useEffect(() => {
    if (personal_info.name) {
      setCity(personal_info?.city);
      setCountry(personal_info?.country);
      setGender(personal_info?.gender);
      setName(personal_info?.name);
      setBirthDate(personal_info?.date_of_birth);
      setState(personal_info?.state);
    } else {
      setCity("");
      setCountry("");
      setGender("");
      setName("");
      setBirthDate("");
      setState("");
    }
  }, [personal_info]);
  const min = "1970-04-01";
  const max = "2012-04-01";
  return (
    <>
      {!loading ? (
        <form className="form form-label-right">
          <div className="form-group row">
            <div className="col-lg-6">
              <label htmlFor="ProductName">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Name"
              />
            </div>

            <div className="col-lg-6">
              <label htmlFor="ProductName">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                format="mm-dd-yyyy"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                }}
                placeholder="Birth Date"
                min={min}
                max={max}
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-6">
              <label htmlFor="ProductName">City</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                placeholder="City"
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="ProductName">Country</label>
              <input
                type="text"
                className="form-control"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                placeholder="Country"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-6">
              <label htmlFor="ProductName">State</label>
              <input
                type="text"
                className="form-control"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                placeholder="State"
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="ProductName">Gender</label>
              <select
                name="gender"
                id="gender"
                className="form-control"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div style={{ justifyContent: "flex-end" }}></div>
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
export default Personal;
