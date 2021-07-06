import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Field, reduxForm } from "redux-form";
import {
  renderTextField,
  multipleRowTextField,
} from "../../utils/InputComponents";
import PostQuestionValidation from "../../validation/PostQuestionValidation";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";

class QuestionForm extends Component {
  render() {
    const { handleSubmit, submitQuestion, skillsOptions } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(submitQuestion)}>
          <Grid container className="headercontainer">
            <Grid item md={8} className="marbottom-10">
              <div className="mbot-5">
                <label>Title</label>
              </div>
              <Field
                name="question_title"
                component={renderTextField}
                placeholder=" Enter the title"
                fullWidth
              />
            </Grid>

            <Grid item md={8} className="marbottom-10">
              <div className="mbot-5">
                <label>Body</label>
              </div>
              <Field
                name="question_description"
                component={multipleRowTextField}
                placeholder="Description"
                fullWidth
              />
            </Grid>
            <Grid item md={8} className="marbottom-10">
              <div className="mbot-5">
                <label>Tag</label>
              </div>

              <Autocomplete
                multiple
                id="tags-filled"
                options={skillsOptions.map((option) => option.label)}
                onChange={(event, value) => {
                  this.props.change("skill_set", value);
                }}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Ex. php"
                  />
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
      </div>
    );
  }
}

export default reduxForm({
  form: "QuestionForm",
  validate: PostQuestionValidation,
})(QuestionForm);
