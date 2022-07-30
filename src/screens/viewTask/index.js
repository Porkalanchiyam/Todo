import React from "react";
import ViewTask from "./viewTask";
import { withNavBars } from "./../../HOCs";
import { withRouter } from "react-router-dom";

class ViewTaskParent extends React.Component {
  render() {
    return <ViewTask />;
  }
}

export default withRouter(withNavBars(ViewTaskParent));
