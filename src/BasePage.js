import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import ErrorPage from "./modules/Errors/ErrorPage";
import SplashScreen from "./modules/Partials/SplashScreen";
import TransactionDetails from "./pages/Users/stripeInfo/TransactionDetails";

const DashboardPage = lazy(() => import("./pages/dashboard/"));
const ProfilePage = lazy(() => import("./pages/Profile/Profile"));
const ProfileUpdatePage = lazy(() => import("./pages/Profile/ProfileUpdate"));
const Trainer = lazy(() => import("./pages/Users/Trainer"));
const Trainee = lazy(() => import("./pages/Users/Trainee"));
const UserData = lazy(() => import("./pages/Users/UserData"));

export default function BasePage() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/admin/dashboard" />
        }

        <Route exact path="/admin/users/trainee" component={Trainee} />
        <Route exact path="/admin/users/trainer" component={Trainer} />
        <Route exact path="/admin/:role/:id" component={UserData} />
        <Route
          exact
          path="/transaction_history/:type/:create/:cus_id"
          component={TransactionDetails}
        />
        <Route exact path="/admin/profile" component={ProfilePage} />
        <Route exact path="/admin/dashboard" component={DashboardPage} />
        <Route exact path="/admin/Upprofile" component={ProfileUpdatePage} />
        <Route exact path="/error" component={ErrorPage} />

        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
}
