import React from 'react';
import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const Loading = () => (
    <Box sx={{width:'100%'}}>
      <LinearProgress />
    </Box>
);

export default Loading;