import React from "react";

const NotFound = ({ history }) => (
  <div className="card">
    <div className="card-header">404</div>
    <div className="card-body">
      <div className="card-title">Page Not Found</div>
      <button
        className="btn btn-primary md"
        color="primary"
        onClick={() => history.push("/")}
      >
        Home
      </button>
    </div>
  </div>
);

export default NotFound;
