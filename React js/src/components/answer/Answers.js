import React, { Component } from "react";
import { withRouter } from "react-router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import axiosInstance from "../../axios";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CommentIcon from "@material-ui/icons/Comment";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

class Answers extends Component {
  state = {
    answerList: [],
    answers: [],
    yourComment: "",
  };

  postAnswer = () => {
    axiosInstance
      .post(
        `/answers`,
        {
          answer: this.state.answer,
          question_id: this.props.match.params.id,
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {})
      .catch((err) => {});
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

  onSubmitComment = (answer_id) => {
    console.log("onsubmit comment", this.state.yourComment);
    axiosInstance
      .post(
        `/comments`,
        {
          answer_id: answer_id,

          message: this.state.yourComment,
          question_id: this.props.match.params.id,
      
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {})
      .catch((err) => {});
  };

  render() {
    console.log("anserws", this.state.answers);
    return (
      <div className="comments">
        <h4> {this.state.answerList.question_title}</h4>
        <p> {this.state.answerList.question_description}</p>
        <h8>{this.state.answers.length} Answers </h8>

        <List>
          {this.state.answers.map((answer, index) => {
            return (
              <div>
                <ListItem key={answer.id}>
                  <ListItemText
                    primary={answer.answer}
                    secondary={
                      <React.Fragment>
                        <div>
                          <TextField
                            placeholder="enter your comment"
                            onChange={(e) => {
                              this.setState({ yourComment: e.target.value });
                            }}
                            variant="outlined"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment>
                                  <IconButton>
                                    <CommentIcon
                                      className="commentbton"
                                      onClick={()=>this.onSubmitComment(answer.id)}
                                    />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                        {answer.comments.map((comment, id) => {
                          return (
                            <ListItemText
                              key={id}
                              primary={comment.message}
                            ></ListItemText>
                          );
                        })}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </div>
            );
          })}
        </List>
        <div className="postAnswerSec">
          <div className="mbot-5">
            <label>Your Answer</label>
          </div>

          <div>
            <TextField
              value={this.state.email_id}
              fullWidth
              multiline
              rows={5}
              placeholder="Email *"
              type="email"
              variant="outlined"
              onChange={(event) => {
                this.setState({ answer: event.target.value });
              }}
            />
          </div>
          <button type="submit" onClick={this.postAnswer} className="loginbtn">
            Post Your Answer
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Answers);
