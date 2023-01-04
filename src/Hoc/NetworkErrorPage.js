import { Alert, AlertIcon, Stack } from "@chakra-ui/react";
import { SignalWifiBad } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const NetworkErrorPage = () => {
  return (
    <div className="bg bg-danger text-light">
      <Stack spacing={3}>
        <Alert status="error">
          <h6>Please check your network connection</h6>
          <p> Your Network have disconnected.</p>
        </Alert>
      </Stack>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center text-center error-page bg-danger">
            <div className="row flex-grow">
              <div className="col-lg-7 mx-auto text-white">
                <div className="row align-items-center d-flex flex-row">
                  <div className="col-lg-6 text-lg-right pr-lg-4">
                    <h1 className="display-1 mb-0">404</h1>
                  </div>
                  <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                    <h2>Opps</h2>
                    <h3 className="font-weight-light">
                      Your Network was disconnected.Please check your network
                      connection
                    </h3>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-12 text-center mt-xl-2">
                    <Link className="text-white font-weight-medium" to="/">
                      <SignalWifiBad />
                    </Link>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-12 mt-xl-2">
                    <p className="text-white font-weight-medium text-center">
                      Copyright &copy; 2022 All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- content-wrapper ends --> */}
        </div>
        {/* <!-- page-body-wrapper ends --> */}
      </div>
    </div>
  );
};

export default NetworkErrorPage;
