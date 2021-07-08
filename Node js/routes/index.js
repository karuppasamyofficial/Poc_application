var user = require("./user");
var skill =require("./skill");
const skillSetMapping=require('../models/skillSetMapping');
const comment=require('./comment');
const answer=require('./answer');
const question=require('./question');
module.exports = [].concat(user,skill,question,comment,answer);
