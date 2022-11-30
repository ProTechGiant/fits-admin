import { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_USER_DETAIL_BY_ID } from "../../reducers/userReducer";
import Personal from "./Personal";
import Professional from "./Professional";
import Review from "./reviews/Review";
import Services from "./services/Services";
import Session from "./session/Session";
import Stripe from "./stripeInfo/Stripe";
import User from "./User";

const UserData = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { personal_info, profession_info, user_info, services, session } =
    useSelector((state) => state.userData);
  // ...fetching api...
  const GetUserDetail = () => {
    dispatch(GET_USER_DETAIL_BY_ID(id));
  };
  useEffect(() => {
    GetUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0">
                <h3 className="font-weight-bold">Users Data</h3>
                <h6 className="font-weight-normal mb-3">
                  All registered users listed here
                </h6>
              </div>
            </div>
            <Tabs
              id="controlled-tab-example"
              defaultActiveKey="User"
              className="mb-3"
            >
              {/* ....Tabs..... */}
              <Tab eventKey="Personal" title="Personal">
                <Personal />
              </Tab>
              <Tab eventKey="Professional" title="Professional">
                <Professional />
              </Tab>
              <Tab eventKey="User" title="User">
                <User />
              </Tab>
              <Tab eventKey="Services" title="Services">
                <Services />
              </Tab>
              <Tab eventKey="Session" title="Session">
                <Session />
              </Tab>
              <Tab eventKey="Stripe" title="Stripe">
                <Stripe />
              </Tab>
              <Tab eventKey="Review" title="Review">
                <Review />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserData;
