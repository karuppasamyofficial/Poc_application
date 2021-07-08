import React, { Component } from "react";
import { withRouter } from "react-router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import axiosInstance from "../../axios";

class Answers extends Component {
  state = {
    answerList: [],
    answers: [],
  };
  componentDidMount() {
    axiosInstance
      .get(`/answers/${this.props.match.params.id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.setState({
          answerList: response.data[0],
          answers: response.data[0].answers,
        });
      })
      .catch((err) => {});
  }
  render() {
    return (
      <div className="comments">
        <h1> {this.state.answerList.question_title}</h1>
        <p> {this.state.answerList.question_description}</p>
      </div>
    );
  }
}

export default withRouter(Answers);
