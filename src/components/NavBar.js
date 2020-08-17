import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React, { Fragment } from "react";
import User from "./User";

const NavBar = ({ authedUser }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary">
      {authedUser && (
        <Fragment>
          <Link className="navbar-brand mb-0 h1" to="/">
            Would You Rather
          </Link>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <Link to="/add" className="nav-link">
                New Question
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/leaderboard">
                LeaderBoard
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mr-auto my-2 my-lg-0">
            <li className="nav-item mr-sm-2">
              <User id={authedUser} />
            </li>
            <li className="nav-item my-2 my-sm-0">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>
          </ul>
        </Fragment>
      )}
    </nav>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps, null)(NavBar));
