var user = require("./user");
var skill =require("./skill");
const skillSetMapping=require('../models/skillSetMapping');
const QuestionVote=require('../models/questionVote');
const AnswerVote=require('../models/answerVote');
const vote=require('./vote');

const comment=require('./comment');
const answer=require('./answer');
const question=require('./question');
module.exports = [].concat(user,skill,question,answer,comment,vote);
