import React from 'react';
import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import useStyle from './styles';

const Loading = () => {

  const classes = useStyle();

  return (
    <Box className={classes.loadingBar}>
      <LinearProgress />
    </Box>
  );
};

export default Loading;