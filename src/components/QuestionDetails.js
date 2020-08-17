import React, { useState } from "react";
import { connect } from "react-redux";
import User from "./User";
import { handleAnswer } from "../store/shared";
import { Redirect } from "react-router-dom";

const QuestionDetails = ({
  saveQuestionAnswer,
  question,
  questionAuthor,
  answer,
  total,
  percOne,
  percTwo,
  bad_id,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  if (bad_id === true) {
    return <Redirect to="/questions/bad_id" />;
  }
  const radioSelected = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveQuestionAnswer(selectedOption);
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md">
          <div className="card w-50 border-primary ">
            <div className="card-header">
              <User id={questionAuthor.id} />
            </div>
            <div className="card-body">
              <div className="card-title">Would You Rather</div>
              {answer ? (
                <div>
                  <form>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          className="form-check-input"
                          checked={answer === "optionOne"}
                          readOnly
                        />{" "}
                        {question.optionOne.text}
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          className="form-check-input"
                          checked={answer === "optionTwo"}
                          readOnly
                        />{" "}
                        {question.optionTwo.text}
                      </label>
                    </div>
                  </form>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: `${percOne}%` }}
                    >{`Option 1 ${percOne}%`}</div>
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: `${percTwo}%` }}
                    >{`Option 2 ${percTwo}%`}</div>
                  </div>
                  <div className="total">Total number of votes: {total}</div>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={selectedOption === "optionOne"}
                          name="radio1"
                          value="optionOne"
                          onChange={radioSelected}
                        />{" "}
                        {question.optionOne.text}
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="radio2"
                          checked={selectedOption === "optionTwo"}
                          value="optionTwo"
                          onChange={radioSelected}
                        />{" "}
                        {question.optionTwo.text}
                      </label>
                    </div>

                    <button
                      className="btn btn-md btn-primary"
                      disabled={selectedOption === ""}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const answers = users[authedUser].answers;
  let answer,
    percOne,
    percTwo,
    questionAuthor,
    total,
    bad_id = false;
  const { id } = match.params;
  const question = questions[id];
  if (question === undefined) {
    bad_id = true;
  } else {
    if (answers.hasOwnProperty(question.id)) {
      answer = answers[question.id];
    }
    questionAuthor = users[question.author];
    total = question.optionOne.votes.length + question.optionTwo.votes.length;
    percOne = financial((question.optionOne.votes.length / total) * 100);
    percTwo = financial((question.optionTwo.votes.length / total) * 100);
  }
  return {
    question,
    questionAuthor,
    answer,
    total,
    percOne,
    percTwo,
    bad_id,
  };
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;

  return {
    saveQuestionAnswer: (answer) => {
      dispatch(handleAnswer(id, answer));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
