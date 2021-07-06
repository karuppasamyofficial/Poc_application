import React, { Component } from "react";
import QuestionsView from "../question/QuestionsView";
import Questions from "../question/Questions";
import history from "../../history";
import { Route } from "react-router-dom";
import logo from "../../images/logo-stackoverflow.png";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Comments from "../comments/Comments";
class DashBoard extends Component {
  render() {
    return (
      <>
        <div className="topbar">
          <div className="itemgrow">
            <img src={logo} className="dashboardlogo" />
          </div>

          <div className="itemgrow username">
            <AccountCircleIcon className="userIcon" />
            {sessionStorage.getItem("userInfo")}
          </div>
        </div>
        <div>
          <Grid container>
            <Grid item md={9}>
              <div className="contentContainer">
                <div>
                  <button
                    className="askQuestnbtn"
                    onClick={() => history.push("/dashboard/askquestions")}
                  >
                    Ask Question
                  </button>
                </div>
                <div>
                  <Route
                    path="/dashboard/questions"
                    component={QuestionsView}
                  />
                  <Route path="/dashboard/askquestions" component={Questions} />

                  <Route exact path="/dashboard/comments">
                    <Comments />
                  </Route>
                  <Route path={`/dashboard/comments/:id`}>
                    <Comments />
                  </Route>
                </div>
              </div>
            </Grid>
            <Grid item md={3} style={{ marginTop: "30px" }}></Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default DashBoard;
