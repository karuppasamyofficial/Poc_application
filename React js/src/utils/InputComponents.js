import TextField from "@material-ui/core/TextField";
import Select from 'react-select';

import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
export const renderTextField = (formProps) => {
    const {
      input,
      meta,
      className,
      inputProps,
      InputProps,
      direction,
    } = formProps;
    return (
      < >
        <TextField
          {...input}
          type={formProps.type}
          error={meta.touched && meta.error ? true : false}
          placeholder={formProps.placeholder}
          fullWidth={formProps.fullWidth}
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
 
  
  export const renderDateField = (formProps) => {
    const {
      input,
      meta,
      className,
      inputProps,
      InputProps,
      direction,
    } = formProps;
    return (
      < div>
        <TextField
          {...input}
          type="date"
          error={meta.touched && meta.error ? true : false}
          placeholder={formProps.placeholder}
          name={formProps.name}
          // label={formProps.label}
        //   disabled={formProps.disabled}
          variant="outlined"
        //   {...formProps.formControlProps}
        //   className={className}
        //   InputProps={InputProps}
        //   inputProps={inputProps}
        />
        {meta.touched && meta.error ? (
          <div className="white mbtm-5 errormessagecolor">{meta.error}</div>
        ) : null}
      </div>
    );
  };