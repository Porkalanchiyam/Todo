import * as React from "react";
import { TaskContext } from "./";

const TaskProvider = (props) => {
  //gettask from local storage
  const getTaskfromLocalStorage = () => {
    try {
      const oldTask = JSON.parse(localStorage.getItem("tasks"));
      return oldTask || [];
    } catch (error) {
      return [];
    }
  };

  let [tasks, setTask] = React.useState(getTaskfromLocalStorage());

  //setting in the locale Storage
  const setTasks = (value) => {
    localStorage.setItem("tasks", JSON.stringify(value));
    setTask(value);
  };
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {props.children}
    </TaskContext.Provider>
  );
};
export default TaskProvider;
