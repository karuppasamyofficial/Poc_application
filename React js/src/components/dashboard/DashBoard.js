import React, { Component, Fragment } from "react";
import QuestionsView from "../question/QuestionsView";
import Questions from "../question/Questions";
import history from "../../history";
import { Route } from "react-router-dom";
import logo from "../../images/logo-stackoverflow.png";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Answers from "../answer/Answers";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import SearchIcon from '@material-ui/icons/Search';
const styles = (theme) => ({
  materialinput: {
    "& .MuiOutlinedInput-input": {
      padding: "11.5px 9px",
    },
   
  },
});
class DashBoard extends Component {
  onClickLogout = () => {
    sessionStorage.clear();
    history.push("/");
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className="topbar">
          <div className="itemgrow">
            <img src={logo} className="dashboardlogo" />
          </div>

          <div className="itemgrow">
            <div  className="homeIcon">
          <HomeIcon  style={{fontSize:"44px"}}></HomeIcon>
          </div>
          </div>
          <div className="itemgrow4">
            <div>
          <TextField
  placeholder="Search"
onChange={(e)=>{this.setState({yourComment:e.target.value})}}
  variant="outlined"
  fullWidth
  className={classes.materialinput}
  InputProps={{
    endAdornment: (
      <InputAdornment  position="end">
        <IconButton>
          <SearchIcon  className="commentbton" onClick={this.onSubmitComment} />
        </IconButton>
      </InputAdornment>
    )
  }}
/>
</div>
          </div>

          <div className="itemgrow">
            <div className="askbtnWrapper">
              <button
                className="askQuestnbtn"
                onClick={() => history.push("/dashboard/askquestions")}
              >
                Ask Question
              </button>{" "}
            </div>{" "}
          </div>
          <div className="itemgrow username">
            <AccountCircleIcon className="userIcon" />
            {sessionStorage.getItem("userInfo")}
            <ExitToAppIcon
              className="userIcon logout"
              onClick={this.onClickLogout}
            ></ExitToAppIcon>
          </div>
        </div>
        <div>
          <div className="contentContainer">
            <Grid container>
              <Grid item md={9}>
                <div>
                  {/* <div>
                    <button
                      className="askQuestnbtn"
                      onClick={() => history.push("/dashboard/askquestions")}
                    >
                      Ask Question
                    </button>
                  </div> */}
                  <div>
                    <Route
                      path="/dashboard/questions"
                      component={QuestionsView}
                    />
                    <Route
                      path="/dashboard/askquestions"
                      component={Questions}
                    />

                    <Route exact path="/dashboard/answers">
                      <Answers />
                    </Route>
                    <Route path={`/dashboard/answers/:id`}>
                      <Answers />
                    </Route>
                  </div>
                </div>
              </Grid>
              <Grid item md={3} style={{ marginTop: "30px" }}></Grid>
            </Grid>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DashBoard);
