import TextField from "@material-ui/core/TextField";
export const renderTextField = (formProps) => {
  const { input, meta, className, inputProps, InputProps, direction } =
    formProps;
  return (
    <>
      <TextField
        {...input}
        type={formProps.type}
        error={meta.touched && meta.error ? true : false}
        placeholder={formProps.placeholder}
        fullWidth={formProps.fullWidth}
        type={formProps.type}
        // fullWidth
        // label={formProps.label}
        name={formProps.name}
        //   disabled={formProps.disabled}
        variant="outlined"
        //   {...formProps.formControlProps}
        //   className={className}
        // InputProps={inputProps}
        inputProps={inputProps}
      />
      {meta.touched && meta.error ? (
        <div className="white mbtm-5 errormessagecolor">{meta.error}</div>
      ) : null}
    </>
  );
};

export const multipleRowTextField = (formProps) => {
  const {
    input,
    meta,

    inputProps,
  } = formProps;
  return (
    <>
      <TextField
        {...input}
        type={formProps.type}
        error={meta.touched && meta.error ? true : false}
        placeholder={formProps.placeholder}
        fullWidth={formProps.fullWidth}
        multiline
        rows={4}
        name={formProps.name}
        variant="outlined"
        inputProps={inputProps}
      />
      {meta.touched && meta.error ? (
        <div className="white mbtm-5 errormessagecolor">{meta.error}</div>
      ) : null}
    </>
  );
};
export const renderDateField = (formProps) => {
  const { input, meta } = formProps;
  return (
    <div>
      <TextField
        {...input}
        type="date"
        error={meta.touched && meta.error ? true : false}
        placeholder={formProps.placeholder}
        name={formProps.name}
        variant="outlined"
      />
      {meta.touched && meta.error ? (
        <div className="white mbtm-5 errormessagecolor">{meta.error}</div>
      ) : null}
    </div>
  );
};
