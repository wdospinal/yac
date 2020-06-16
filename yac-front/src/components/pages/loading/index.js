import React from 'react';
import { Grid } from '@material-ui/core';
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
    <h1>Lottie</h1>
    <p>Base animation free from external manipulation</p>
    <Lottie
      options={defaultOptions}
      height={400}
      width={400}
    />
  </Grid>
);

export default Loading;
