import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Field, reduxForm, FieldArray } from "redux-form";
import { renderTextField } from "../../utils/InputComponents";
import PostQuestionValidation from "../../validation/PostQuestionValidation";
import history from "../../history";
import axiosInstance from "../../axios";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";

class QuestionForm extends Component {
  render() {
    const { handleSubmit, submitQuestion, skillsOptions } = this.props;
return (
      <>
 <form 
        onSubmit={handleSubmit(submitQuestion)}
        >
          <Grid container className="headercontainer">
            <Grid item md={8}  className="marbottom-10">
            <div className="mbot-5">
                  <label>Title</label>
                </div>
              <Field
                name="question_title"
                component={renderTextField}
                placeholder=" Enter the title"
                // label="Last Name"
                fullWidth
              />
            </Grid>

            <Grid item md={8}  className="marbottom-10">
            <div className="mbot-5">
                  <label>Description:</label>
                </div>
              <Field
                name="question_description"
                component={renderTextField}
                placeholder="Description"
                fullWidth
                label="Last Name"
              />
            </Grid>
            <Grid item md={8} className="marbottom-10">
            <div className="mbot-5">
                  <label>Tag:</label>
                </div>
         
              <Autocomplete
        multiple
        id="tags-filled"
        options={skillsOptions.map((option) => option.label)}
       
        onChange={(event, value) => {
          // console.log("onchange value in auto complete",option);
          this.props.change("skill_set", value);
        }}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined"  placeholder="Ex. php" />
        )}
      />
            </Grid>
          </Grid>
          <Grid container className="headercontainer">
            <Grid item md={8}>
              <button type="submit" className="loginbtn">
                Post Question
              </button>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}

export default reduxForm({
  form: "QuestionForm",
  validate:PostQuestionValidation,
})(QuestionForm);