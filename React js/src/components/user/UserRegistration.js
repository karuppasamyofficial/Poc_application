import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Field, reduxForm, FieldArray } from "redux-form";
import { renderTextField, renderDateField } from "../../utils/InputComponents";
import UserFormValidation from "../../validation/UserFormValidation";
import history from "../../history";
import axiosInstance from "../../axios";
import Alert from "@material-ui/lab/Alert";

const renderPhoneNumbers = ({
  fields,
  meta: { touched, error, submitFailed },
}) => (
  <Grid container className="headercontainer">
    {(touched || submitFailed) && error && (
      <span className="errormessagecolor">{error}</span>
    )}{" "}
    {fields.length == 0 ? (
      <AddBoxIcon
        type="button"
        className="addIcon"
        onClick={() => fields.push({})}
      ></AddBoxIcon>
    ) : null}
    {fields.map((inputField, index) => (
      <Fragment key={`${inputField}~${index}`}>
        <Grid item md={6} className="itemContainer">
          <Field
            name={`${inputField}.phone_no`}
            component={renderTextField}
            label="Phone Number"
            placeholder="Phone Number"
            inputProps={{ maxLength: 10 }}
          />
        </Grid>
        <Grid item md={6} className="itemContainer">
          <DeleteForeverIcon
            className="removeIcon"
            type="button"
            onClick={() => fields.remove(index)}
          >
            -
          </DeleteForeverIcon>
          <AddBoxIcon
            type="button"
            className="addIcon"
            onClick={() => fields.push({})}
          ></AddBoxIcon>
        </Grid>
      </Fragment>
    ))}
  </Grid>
);

const renderEducation = ({
  fields,
  meta: { touched, error, submitFailed },
}) => (
  <Grid container className="headercontainer">
    {(touched || submitFailed) && error && (
      <span className="errormessagecolor">{error}</span>
    )}{" "}
    {fields.length == 0 ? (
      <AddBoxIcon
        type="button"
        className="addIcon"
        onClick={() => fields.push({})}
      ></AddBoxIcon>
    ) : null}
    {fields.map((inputField, index) => (
      <Fragment key={`${inputField}~${index}`}>
        <Grid item md={3} className="itemContainer">
          <Field
            name={`${inputField}.education_type`}
            component={renderTextField}
            placeholder="Education Type"
          />
        </Grid>
        <Grid item md={3} className="itemContainer">
          <Field
            name={`${inputField}.institution_name`}
            component={renderTextField}
            placeholder="Institution Name"
          />
        </Grid>
        <Grid item md={3} className="itemContainer">
          <Field
            name={`${inputField}.university`}
            component={renderTextField}
            placeholder="University Name"
          />
        </Grid>
        <Grid item md={3} className="itemContainer">
          <DeleteForeverIcon
            className="removeIcon"
            type="button"
            onClick={() => fields.remove(index)}
          >
            -
          </DeleteForeverIcon>
          <AddBoxIcon
            type="button"
            className="addIcon"
            onClick={() => fields.push({})}
          ></AddBoxIcon>
        </Grid>
      </Fragment>
    ))}
  </Grid>
);

const renderEmails = ({ fields, meta: { touched, error, submitFailed } }) => (
  <Grid container className="headercontainer">
    {(touched || submitFailed) && error && (
      <span className="errormessagecolor">{error}</span>
    )}{" "}
    {fields.length == 0 ? (
      <AddBoxIcon
        type="button"
        className="addIcon"
        onClick={() => fields.push({})}
      ></AddBoxIcon>
    ) : null}
    {fields.map((inputField, index) => (
      <Fragment key={`${inputField}~${index}`}>
        <Grid item md={6} className="itemContainer">
          <Field
            name={`${inputField}.email_id`}
            component={renderTextField}
            placeholder="Email Id"
            type="email"
          />
        </Grid>
        <Grid item md={6} className="itemContainer">
          <DeleteForeverIcon
            className="removeIcon"
            type="button"
            onClick={() => fields.remove(index)}
          >
            -
          </DeleteForeverIcon>
          <AddBoxIcon
            type="button"
            className="addIcon"
            onClick={() => fields.push({})}
          ></AddBoxIcon>
        </Grid>
      </Fragment>
    ))}
  </Grid>
);

