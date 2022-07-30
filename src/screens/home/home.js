import React from "react";
import {
  Button,
  Typography,
  Grid,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CustomDialog from "../../components/dialog";
import { InputComp, TaskCard } from "../../components";
import { v4 as uuidv4 } from "uuid";
import { AlertProps, caluculateProgress } from "../../utils";
import { useHistory } from "react-router-dom";
import { withAllContexts } from "../../HOCs";

const useStyles = makeStyles((theme) => ({
  root: {},
  ButtonGrid: {
    display: "flex",
    justifyContent: "flex-end ",
  },
  Grid: {
    padding: theme.spacing(1),
  },
}));

const Home = (props) => {
  // <--------------------- Hooks ------------>
  const history = useHistory();
  const classes = useStyles();
  const { tasks, setTasks } = props.task;
  const [open, setOpen] = React.useState(false);
  const [taskName, setTaskName] = React.useState("");
  const [error, setError] = React.useState(false);
  const [editId, setEditId] = React.useState(null);

  // <--------------------- Handlers ------------>

  const onChange = (e) => {
    setTaskName(e.target.value);
    setError(false);
  };

  const TaskCreation = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if (taskName.length > 0) {
      console.log("Task Name: ", taskName);
      if (editId) {
        const newTasks = tasks.map((task) => {
          if (task.id === editId) {
            return {
              ...task,
              name: taskName,
            };
          }
          return task;
        });
        setTasks(newTasks);
        setEditId(null);
      } else {
        let task = {
          id: uuidv4(),
          name: taskName,
          status: "pending",
          createdAt: Date.now(),
          createBy: "Porkalanchiyam",
          subTasks: [],
        };

        setTasks([...tasks, task]);
      }
      setTaskName("");
      props.alert.setSnack({
        open: true,
        severity: AlertProps.severity.success,
        msg: editId ? "Task Updated Successfully" : "Task Created Successfully",
        vertical: AlertProps.vertical.top,
        horizontal: AlertProps.horizontal.right,
      });
      setOpen(false);
    } else {
      setError(true);
    }
  };

  const onEditTask = (Task) => {
    setTaskName(Task.name);
    setEditId(Task.id);
    setOpen(true);
  };
  const onViewTask = (task) => {
    history.push(`/viewTask/${task.id}`);
  };

  // <--------------------- rendere ------------>
  return (
    <div className={classes.root}>
      <Grid
        className={classes.Grid}
        container
        direction={"row"}
        alignItems="center"
      >
        <Grid item xs={6}>
          <Typography variant="h6">To do</Typography>
        </Grid>
        <Grid className={classes.ButtonGrid} item xs={6}>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={TaskCreation}
          >
            Create Task
          </Button>
        </Grid>
        {tasks.map((task, i) => (
          <Grid key={task.id} item xs={3}>
            <TaskCard
              title={task.name}
              date={task?.createdAt}
              createBy={task?.createBy}
              onEdit={() => onEditTask(task, i)}
              progressInfo={caluculateProgress(task.subTasks)}
              showProgress={task?.subTasks.length > 0}
              onView={() => onViewTask(task)}
            />
          </Grid>
        ))}

        <CustomDialog open={open} onClose={handleClose}>
          <div style={{ width: "500px" }}>
            <DialogTitle>
              {editId ? "Update Task" : "Create New Task"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>Task Name</DialogContentText>
              <InputComp
                value={taskName}
                onChange={onChange}
                name={"taskName"}
                helperText={"Enter Task Name"}
                error={error}
                minRows={2}
                multiline
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
          </div>
        </CustomDialog>
      </Grid>
    </div>
  );
};

export default withAllContexts(Home);
