/**
 * @author Porkalanchiyam
 * @email kalanchiyam1@gmail.com
 * @create 30/07/2022
 * @modify 30/07/2022
 * @desc Exporting all the components from /src/components
 */

import * as React from "react";
import DoneIcon from "@mui/icons-material/Done";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import makeStyles from "@mui/styles/makeStyles";
import {
  Grid,
  LinearProgress,
  Tooltip,
  IconButton,
  Chip,
  Checkbox,
} from "@mui/material";
import propTypes from "prop-types";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { InputComp } from "..";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow:
      "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",

    margin: 15,
    "& .MuiAvatar-root": {
      borderRadius: "15%",
    },
  },

  date: {
    fontSize: "0.7rem",
  },
  add: {
    boxShadow: "0 4px 8px -2px rgb(9 30 66 / 25%), 0 0 1px rgb(9 30 66 / 31%)",
    borderRadius: "15%",
    marginRight: theme.spacing(2),
  },
  progressGrid: {
    marginTop: theme.spacing(1.5),
  },
  textGrid: {
    display: "flex",
    justifyContent: "flex-end",
  },
  progress: {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#36b37e ",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#ebecf0 ",
    },
  },
  subTaskGrid: {
    display: "flex",
    cursor: "pointer",
    border: "1px solid #dfe1e6",
    borderRadius: "10px",
    margin: theme.spacing(1),
    position: "relative",
    "&:hover": {
      "& .MuiIconButton-root": {
        visibility: "visible",
      },
    },
  },
  checkbox: {
    paddingRight: theme.spacing(1),
  },
  grid: {
    position: "relative",
  },
}));

export const SubCard = (props) => {
  const {
    progressInfo,
    showProgress,
    onDoubleClick,
    subId,
    subTasks,
    editValue,
    onChange,
    onSubmit,
    onStatusChange,
    onCancel,
    onDeleteSubtask,
  } = props;

  const { percentage, text } = progressInfo;
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h6">Check List</Typography>
        </Grid>
        {showProgress && (
          <>
            <Grid className={classes.progressGrid} item lg={10} xs={12}>
              <Tooltip title={text}>
                <LinearProgress
                  className={classes.progress}
                  variant="buffer"
                  value={percentage}
                />
              </Tooltip>
            </Grid>
            <Grid className={classes.textGrid} item lg={2} xs={12}>
              <Chip label={text} />
            </Grid>
          </>
        )}

        {subTasks.map((subTask) => (
          <>
            {subId === subTask.id ? (
              <>
                <Grid
                  sx={{ padding: "10px" }}
                  item
                  xs={editValue.length > 0 ? 8 : 12}
                >
                  <InputComp
                    value={editValue}
                    name="editValue"
                    onChange={onChange}
                  />
                </Grid>
                <Grid sx={{ padding: "7px" }} item xs={4}>
                  {editValue.length > 0 && (
                    <>
                      <IconButton className={classes.add} onClick={onSubmit}>
                        <DoneIcon />
                      </IconButton>
                      <IconButton className={classes.add} onClick={onCancel}>
                        <CloseIcon />
                      </IconButton>
                    </>
                  )}
                </Grid>
              </>
            ) : (
              <>
                <Grid className={classes.subTaskGrid} item xs={8}>
                  <Checkbox
                    className={classes.checkbox}
                    color="primary"
                    checked={subTask.completed}
                    onChange={() => onStatusChange(subTask.id)}
                  />
                  <Typography
                    onDoubleClick={() => onDoubleClick(subTask)}
                    variant="body1"
                    color="InfoText"
                    sx={{
                      alignItems: "center",
                      cursor: "pointer",
                      paddingTop: "8px",
                      textDecorationLine: subTask.completed && "line-through",
                      width: "100%",
                    }}
                  >
                    {subTask.name}
                  </Typography>
                  <IconButton
                    sx={(theme) => ({
                      position: "absolute",
                      right: theme.spacing(1),
                      boxShadow:
                        "0 4px 8px -2px rgb(9 30 66 / 25%), 0 0 1px rgb(9 30 66 / 31%)",
                      borderRadius: "15%",
                      padding: theme.spacing(0.5),
                      top: theme.spacing(0.5),
                      visibility: "hidden",
                    })}
                    onClick={() => onDeleteSubtask(subTask.id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Grid>
              </>
            )}
          </>
        ))}
      </Grid>
    </>
  );
};

SubCard.propTypes = {
  progressInfo: propTypes.object,
  showProgress: propTypes.bool,
  onDoubleClick: propTypes.func,
  subId: propTypes.string,
  subTasks: propTypes.array,
  editValue: propTypes.string,
  onChange: propTypes.func,
  onSubmit: propTypes.func,
  onStatusChange: propTypes.func,
  onCancel: propTypes.func,
  onDeleteSubtask: propTypes.func,
};

SubCard.defaultProps = {
  progressInfo: { percentage: 0, text: "" },
  showProgress: false,
  onDoubleClick: () => {},
  subId: "",
  subTasks: [],
  editValue: "",
  onChange: () => {},
  onSubmit: () => {},
  onStatusChange: () => {},
  onCancel: () => {},
  onDeleteSubtask: () => {},
};
