import React, { useEffect, useState } from "react";
import "./App.css";
import { Box, Button, Card, Grid, Input, TextField, Toolbar, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import UsernameForm from "./components/username_form";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100wh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  card: {
    height: "60%",
    width: "60%",
    boxShadow: theme.shadows[24],
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
    transition: "all 1000ms",
  },
  centered: {
    textAlign: "center",
  },
}));
function App() {
  const classes = useStyles();
  const [blur, setBlur] = useState(6);
  const [username, setUsername] = useState<undefined | string>(undefined);
  useEffect(() => {
    setBlur(2);
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.background} style={{ filter: `blur(${blur}px)` }} />
      <Card className={classes.card}>
        <Grid style={{ height: "100%" }} container justify="center" alignItems="center">
          <UsernameForm setParentUsername={setUsername} />
          <Grid container xs={12} alignItems="center" justify="center">
            <Grid xs={12} container alignItems="center" justify="center">
              <Typography variant="h4">Enter a code</Typography>
              <Grid container xs={12} alignItems="center" justify="center">
                <TextField label="Code" />
              </Grid>
              <Grid container xs={12} alignItems="center" justify="center">
                <Button color="primary">Create session</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
export default App;
