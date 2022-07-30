/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Grid, IconButton, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { withRouter } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { InputComp, SubCard } from "../../components";
import DoneIcon from "@mui/icons-material/Done";
import { v4 as uuidv4 } from "uuid";
import { AlertProps, caluculateProgress, formatDate } from "../../utils";
import { withAllContexts } from "../../HOCs";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(4),
    borderRadius: "10px",
    boxShadow:
      "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
  },
  add: {
    boxShadow: "0 4px 8px -2px rgb(9 30 66 / 25%), 0 0 1px rgb(9 30 66 / 31%)",
    borderRadius: "15%",
    marginRight: theme.spacing(2),
  },
}));

const ViewTask = (props) => {
  const classes = useStyles();
  const { tasks, setTasks } = props.task;
  const [id, setId] = React.useState(null);
  const [subId, setSubId] = React.useState(null);
  const [specificTask, setSpecificTask] = React.useState(null);
  const [state, setState] = React.useState({
    subTaskName: "",
    editValue: "",
  });

  //to get specific task
  React.useEffect(() => {
    let id = props.match.params.id;
    setId(id);
    let specifictask = tasks.find((task) => task.id === id);
    setSpecificTask(specifictask);
    if (!specifictask) {
      props.history.push(`/404`);
    }
  }, [props.match.params.id]);

  //on Double Click edit specific task
  const onDoubleClick = (subtask) => {
    setSubId(subtask.id);
    setState({
      ...state,
      editValue: subtask.name,
    });
  };

  //on change of input
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //on submit
  const onSubmit = (e) => {
    let subTask = {
      id: uuidv4(),
      name: state.subTaskName,
      completed: false,
    };

    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        if (subId) {
          task.subTasks = task.subTasks.map((subtask) => {
            if (subtask.id === subId) {
              return {
                ...subtask,
                name: state.editValue,
              };
            }
            return subtask;
          });
        } else {
          task.subTasks.push(subTask);
        }
      }
      return task;
    });
    props.alert.setSnack({
      open: true,
      severity: AlertProps.severity.success,
      msg: subId
        ? "SubTask Updated Successfully"
        : "Sub Task Created Successfully",
      vertical: AlertProps.vertical.top,
      horizontal: AlertProps.horizontal.right,
    });
    setTasks(newTasks);
    setSubId(null);
    setState({
      ...state,
      subTaskName: "",
      editValue: "",
    });
  };

  //on status change of sub task
  const onStatusChange = (subTaskId) => {
    let newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.subTasks = task.subTasks.map((subtask) => {
          if (subtask.id === subTaskId) {
            return {
              ...subtask,
              completed: !subtask.completed,
            };
          }
          return subtask;
        });
      }
      return task;
    });
    setTasks(newTasks);

    props.alert.setSnack({
      open: true,
      severity: AlertProps.severity.success,
      msg: "Status updated Successfully",
      vertical: AlertProps.vertical.top,
      horizontal: AlertProps.horizontal.right,
    });
  };
  //onCancel Task
  const onCancel = () => {
    setSubId(null);
    setState({
      ...state,
      subTaskName: "",
      editValue: "",
    });
  };

  //on delete sub task
  const onDeleteSubtask = (subtaskId) => {
    let newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.subTasks = task.subTasks.filter((subtask) => {
          return subtask.id !== subtaskId;
        });
      }
      return task;
    });
    setTasks(newTasks);
    props.alert.setSnack({
      open: true,
      severity: AlertProps.severity.success,
      msg: "Sub Task Deleted Successfully",
      vertical: AlertProps.vertical.top,
      horizontal: AlertProps.horizontal.right,
    });
  };
  return (
    <Card className={classes?.root}>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <Typography variant="h6">{specificTask?.name}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography color="secondary" variant="h6">
            Created By:
            <Typography color="secondary" variant="body2">
              {specificTask?.createBy}
            </Typography>
          </Typography>

          <Typography color="secondary" variant="caption">
            {formatDate(specificTask?.createdAt)}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography color="secondary" variant="h6">
            Create Check List
          </Typography>
        </Grid>

        <Grid item xs={state?.subTaskName.length > 0 ? 8 : 12}>
          <InputComp
            name="subTaskName"
            value={state?.subTaskName}
            onChange={onChange}
            placeholder="Add ToDo Items"
          />
        </Grid>
        <Grid item xs={4}>
          {state?.subTaskName.length > 0 && (
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
        <Grid item xs={12}>
          <SubCard
            subTasks={specificTask?.subTasks}
            subId={subId}
            editValue={state?.editValue}
            onChange={onChange}
            onDoubleClick={onDoubleClick}
            onSubmit={onSubmit}
            progressInfo={caluculateProgress(specificTask?.subTasks)}
            showProgress={specificTask?.subTasks.length > 0}
            onStatusChange={onStatusChange}
            onCancel={onCancel}
            onDeleteSubtask={onDeleteSubtask}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.history.push("/")}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withRouter(withAllContexts(ViewTask));
