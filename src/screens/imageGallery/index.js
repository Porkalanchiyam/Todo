import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { NetworkCall } from "../../networkcall";
import CustomDialog from "../../components/dialog";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  DialogContent,
  Typography,
} from "@mui/material";

export default function TitlebarImageList() {
  // <--------------------- Hooks ------------>
  const [open, setOpen] = React.useState(false);
  const [imageList, setImageList] = React.useState([]);
  const [previewImg, setPreviewImg] = React.useState(null);

  // <--------------------- Life Cycles ------------>

  React.useEffect(() => {
    //api call
    NetworkCall("https://jsonplaceholder.typicode.com/photos", "GET")
      .then((Images) => {
        const filteredImages = Images?.data.splice(0, 20);
        setImageList(filteredImages || []);
      })
      .catch((err) => {
        setImageList([]);
      });
  }, []);

  // <--------------------- handler ------------>
  const handleClose = () => {
    setOpen(false);
    setPreviewImg(null);
  };
  const handleOpen = (img) => {
    setPreviewImg(img);
    setOpen(true);
  };

  // <--------------------- Render ------------>
  return (
    <>
      <ImageList sx={{ width: "80%", mx: "auto" }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Image List</ListSubheader>
        </ImageListItem>
        {imageList.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.url}`}
              srcSet={`${item.url}`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`${item.title}`}
                  onClick={() => handleOpen(item)}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <CustomDialog open={open} onClose={handleClose}>
        <DialogContent>
          <Card sx={{ maxWidth: 500, boxShadow: "none" }}>
            <CardMedia
              component="img"
              height="140"
              image={previewImg?.url}
              alt="green iguana"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {previewImg?.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => handleClose()} size="small">
                Close
              </Button>
            </CardActions>
          </Card>
        </DialogContent>
      </CustomDialog>
    </>
  );
}
