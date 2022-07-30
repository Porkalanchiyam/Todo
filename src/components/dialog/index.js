/**
 * @author Porkalanchiyam
 * @email kalanchiyam1@gmail.com
 * @create 30/07/2022
 * @modify 30/07/2022
 * @desc Exporting all the components from /src/components
 */

import * as React from "react";
import Dialog from "@mui/material/Dialog";

import propTypes from "prop-types";

export default function CustomDialog(props) {
  const { open, onClose, children } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {children}
      </Dialog>
    </div>
  );
}

CustomDialog.propTypes = {
  open: propTypes.bool,
  onClose: propTypes.func,
};

CustomDialog.defaultProps = {
  open: false,
  onClose: () => null,
};
