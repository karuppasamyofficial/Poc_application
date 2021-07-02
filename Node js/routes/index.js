var user = require("./user");
var skill =require("./skill");
const skillSetMapping=require('../models/skillSetMapping');
const question=require('./question');
module.exports = [].concat(user,skill,question);