const renderRadioGroup = ({ meta, input, ...rest }) => (
  <>
    <RadioGroup
      {...input}
      {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
    {meta.touched && meta.error ? (
      <div className="white mbtm-5 errormessagecolor">{meta.error}</div>
    ) : null}
  </>
);
class UserRegistration extends Component {
  state = {
    errorMessage: null,
  };
  onSubmitUserForm = (formvalues) => {
    console.log("onSubmitUserForm", formvalues);

    const {
      OfficeAddtessLine1,
      OfficeAddtessLine2,
      OfficeAddtessLine3,
      OfficeCity,
      OfficeLandmark,
      OfficeState,
      Officepincode,
      ResidentialAddtessLine1,
      ResidentialAddtessLine2,
      ResidentialAddtessLine3,
      ResidentialLandmark,
      ResidentialState,
      ResidentialCity,
      Residentialpincode,
      first_name,
      last_name,
      dob,
      gender,
      email,
      phone_number,
      education,
      password
    } = formvalues;
    axiosInstance
      .post("/users", {
        first_name: first_name,
        last_name,
        last_name,
        dob: dob,
        gender: gender,
        password,
        address: [
          {
            address_type: "office",
            address_line1: ResidentialAddtessLine1,
            address_line2: ResidentialAddtessLine2,
            address_line3: ResidentialAddtessLine3,
            landmark: ResidentialLandmark,
            state: ResidentialState,
            city: ResidentialCity,
            pincode: Residentialpincode,
          },

          {
            address_type: "Residential",
            address_line1: OfficeAddtessLine1,
            address_line2: OfficeAddtessLine2,
            address_line3: OfficeAddtessLine3,
            landmark: OfficeLandmark,
            state: OfficeState,
            city: OfficeCity,
            pincode: Officepincode,
          },
        ],
        email: email,
        phone_number: phone_number,
        education: education,
      })
      .then(function (response) {
        console.log("response", response.data);
        history.push("/");
      })
      .catch((err) => {
        console.log("login error", err);
        this.setState({ alert: true, errorMessage: "Internal server error" });
      });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="registrationContainer">
        <div className="registrationTitle">Sign up</div>
        <div style={{ marginLeft: "25px" }}>
          <div className="registrationHeader">Personal Details</div>
          <form onSubmit={handleSubmit(this.onSubmitUserForm)}>
            <Grid container className="headercontainer">
              <Grid item md={3}>
                <div className="mbot-5">
                  <label>First Name</label>
                </div>

                <Field
                  name="first_name"
                  component={renderTextField}
                  placeholder="First Name"
                  label="First Name"
                />
              </Grid>
              <Grid item md={3}>
                <div className="mbot-5">
                  <label>Last Name</label>
                </div>

                <Field
                  name="last_name"
                  component={renderTextField}
                  placeholder="Last Name"
                  label="Last Name"
                />
              </Grid>

              <Grid item md={3}>
                <div className="mbot-5">
                  <label>DOB</label>
                </div>
                <Field name="dob" component={renderDateField} />
              </Grid>
              <Grid item md={3}>
                <Field name="gender" component={renderRadioGroup}>
                  <div className="mbot-5">
                    <label>Gender</label>
                  </div>

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
                </Field>
              </Grid>
              <Grid item md={3}>
                <div className="mbot-5">
                  <label>Password</label>
                </div>

                <Field
                  name="password"
                  component={renderTextField}
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
              </Grid>
            </Grid>
            <div className="registrationHeader">Add Phone Numbers</div>
            <FieldArray name="phone_number" component={renderPhoneNumbers} />
            <div className="registrationHeader">Add Email Id</div>
            <FieldArray name="email" component={renderEmails} />
            <div className="registrationHeader">Office Address</div>
            <Grid container className="headercontainer">
              <Grid item md={3} className="itemContainer">
                <Field
                  name="OfficeAddtessLine1"
                  component={renderTextField}
                  placeholder="AddressLine1"
                  label="AddressLine1"
                />
              </Grid>
              <Grid item md={3} className="itemContainer">
                <Field
                  name="OfficeAddtessLine2"
                  component={renderTextField}
                  placeholder="AddressLine2"
                  label="AddressLine2"
                />
              </Grid>
              <Grid item md={3} className="itemContainer">
                <Field
                  name="OfficeAddtessLine3"
                  component={renderTextField}
                  placeholder="AddressLine3"
                  label="AddressLine3"
                />
              </Grid>
              <Grid item md={3} className="itemContainer">
                <Field
                  name="OfficeLandmark"
                  component={renderTextField}
                  placeholder="Landmark"
                  label="Landmark"
                />
              </Grid>
              <Grid item md={3} className="itemContainer">
                <Field
                  name="OfficeState"
                  component={renderTextField}
                  placeholder="State"
                  label="State"
                />
              </Grid>
              <Grid item md={3} className="itemContainer">
                <Field
                  name="OfficeCity"
                  component={renderTextField}
                  placeholder="City"
                  label="City"
                />
              </Grid>
              <Grid item md={3} className="itemContainer">
                <Field
                  name="Officepincode"
                  component={renderTextField}
                  placeholder="Pincode"
                  label="Pincode"
                />
              </Grid>
            </Grid>
            <div className="registrationHeader">Residential Address</div>
            <Grid container className="headercontainer">
              <Grid item md={3} className="itemContainer">
                <Field
                  name="ResidentialAddtessLine1"
                  component={renderTextField}
                  placeholder="AddressLine1"
                  label="AddressLine1"
                />
              </Grid>
              <Grid item md={3} className="itemContainer">
                <Field
                  name="ResidentialAddtessLine2"
                  component={renderTextField}
                  placeholder="AddressLine2"
                  label="AddressLine2"
                />
              </Grid>
              <Grid item md={3} className="itemContainer">
                <Field
                  name="ResidentialAddtessLine3"
                  component={renderTextField}
                  placeholder="AddressLine3"
                  label="AddressLine3"
                />
              </Grid>
              <Grid item md={3} className="itemContainer">
                <Field
                  name="ResidentialLandmark"
                  component={renderTextField}
                  placeholder="Landmark"
                  label="Landmark"
                />
              </Grid>
              <Grid item md={3} className="itemContainer">
                <Field
                  name="ResidentialState"
                  component={renderTextField}
                  placeholder="State"
                  label="State"
                />
              </Grid>
              <Grid item md={3} className="itemContainer">
                <Field
                  name="ResidentialCity"
                  component={renderTextField}
                  placeholder="City"
                  label="City"
                />
              </Grid>
              <Grid item md={3} className="itemContainer">
                <Field
                  name="Residentialpincode"
                  component={renderTextField}
                  placeholder="Pincode"
                  label="Pincode"
                />
              </Grid>
            </Grid>

            <div className="registrationHeader">Add Education Details</div>
            <FieldArray name="education" component={renderEducation} />
            {this.state.alert == true ? (
              <Alert variant="filled" severity="error">
                {this.state.errorMessage}
              </Alert>
            ) : null}
            <Grid container>
              <Grid item style={{ marginBottom: "20px" }}>
                <button type="submit" className="loginbtn">
                  Login
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}

UserRegistration = reduxForm({
  form: "userForm",
  validate: UserFormValidation,
  initialValues: {
    phone_number: [{ phone_no: "" }],
    email: [{ email_id: "" }],
    education: [
      {
        education_type: "",
        institution_name: "",
        university: "",
      },
    ],
  },
})(UserRegistration);

export default UserRegistration;
