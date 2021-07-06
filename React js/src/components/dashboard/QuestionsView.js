import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import { Router, Switch, Route, Link, withRouter } from "react-router-dom";
import axiosInstance from "../../axios";

import Avatar from "@material-ui/core/Avatar";
const listitem = [
  { question: "kbkhbh", description: "ksdbkgbskgb" },
  { question: "kbkhbh", description: "ksdbkgbskgb" },
];

export default class QuestionsView extends Component {

    state={
        questions:[]
    }
  componentDidMount() {
    axiosInstance
      .get("/questions")
      .then((response) => {
       console.log("list of quesstions",response);

        this.setState({
          questions: response.data,
         
        });
      })
      .catch((err) => {});
  }
  render() {
    return (
      <div>
        <div className="questionsHeadr"> Top Questions</div>
        <Divider inset={true} className="divider" />
        <List>
          {this.state.questions.map((question, index) => {
            console.log("list item ", question);
            return (
              <div>
                <ListItem button component={Link} to="/questions/id">
                  <ListItemText
                    primary={question.question_title}

                    className="questionTitle"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          //  className={classes.inline}
                          color="textPrimary"
                        >
                         
                        </Typography>
                      {question.question_description}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider inset={true} />
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}
