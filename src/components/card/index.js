/**
 * @author Porkalanchiyam
 * @email kalanchiyam1@gmail.com
 * @create 30/07/2022
 * @modify 30/07/2022
 * @desc Exporting all the components from /src/components
 */

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, LinearProgress, Tooltip } from "@mui/material";
import propTypes from "prop-types";
import { formatDate, getDefaultProfileImg } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow:
      "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",

    margin: 15,
    "& .MuiAvatar-root": {
      borderRadius: "15%",
    },
    "&:hover": {
      "& .MuiIconButton-root": {
        visibility: "visible",
      },
    },
  },

  date: {
    fontSize: "0.7rem",
  },
  progress: {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#36b37e ",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#ebecf0 ",
    },
  },
}));

export const TaskCard = (props) => {
  const { title, date, onEdit, onView, createBy, progressInfo, showProgress } =
    props;
  const { percentage, text } = progressInfo;
  const classes = useStyles();
  return (
    <Card className={classes?.root} sx={{ maxWidth: 345 }}>
      <CardContent>
        <Grid container>
          <Grid item xs={8}>
            <Typography
              title={title}
              style={{
                maxWidth: "100%",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              variant="body1"
            >
              {title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="secondary" variant="body2" component="h2">
              Created on <br />
              <span className={classes.date}> {formatDate(date)}</span>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={getDefaultProfileImg(createBy)} />
        }
        action={
          <>
            <IconButton
              sx={{ visibility: "hidden" }}
              title="Edit"
              onClick={onEdit}
              aria-label="settings"
            >
              <EditIcon sx={{ width: "20px", height: "20px" }} />
            </IconButton>
            <IconButton
              sx={{ visibility: "hidden" }}
              title="View"
              onClick={onView}
              aria-label="settings"
            >
              <VisibilityIcon sx={{ width: "20px", height: "20px" }} />
            </IconButton>
          </>
        }
        title="Created By"
        subheader={createBy}
      />
      {showProgress && (
        <Tooltip title={text}>
          <LinearProgress
            className={classes.progress}
            variant="buffer"
            value={percentage}
          />
        </Tooltip>
      )}
    </Card>
  );
};

TaskCard.propTypes = {
  onEdit: propTypes.func,
  onView: propTypes.func,
  title: propTypes.string,
  date: propTypes.number,
  createBy: propTypes.string,
  progressInfo: propTypes.object,
  showProgress: propTypes.bool,
};

TaskCard.defaultProps = {
  onEdit: () => {},
  onView: () => {},
  title: "",
  date: 0,
  createBy: "",
  progressInfo: { percentage: 0, text: "" },
  showProgress: false,
};
