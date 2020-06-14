import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';
import {
  AppBar, Toolbar, Typography, Button, IconButton,
} from '@material-ui/core';
import { CHATROOM, LOGIN } from '../../../constants/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation({ title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit" href={CHATROOM}>Chatroom</Button>
          <Button color="inherit" href={LOGIN}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
