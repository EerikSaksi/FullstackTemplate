import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const USERNAME = gql`
  query($username: String!) {
    user(username: $username) {
      username
    }
  }
`;
const CREATE_USER = gql`
  mutation($username: String!) {
    createUser(input: { user: { username: $username } }) {
      user {
        username
      }
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  transition: {
    transition: "all 1s",
  },
}));
const UsernameForm: React.FC<{ setParentUsername: (arg: string) => void }> = ({ setParentUsername }) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const { data } = useQuery(USERNAME, { variables: { username } });
  const [formOpacity, setFormOpacity] = useState(1);
  const [createUser, { data: mutationData }] = useMutation(CREATE_USER, {
    variables: { username },
    onCompleted: (data) => {
      if (data?.createUser?.user?.username) {
        setParentUsername(data.createUser.user.username);
        setFormOpacity(0);
      }
    },
  });
  return (
    <React.Fragment>
      <div style={{ position: "absolute" }}>
        <Typography variant="h3" style={{ opacity: 1 - formOpacity }} className={classes.transition}>
          Your display name is {mutationData ? mutationData.createUser.user.username : undefined}
        </Typography>
      </div>
      <Grid container justify="center" alignItems="center" direction="row" className={classes.transition} style={{ opacity: formOpacity }}>
        <TextField label="Enter display name" value={username} onChange={({ target }) => setUsername(target.value)} />
        <Grid>
          <Button disabled={data?.user || !username} onClick={() => createUser()}>
            Set username
          </Button>
          {data?.user ? <Typography variant="body1">Username taken</Typography> : undefined}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default UsernameForm;
