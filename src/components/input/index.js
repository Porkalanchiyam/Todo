/**
 * @author Porkalanchiyam
 * @email kalanchiyam1@gmail.com
 * @create 30/07/2022
 * @modify 30/07/2022
 * @desc Exporting all the components from /src/components
 */

import React from "react";
import { TextField, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import propTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export const InputComp = (props) => {
  const classes = useStyles();
  const {
    disabled,
    onChange,
    error,
    value,
    id,
    top_title,
    requireStart,
    InputProps,
    parent_id,
    name,
    helperText,
    minRows,
    placeholder,
    multiline,
    type,
  } = props;
  return (
    <React.Fragment>
      {top_title && (
        <Typography
          id={`${parent_id}-${top_title.replaceAll(" ", "-")}_typography`}
          variant="caption"
          className={classes.root}
        >
          {top_title}
          {requireStart && (
            <span
              style={{
                color: "red",
                marginLeft: 5,
              }}
            >
              *
            </span>
          )}
        </Typography>
      )}
      <TextField
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        variant="outlined"
        size="small"
        InputProps={InputProps}
        disabled={disabled}
        error={error}
        minRows={minRows}
        helperText={error && helperText}
        multiline={multiline}
        autoComplete="off"
        autoFocus={true}
        type={type}
      />
    </React.Fragment>
  );
};

InputComp.propTypes = {
  disabled: propTypes.bool,
  onChange: propTypes.func,
  error: propTypes.bool,
  value: propTypes.string,
  id: propTypes.string,
  top_title: propTypes.string,
  requireStart: propTypes.bool,
  InputProps: propTypes.object,
  parent_id: propTypes.string,
  name: propTypes.string,
  helperText: propTypes.string,
  placeholder: propTypes.string,
  minRows: propTypes.number,
  multiline: propTypes.bool,
  type: propTypes.string,
};

InputComp.defaultProps = {
  disabled: false,
  onChange: () => {},
  error: false,
  value: "",
  id: "",
  top_title: "",
  requireStart: false,
  InputProps: {},
  parent_id: "",
  name: "",
  helperText: "",
  placeholder: "",
  minRows: 1,
  multiline: false,
  type: "text",
};
