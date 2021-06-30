import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo from "../images/logo-stackoverflow.png";
import axiosInstance from "../axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import history from "../history";

class Login extends Component {
  state = {
    email_id: "",
    phone_no: "",
    alert: false,
    errorMessage: null,
  };

  handleChange = (e) => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  onClickLogin = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/login", {
        email_id: this.state.email_id,
      })
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.length === 0) {
          console.log("server error");
          this.setState({ alert: true, errorMessage: "Username is incorrect" });
          history.push("./");
        } else {
          history.push("./DashBoard");
        }
      })
      .catch((err) => {
        console.log("login error", err);
        this.setState({ alert: true, errorMessage: "Internal server error" });
      });
  };
  render() {
    return (
      <div className="form">
        <form>
          <div>
            <img className="logo" src={logo} />
          </div>

          <div>
            <TextField
              value={this.state.email_id}
              fullWidth
              label="Email *"
              variant="outlined"
              onChange={(event) => {
                this.setState({ email_id: event.target.value });
              }}
            />
          </div>
          <div className="or">or</div>
          <div>
            <TextField
              value={this.state.phone_no}
              fullWidth
              label="Phone Number *"
              variant="outlined"
              onChange={(event) => {
                this.setState({ phone_no: event.target.value });
              }}
            />
          </div>
          <button className="loginbtn" onClick={this.onClickLogin}>
            Login
          </button>
          {this.state.alert == true ? (
            <Alert variant="filled" severity="error">
              {this.state.errorMessage}
            </Alert>
          ) : null}

          <div className="signup">
            <Link className="signup" signup>
              {"Don't have an account? Sign Up"}
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
