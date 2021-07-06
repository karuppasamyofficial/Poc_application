const PostQuestionValidation = (values) => {
  const errors = {};
  var mailformat = /\S+@\S+\.\S+/;
  if (!values.question_title) {
    errors.question_title = "Required";
  }
  if (!values.question_description) {
    errors.question_description = "Required";
  }

  if (!values.skill_set || !values.skill_set.length) {
    errors.skill_set = "Please select atleast one technology";
  }

  return errors;
};

export default PostQuestionValidation;
