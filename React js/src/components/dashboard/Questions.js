import React, { Component } from "react";
import QuestionForm from "./QuestionForm";
import axiosInstance from "../../axios";

export default class Questions extends Component {
  state = {
    skillsOptions: [],
    skill_names: [],
    showForm: false,
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
    console.log("submitQuestion", formValues);

    const { question_title, question_description, skill_set } = formValues;
    const { skill_names,skillsOptions } = this.state;

    var new_skillSet = [];
    var existing_skillSet = [];
    formValues.skill_set.map((skill, i) => {
      if (!skill_names.includes(skill)) {
        new_skillSet.push({ skill_name: skill });
      } else {

        // var  getSkillId=skillsOptions.filter(()=
        var getSkillId = skillsOptions.filter(skillOption => skillOption.label==skill );
console.log("existing skillset",skillsOptions,getSkillId[0].value,skill);
        existing_skillSet.push(getSkillId[0].value);
      }
    });
    // console.log(
    //   "new_skillSet",
    //   new_skillSet,
    //   question_title,
    //   question_description,
    //   skill_set
    // );
    axiosInstance
      .post("/questions", {
        question_title: question_title,
        question_description: question_description,
        skill_set: existing_skillSet,

        new_skills: new_skillSet,
      })
      .then((response) => {
        console.log("question post sucessfully", response.data);
      })
      .catch((err) => {});
  };
  render() {
    return (
      <div>
     
        <QuestionForm
          submitQuestion={this.submitQuestion}
          skillsOptions={this.state.skillsOptions}
        ></QuestionForm>
      </div>
    );
  }
}
