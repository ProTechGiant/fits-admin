import { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { UPDATE_PERSONAL_DETAIL_BY_ID } from "../../reducers/userReducer";
import "react-toastify/dist/ReactToastify.css";
const UserData = (props) => {
  const { personal } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("12/06/2050");
  const [state, setState] = useState("");
  const ForUpdate = {
    id,
    name: name,
    city: city,
    country: country,
    state: state,
    gender: gender,
    date_of_birth: birthDate,
  };
  const UpdateUserDetail = () => {
    dispatch(UPDATE_PERSONAL_DETAIL_BY_ID(ForUpdate));
  };
  return (
    <>
      <form className="form form-label-right">
        {/*  Form */}
        <div className="form-group row">
          <div className="col-lg-6">
            <label htmlFor="ProductName">Name</label>
            <input
              type="text"
              className="form-control"
              defaultValue={personal?.name}
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
              value={moment(birthDate).format("yyyy-MM-dd")}
              onChange={(e) => {
                setBirthDate(e.target.value);
              }}
              placeholder="Birth Date"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-6">
            <label htmlFor="ProductName">City</label>
            <input
              type="text"
              className="form-control"
              defaultValue={personal?.city}
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
              defaultValue={personal?.country}
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
              defaultValue={personal?.state}
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
              defaultValue={personal?.gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div style={{ justifyContent: "flex-end" }}></div>
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
