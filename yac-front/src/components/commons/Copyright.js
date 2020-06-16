import React from 'react';
import { Typography } from '@material-ui/core';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {`Copyright © YAC ${new Date().getFullYear()} .`}
  </Typography>
);

export default Copyright;
