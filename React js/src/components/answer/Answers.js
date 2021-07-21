import React, { Component } from "react";
import { withRouter } from "react-router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import axiosInstance from "../../axios";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import CommentIcon from "@material-ui/icons/Comment";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Divider from "@material-ui/core/Divider";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

class Answers extends Component {
  addCommentMap = {};
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
    this.answersList();
  }
  answersList = () => {
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
  };

  onClickUpVote = () => {
    axiosInstance
      .post(
        `/votes/up`,
        {
          sourceType: "question",
          up_vote: 1,
          question_id: this.props.match.params.id,
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.answersList();
      })
      .catch((err) => {});
  };

  onSubmitComment = (answer_id) => {
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
    console.log("comments-----", this.state.answers.total_question_vote);
    return (
      <div className="comments">
        <h4> {this.state.answerList.question_title}</h4>
        <Divider inset={true} className="divider" />
        <div>
          <div>
            {" "}
            <h8>{this.state.answers.length} Answers </h8>
            <div>
              <ArrowUpwardIcon onClick={this.onClickUpVote}  className="upVote" />
             
              <span className="marleft">
                {this.state.answerList.total_question_vote}
              </span>
              <ArrowDownwardIcon className="marleft" />
              <span className="marleft"></span>
            </div>
          </div>
          <div>
            {" "}
            <p> {this.state.answerList.question_description}</p>
          </div>
        </div>

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
                          <ArrowUpwardIcon />
                          <span className="marleft">
                            {answer.total_answer_vote}
                          </span>
                          <ArrowDownwardIcon className="marleft" />
                          <span className="marleft"></span>
                        </div>
                        <Link
                          className="addComment"
                          onClick={() => (this.addCommentMap[answer.id] = true)}
                        >
                          add comments
                        </Link>

                        {this.addCommentMap[answer.id] ? (
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
                                        onClick={() =>
                                          this.onSubmitComment(answer.id)
                                        }
                                      />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        ) : null}
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
          <div className="postAnswerForm">
            <div className="mbot-5">
              <label>Your Answer</label>
            </div>

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

            <button
              type="submit"
              onClick={this.postAnswer}
              className="loginbtn"
            >
              Post Your Answer
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Answers);
