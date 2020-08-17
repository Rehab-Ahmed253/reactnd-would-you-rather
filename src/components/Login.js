import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../store/authedUser";

const Login = ({ authenticate, users }) => {
  const [userId, setUserId] = useState("");

  const handleChangeUser = (event) => {
    setUserId(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userId) {
      authenticate(userId);
    } else {
      alert("Please select a user");
    }
  };
  return (
    <div className="card text-center">
      <div className="card-header">Welcome to the Would You Rather App!</div>
      <div className="card-body">
        <h5 className="card-title">Sign in</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userSelect">Select User</label>
            <select
              className="form-control"
              id="userSelect"
              type="select"
              name="select"
              value={userId}
              onChange={handleChangeUser}
            >
              <option value="" disabled>
                Please select
              </option>
              {Object.keys(users).map((user) => (
                <option key={user} value={user}>
                  {users[user].name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary"
            disabled={userId === ""}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: (id) => {
      dispatch(setAuthedUser(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
