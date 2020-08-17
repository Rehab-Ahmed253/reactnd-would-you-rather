import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { handleInitialData } from "../store/shared";
import Routes from "./Routes";
import NavBar from "./NavBar";

const App = ({ notLoggedIn, handleInitialData }) => {
  useEffect(() => {
    handleInitialData();
  }, []);

  return (
    <Router>
      <div className="container-fluid">
        <NavBar />
        <Routes notLoggedIn={notLoggedIn} />
      </div>
    </Router>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    notLoggedIn: authedUser === null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
