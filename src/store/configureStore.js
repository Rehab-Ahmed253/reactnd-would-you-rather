import { createStore } from "redux";
import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import middleware from "../middleware";

export default function configureStore() {
  const store = createStore(
    combineReducers({
      authedUser,
      users,
      questions,
    }),
    middleware
  );
  return store;
}
