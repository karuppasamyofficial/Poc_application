const UserFormValidation = (values) => {
  const errors = {};
  var mailformat = /\S+@\S+\.\S+/;
  if (!values.first_name) {
    errors.first_name = "Required";
  }
  if (!values.last_name) {
    errors.last_name = "Required";
  }
  if (!values.phone_number || !values.phone_number.length) {
    errors.phone_number = {
      _error: "At least one phone number must be entered",
    };
  } else {
    const phoneNumbersErrors = [];
    values.phone_number.forEach((field, Index) => {
      const phoneNumberErrors = {};
      if (!field.phone_no) {
        phoneNumberErrors.phone_no = "Required";
        phoneNumbersErrors[Index] = phoneNumberErrors;
      }
    });
    if (phoneNumbersErrors.length) {
      errors.phone_number = phoneNumbersErrors;
    }
  }
  if (!values.email || !values.email.length) {
    errors.email = { _error: "At least one email Id must be entered" };
  } else {
    const emailsErrors = [];
    values.email.forEach((field, Index) => {
      const email_idErrors = {};
      if (!field.email_id) {
        email_idErrors.email_id = "Required";
        emailsErrors[Index] = email_idErrors;
      }
    });
    if (emailsErrors.length) {
      errors.email = emailsErrors;
    }
  }
  console.log("user form validation", values.phone_number);
  if (!values.education || !values.education.length) {
    errors.education = { _error: "At least one email Id must be entered" };
  }
  if (!values.gender) {
    errors.gender = "Required";
  }
  if (!values.dob) {
    errors.dob = "Required";
  }

  return errors;
};

export default UserFormValidation;
