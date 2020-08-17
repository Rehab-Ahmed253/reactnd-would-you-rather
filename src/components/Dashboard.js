import React, { useState } from "react";
import Question from "./Question";
import { connect } from "react-redux";

const DashBoard = ({ unansweredQuestions, answeredQuestions }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={activeTab === "1" ? "nav-link active" : "nav-link"}
            onClick={() => {
              toggle("1");
            }}
          >
            Unanswered
          </a>
        </li>
        <li className="nav-item">
          <a
            className={activeTab === "2" ? "nav-link active" : "nav-link"}
            onClick={() => {
              toggle("2");
            }}
          >
            Answered
          </a>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
          className={
            activeTab === "1" ? "tab-pane fade show active" : "tab-pane fade"
          }
        >
          <div className="container">
            <div className="row">
              {unansweredQuestions.map((qid) => (
                <div className="col" key={qid}>
                  <Question id={qid} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={
            activeTab === "2" ? "tab-pane fade show active" : "tab-pane fade"
          }
        >
          <div className="container">
            <div className="row">
              {answeredQuestions.map((qid) => (
                <div className="col" key={qid}>
                  <Question id={qid} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  const answeredQuestions = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  return {
    unansweredQuestions: Object.keys(questions)
      .filter((qid) => !answeredQuestions.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions,
  };
}

export default connect(mapStateToProps)(DashBoard);
