import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Fade, Grid, TextField, Typography } from "@material-ui/core";
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
i;
const CREATE_USER = gql`
  mutation($username: String!) {
    deleteUser(input: { user: { username: $username } }) {
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
  const [deleteUser, { data: deleteData }] = useMutation(CREATE_USER, {
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
      {mutationData && (!deleteData || deleteData.user.username != mutationData.user.username) ? (
        <Fade enter={true} in={true}>
          <Typography variant="h3" className={classes.transition}>
            Your display name is {mutationData ? mutationData.createUser.user.username : undefined}
          </Typography>
          <Button onPress={() => deleteUser()}>Change?</Button>
        </Fade>
      ) : (
        <Fade in={!mutationData}>
          <Grid container justify="center" alignItems="center" direction="row" className={classes.transition}>
            <TextField value={username} onChange={({ target }) => setUsername(target.value)} />
            <Button disabled={data?.user || !username} onClick={() => createUser()}>
              Set display name
            </Button>
          </Grid>
        </Fade>
      )}
    </React.Fragment>
  );
};
export default UsernameForm;
