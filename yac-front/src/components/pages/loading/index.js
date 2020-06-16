import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import Lottie from 'react-lottie';
import animationData from '../../../assets/chat-platform-animation.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loading = () => (
  <Grid container component="main" styles={{ height: '100vh' }}>
    <Box mt={5}>
      <Typography variant="h2" color="textSecondary" align="center">
        YAC CHAT WITH FRIENDS
      </Typography>
      <Typography variant="h4" color="textSecondary" align="center">
        Simple and secure
      </Typography>
    </Box>
    <Lottie
      options={defaultOptions}
      height={500}
      width={500}
    />
  </Grid>
);

export default Loading;
