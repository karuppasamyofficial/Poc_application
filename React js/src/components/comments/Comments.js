import React, { Component } from "react";
import { withRouter } from "react-router";

import axiosInstance from "../../axios";

class Comments extends Component {
  state = {
    comments: [],
  };
  componentDidMount() {
    axiosInstance
      .get(`/comments/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ comments: response.data[0] });
      })
      .catch((err) => {});
  }
  render() {
    return (
      <div className="comments">
        <h1> {this.state.comments.question_title}</h1>
        <p> {this.state.comments.question_description}</p>
      </div>
    );
  }
}

export default withRouter(Comments);
