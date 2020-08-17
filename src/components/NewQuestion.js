import React, { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../store/shared";
import { Redirect } from "react-router-dom";

const NewQuestion = ({ addQuestion }) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleOptionOneChange = (event) => {
    setOptionOne(event.target.value);
  };

  const handleOptionTwoChange = (event) => {
    setOptionTwo(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addQuestion(optionOne, optionTwo);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Would You Rather</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <label htmlFor="optionOne">Option One</label>
                  <input
                    type="text"
                    name="optionOne"
                    className="form-control"
                    value={optionOne}
                    onChange={handleOptionOneChange}
                    placeholder="Option One"
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="optionTwo">Option Two</label>
                  <input
                    type="text"
                    name="optionTwo"
                    className="form-control"
                    value={optionTwo}
                    onChange={handleOptionTwoChange}
                    placeholder="Option Two"
                  />
                </div>
                <button
                  className="btn btn-primary"
                  disabled={optionOne === "" || optionTwo === ""}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (optionOne, optionTwo) => {
      dispatch(handleAddQuestion(optionOne, optionTwo));
    },
  };
}

export default connect(null, mapDispatchToProps)(NewQuestion);
