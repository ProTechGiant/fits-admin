import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_USER_DETAIL_BY_ID } from "../../reducers/userReducer";
import Personal from "./Personal";
import Professional from "./Professional";
import User from "./User";

const UserData = () => {
  const { id } = useParams();
  console.log("idddddd", id);
  const dispatch = useDispatch();
  const [key, setKey] = useState("");
  const { personal_info, profession_info, user_info } = useSelector(
    (state) => state.userData
  );

  // ...fetching api...
  const GetUserDetail = () => {
    dispatch(GET_USER_DETAIL_BY_ID(id));
  };
  useEffect(() => {
    GetUserDetail();
  }, []);

  console.log("personal", personal_info);
  console.log("profession_info", profession_info);
  console.log("user_info", user_info);

  return (
    <>
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">
            <div
              class="row "
              style={{
                border: "2px solid #ffff",
                borderRadius: "10px",
              }}
            >
              <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0">
                <h3 className="font-weight-bold">Users Data</h3>
                <h6 className="font-weight-normal mb-3">
                  All registered users listed here
                </h6>
              </div>
            </div>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              {/* ....Tabs..... */}
              <Tab eventKey="Personal" title="Personal">
                <Personal personal={personal_info} />
              </Tab>
              <Tab eventKey="Professional" title="Professional">
                <Professional profession={profession_info} />
              </Tab>
              <Tab eventKey="User" title="User">
                <User user={user_info} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserData;
