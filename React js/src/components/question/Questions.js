import React, { Component } from "react";
import QuestionForm from "./QuestionForm";
import axiosInstance from "../../axios";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import history from "../../history";
export default class Questions extends Component {
  state = {
    skillsOptions: [],
    skill_names: [],
  
    open: false,
  };
  componentDidMount() {
    axiosInstance
      .get("/skills")
      .then((response) => {
        var skillsOptions = [];
        var skill_names = [];
        response.data.map((skill, i) => {
          skillsOptions.push({ value: skill.id, label: skill.skill_name });
          skill_names.push(skill.skill_name);
        });

        this.setState({
          skillsOptions: skillsOptions,
          skill_names: skill_names,
        });
      })
      .catch((err) => {});
  }
  submitQuestion = (formValues) => {
    const { question_title, question_description } = formValues;
    const { skill_names, skillsOptions } = this.state;

    var new_skillSet = [];
    var existing_skillSet = [];
    formValues.skill_set.map((skill, i) => {
      if (!skill_names.includes(skill)) {
        new_skillSet.push({ skill_name: skill });
      } else {
        var getSkillId = skillsOptions.filter(
          (skillOption) => skillOption.label == skill
        );

        existing_skillSet.push(getSkillId[0].value);
      }
    });

    axiosInstance
      .post("/questions", {
        question_title: question_title,
        question_description: question_description,
        skill_set: existing_skillSet,
        user_name: sessionStorage.getItem("userInfo"),
        new_skills: new_skillSet,
      })
      .then((response) => {
        this.setState({ open: true });
      })
      .catch((err) => {});
  };

  handleAlertClose = () => {
    this.setState({ open: false });
    history.push("/dashboard/questions");
  };
  render() {
    return (
      <div>
        <QuestionForm
          submitQuestion={this.submitQuestion}
          skillsOptions={this.state.skillsOptions}
        ></QuestionForm>
        <Snackbar
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleAlertClose}
        >
          <Alert
            onClose={this.handleAlertClose}
            variant="filled"
            severity="success"
          >
            sucessfully posted your question
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
