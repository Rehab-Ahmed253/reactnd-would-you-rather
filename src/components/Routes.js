import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import QuestionDetails from "./QuestionDetails";
import NotFound from "./NotFound";
import Logout from "./Logout";
import NavBar from "./NavBar";

const Routes = ({ notLoggedIn }) => {
  return (
    <div className="container">
      {notLoggedIn ? (
        <Route component={Login} />
      ) : (
        <Fragment>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/leaderboard" exact component={LeaderBoard} />
            <Route path="/add" component={NewQuestion} />
            <Route path="/questions/bad_id" component={NotFound} />
            <Route path="/questions/:id" component={QuestionDetails} />
            <Route exact path="/logout" component={Logout} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      )}
    </div>
  );
};

Routes.propTypes = { notLoggedIn: PropTypes.any };

export default Routes;
