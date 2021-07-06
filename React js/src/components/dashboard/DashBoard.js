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
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
class DashBoard extends Component {
  render() {
    return (
      <>
        <div className="topbar">
          <div className="itemgrow">
            <img src={logo} className="dashboardlogo" />
          </div>
          {/* <div className="itemgrow">icon</div> */}
          <div className="itemgrow username">
            {/* <div> */}
            <AccountCircleIcon   className="userIcon"/>
            {sessionStorage.getItem("userInfo")}
            {/* </div> */}
          </div>
        </div>
        <div>
          <Grid container>
            <Grid item md={9}>
              <div className="contentContainer">
                <button
                  className="askQuestnbtn"
                  onClick={() => history.push("/dashboard/askquestions")}
                >
                  Ask Question
                </button>
                
                <Route path="/dashboard/questions" component={QuestionsView} />
                <Route path="/dashboard/askquestions" component={Questions} />
              </div>
            </Grid>
            <Grid item md={3}  style={{marginTop:"30px"}}>
              {/* Filter  By Technology */}
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default DashBoard;
