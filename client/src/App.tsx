import React from "react";
import "./App.css";
import { Box, Card, Grid, Input, Toolbar, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100wh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  box: {
    height: "60%",
    width: "40%",
    zIndex: 1,
  },
  background: {
    backgroundImage: "url(https://cdn.sixtyandme.com/wp-content/uploads/2018/06/Sixty-and-Me_3-Ways-to-Keep-Having-Fun-in-Your-60s.jpg)",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    maxHeight: "100%",
    backgroundSize: "cover",
    zIndex: -1,
    filter: "blur(6px)",
  },
  centered: {
    textAlign: "center",
  },
}));
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box boxShadow={23} className={classes.box} justifyItems="space-between" alignItems="center" display="flex">
        <Box m="auto">
          <Grid xs={12} alignItems="center" justify="center" direction="row">
            <Typography className={classes.centered} variant="h3">
              Idk fucken project name
            </Typography>
            <Typography className={classes.centered} variant="h4">
              Enter a code
            </Typography>
          </Grid>
          <Grid xs={12} alignItems="center" justify="center">
            <Input placeholder="Code" style={{ textAlign: "center", marginTop: "10%" }} />
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
export default App;
