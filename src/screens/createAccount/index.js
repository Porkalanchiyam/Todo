import React from "react";
import { CreateAccount } from "./createAccount";
import { withRouter } from "react-router-dom";

class AccountParent extends React.Component {
  render() {
    return <CreateAccount />;
  }
}

export default withRouter(AccountParent);
