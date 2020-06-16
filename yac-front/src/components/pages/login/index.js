import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Avatar, ListItem, ListItemAvatar, ListItemText, Button, CssBaseline, TextField,
  FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined } from '@material-ui/icons';
import {
  SIGN_IN_WITH_EMAIL_AND_PASSWORD, USER_UPDATE, SIGN_IN_WITH_SOCIAL,
} from '../../../constants/actions';
import { SINGNUP, CHATROOM } from '../../../constants/routes';
import firebase from '../../../store/firebase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © YAC ${new Date().getFullYear()} .`}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({
  user, history, changeUserUpdate, email,
  password, rememberMe, loginWithEmail, signInWithSocial,
}) {
  const classes = useStyles();
  useEffect(() => {
    if (user.userUid && firebase.auth().currentUser) {
      history.push(CHATROOM);
    }
  }, [history, user]);
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => changeUserUpdate('email', e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => changeUserUpdate('password', e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              required
              value={rememberMe}
              onChange={(e) => changeUserUpdate('rememberMe', e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => loginWithEmail(email, password)}
            >
              Sign In
            </Button>
            <ListItem button onClick={() => signInWithSocial('GOOGLE')}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: '#eee' }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    height="30"
                    alt="G"
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Sign in with Google" />
            </ListItem>
            <ListItem button onClick={() => signInWithSocial('FACEBOOK')}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: '#eee' }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Facebook_icon_2013.svg"
                    height="30"
                    alt="G"
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Continue with Facebook" />
            </ListItem>
            <Grid container>
              <Grid item xs>
                <Link href={SINGNUP} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={SINGNUP} variant="body2">
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.userState.user,
  email: state.userState.user.email,
  password: state.userState.user.password,
  rememberMe: state.userState.user.rememberMe,
});

const mapDispatchToProps = (dispatch) => ({
  changeUserUpdate: (type, value) => dispatch({ type: USER_UPDATE, payload: { type, value } }),
  loginWithEmail: (email, password) => dispatch(
    { type: SIGN_IN_WITH_EMAIL_AND_PASSWORD, data: { email, password } },
  ),
  signInWithSocial: (provider) => dispatch(
    { type: SIGN_IN_WITH_SOCIAL, data: { provider } },
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
