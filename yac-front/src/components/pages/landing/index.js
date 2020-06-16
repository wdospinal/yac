import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Container, Button, CssBaseline,
  Grid, Typography, Card, CardMedia,
  CardContent, CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../store/firebase';
import { LOGIN, SINGNUP, CHATROOM } from '../../../constants/routes';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  contentButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4];

const LandingPage = ({ user, history }) => {
  const classes = useStyles();
  useEffect(() => {
    if (user.userUid && firebase.auth().currentUser) {
      history.push(CHATROOM);
    }
  }, [history, user]);
  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.content}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              YAC - YES ANOTHER CHAT
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Chat with friends in different countries and make new ones
            </Typography>
            <div className={classes.contentButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button href={LOGIN} variant="contained" color="primary">
                    LOGIN
                  </Button>
                </Grid>
                <Grid item>
                  <Button href={SINGNUP} variant="outlined" color="primary">
                    SIGN UP
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Speak with friends
                    </Typography>
                    <Typography>
                      <span role="img" aria-label="emojis countries">🇦🇺 🇧🇷 🇨🇴 🇨🇺 🇪🇸</span>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

export default connect(mapStateToProps)(LandingPage);
