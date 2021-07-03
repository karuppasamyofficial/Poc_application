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

  submitLogin = (payload) => {
    axiosInstance
      .post("/login", payload)
      .then((response) => {
        console.log("response", response.data);
        console.log("username is incorrect", response.data.data.length);
        if (response.data.data.length === 0) {
          this.setState({
            alert: true,
            errorMessage: "Username is incorrect",
          });
        } else {
          history.push("/DashBoard");
        }
      })
      .catch((err) => {
        console.log("login error", err);
        this.setState({ alert: true, errorMessage: "something went wrong" });
      });
  };

  onClickLogin = (e) => {
    e.preventDefault();
    if (this.state.email_id != "" || this.state.phone_no != "") {
      var payload;
      if (this.state.email_id) {
        if (
          !new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
            this.state.email_id
          )
        ) {
          this.setState({
            alert: true,
            errorMessage: "Please enter a valida email id",
          });
          console.log("email block");
        } else {
          payload = {
            email_id: this.state.email_id,
          };
          this.submitLogin(payload);
        }
      } else {
        console.log("phone number");
        payload = {
          phone_no: this.state.phone_no,
        };
        this.submitLogin(payload);
      }
    } else {
      this.setState({
        alert: true,
        errorMessage: "Please enter email Id or phone number",
      });
    }
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
              type="email"
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
              inputProps={{ maxLength: 10 }}
              onChange={(event) => {
                this.setState({ phone_no: event.target.value });
              }}
            />
          </div>
          <button
            className="loginbtn"
            type="submit"
            onClick={this.onClickLogin}
          >
            Login
          </button>
          {this.state.alert == true ? (
            <Alert
              variant="filled"
              style={{ marginTop: "11px" }}
              severity="error"
            >
              {this.state.errorMessage}
            </Alert>
          ) : null}

          <div className="signup">
            <Link className="signup" to="./UserRegistration" signup>
              {"Don't have an account? Sign Up"}
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
