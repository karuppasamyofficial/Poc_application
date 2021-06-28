import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// import "bootstrap/dist/css/bootstrap.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

class UserRegistration extends Component {
  state = {
    phone_numbers: [{ phone_no: "" }],
    gender: "",
  };

  handleInputChange = (index, event) => {
    const phone_numbers = [...this.state.phone_numbers];

    phone_numbers[index].phone_no = event.target.value;

    this.setState({ phone_numbers: phone_numbers });
  };

  handleAddFields = () => {
    const phone_numbers = [...this.state.phone_numbers];
    phone_numbers.push({ firstName: "", lastName: "" });
    this.setState({ phone_numbers });
  };
  handleRemoveFields = (index) => {
    const phone_numbers = [...this.state.phone_numbers];
    phone_numbers.splice(index, 1);
    this.setState({ phone_numbers });
  };

  handleChangeGender = (event) => {
    this.setState({ gender: event.target.value });
  };
  render() {
    console.log("user registration form alues", this.state.gender);

    const { gender } = this.state;
    return (
      <>
        <div className="registrationHeader">Personal Details</div>
        <form>
          <Grid container>
            <Grid item md={3}>
              <TextField
                value={this.state.phone_no}
                //   fullWidth
                label="First Name"
                variant="outlined"
              />
            </Grid>
            <Grid item md={3}>
              <TextField
                value={this.state.phone_no}
                //   fullWidth
                label="Last Name"
                variant="outlined"
              />
            </Grid>
            <Grid item md={3}>
              <TextField
                id="date"
                label="Birthday"
                type="date"
                value={this.state.dob}
                variant="outlined"
                //   defaultValue="2017-05-24"
                //   className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  this.setState({ dob: e.target.value });
                }}
              />
            </Grid>
            <Grid item md={3}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row value={gender} onChange={this.handleChangeGender}>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <div className="registrationHeader">Add Phone Numbers</div>
          <Grid container>
            {this.state.phone_numbers.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
                <Grid item md={6}>
                  <TextField
                    value={this.state.phone_no}
                    //   fullWidth
                    label="Phone Number"
                    variant="outlined"
                    onChange={(event) => this.handleInputChange(index, event)}
                  />
                </Grid>
                <Grid item md={6}>
                  <button
                    type="button"
                    onClick={() => this.handleRemoveFields()}
                  >
                    -
                  </button>
                  <button type="button" onClick={() => this.handleAddFields()}>
                    +
                  </button>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </form>
      </>
    );
  }
}

export default UserRegistration;
