import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import useStyle from '../../styles';
import ByCategories from './ByCategories';
import Overview from './Overview';

const Assesments = () => {

    const classes = useStyle();
    const [view, setView] = useState('overview');
    const selectedBorder = '2px solid black';

    return (
        <Box className={classes.viewContainer}>

            <Button onClick={() => setView('overview')}
                size='small' sx={{ width: '128px', mr: 0.5, border: view === 'overview' && selectedBorder }} variant='contained'>Overview</Button>
            <Button onClick={() => setView('category')}
                size='small' sx={{ width: '128px', mr: 0.5, border: view === 'category' && selectedBorder }} variant='contained'>By Category</Button>

            <Box sx={{height:'16px'}}/>

            {
                view==='category' && <ByCategories />
            }
            {
                view==='overview' && <Overview />
            }

        </Box>
    );
};

export default Assesments;