import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Question = ({ question, auth, history }) => {
  const loadQuestionDetails = (e, questionId) => {
    let path = `/questions/` + questionId;
    history.push(path);
  };

  return (
    <div className="card">
      <h5 className="card-header">{question.author} asks:</h5>
      <div className="card-body">
        <div className="card-title">
          <strong>Would You Rather</strong>
        </div>
        <ul className="card-text">
          <li
            className={
              question.optionOne.votes.includes(auth) ? "optionSelected" : ""
            }
          >
            {question.optionOne.text}
          </li>
          <li
            className={
              question.optionTwo.votes.includes(auth) ? "optionSelected" : ""
            }
          >
            {question.optionTwo.text}
          </li>
        </ul>
        <button
          className="btn btn-primary"
          onClick={(e) => loadQuestionDetails(e, question.id)}
        >
          View Poll
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state, { id }) {
  return {
    question: state.questions[id],
    auth: state.authedUser,
  };
}

export default withRouter(connect(mapStateToProps, null)(Question));
