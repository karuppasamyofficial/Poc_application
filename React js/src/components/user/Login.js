import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import logo from "../../images/logo-stackoverflow.png";
import axiosInstance from "../../axios";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import history from "../../history";

class Login extends Component {
  state = {
    email_id: "",
    phone_no: "",
    alert: false,
    errorMessage: null,
    password:""
  };

 

  submitLogin = (payload) => {
    axiosInstance
      .post("/login", payload)
      .then((response) => {
        if (response.data.status ==="failure") {
          this.setState({
            alert: true,
            errorMessage: "Username and password is incorrect",
          });
        } else {
          sessionStorage.setItem("userInfo", response.data.data[0].first_name);
          sessionStorage.setItem("token", response.data.accessToken);


          history.push("/dashboard/questions");
        }
      })
      .catch((err) => {
        this.setState({ alert: true, errorMessage: "something went wrong" });
      });
  };

  onClickLogin = (e) => {
    e.preventDefault();
    if (this.state.email_id != "" && this.state.password!="" || this.state.phone_no != ""  && this.state.password!="") {
      var payload;
      if (this.state.email_id) {
        console.log("email with password");
        if (
          !new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
            this.state.email_id
          )
        ) {
          this.setState({
            alert: true,
            errorMessage: "Please enter a valida email id",
          });
        } else {
          payload = {
            email_id: this.state.email_id,
            password:this.state.password
          };
          this.submitLogin(payload);
        }
      } else {

        console.log("phone number block");
        payload = {
          phone_no: this.state.phone_no,
          password:this.state.password
        };
        this.submitLogin(payload);
      }
    } else {
      this.setState({
        alert: true,
        errorMessage: "Please enter user name and password",
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
          <div className="mbot-5">
          <label>User Name</label>
                </div>
          
          <div>
            <TextField
              value={this.state.email_id}
              fullWidth
            
              placeholder="Email *"
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
            
              placeholder="Phone Number *"
              variant="outlined"
              inputProps={{ maxLength: 10 }}
              onChange={(event) => {
                this.setState({ phone_no: event.target.value });
              }}
            />
          </div>
          <div className="mbot-5 mar-top7px">
          <label>Password:</label>
                </div>
         
          <div>
            <TextField
              value={this.state.password}
              fullWidth
             
              placeholder="Password *"
              variant="outlined"
              type="password"
              onChange={(event) => {
                this.setState({ password: event.target.value });
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
