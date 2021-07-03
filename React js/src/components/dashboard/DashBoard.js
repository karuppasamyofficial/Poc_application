import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
// import Link from "@material-ui/core/Link";
import QuestionForm from "./QuestionForm";
import { formValues } from "redux-form";
import axiosInstance from "../../axios";
import QuestionsView from "./QuestionsView";
import Questions from "./Questions";
import history from "../../history";
import UserRegistration from "../user/UserRegistration";
import { Router, Switch, Route, Link, withRouter } from "react-router-dom";
import logo from "../../images/logo-stackoverflow.png";

class DashBoard extends Component {
  render() {
    console.log("state values", this.state.skillsOption);

    const { showForm, skillsOptions } = this.state;
    return (
      <>
        <div className="topbar">
          <div className="itemgrow">
            <img src={logo} className="dashboardlogo" />
          </div>
          {/* <div className="itemgrow">icon</div> */}
          <div className="itemgrow username">
            {/* <div> */}
            username
            {/* </div> */}
          </div>
        </div>
        <div>
          <button onClick={() => history.push("/dashboard/askquestions")}>
            Ask Question
          </button>
          <button onClick={() => history.push("/dashboard/questions")}>
            Questions
          </button>
          <QuestionsView></QuestionsView>
          <Route path="/dashboard/questions" component={QuestionsView} />
          <Route path="/dashboard/askquestions" component={Questions} />
        </div>
      </>
    );
  }
}

export default DashBoard;
