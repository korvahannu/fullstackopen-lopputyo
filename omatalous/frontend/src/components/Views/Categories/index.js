import React, { useState } from 'react';
import useStyle from '../../styles';
import { Box, Divider, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import Loading from '../../Loading';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import NewCategory from './Dialogs/NewCategory';
import EditCategory from './Dialogs/EditCategory';

const About = () => {

    const classes = useStyle();
    const categories = useSelector(state => state.categories);
    const [showNewCategoryWindow, setShowNewCategoryWindow] = useState(false);
    const [showEditCategoryWindow, setEditCategoryWindow] = useState(false);
    const [category, setCategory] = useState();

    if (!categories.categories || categories.loading)
        return (
            <Box className={classes.viewContainer}>
                <Loading />
            </Box>
        );

    return (
        <Box className={classes.viewContainer}>

            <NewCategory open={showNewCategoryWindow} setOpen={setShowNewCategoryWindow} />
            <EditCategory category={category} open={showEditCategoryWindow} setOpen={setEditCategoryWindow} />

            <Button onClick={()=>setShowNewCategoryWindow(true)} startIcon={<AddIcon />} variant='contained' color='success' sx={{ mr: 4, mb:2 }}>new category</Button>

            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2}}>
                <Box sx={{ mr: 2, border: '1px solid lightgrey', borderRadius: 1, width: '350px', padding: 2 }}>

                    <Box sx={{ display: 'flex' }}>
                        <Typography variant='body1'>
                            <ArrowDownwardIcon sx={{ position: 'relative', top: '5px', mr: 0.5, color:'red' }} /> Outcome categories
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                    </Box>

                    <Divider sx={{ mb: 2, mt:1 }} />

                    {
                        categories.categories.map(c => {
                            if (c.type === 'outcome')
                                return <Typography onClick={()=>{setCategory(c); setEditCategoryWindow(true);}} variant='body2'  key={c.id} sx={{'&:hover': { cursor: 'pointer', backgroundColor: '#f7f7f7' }}}>
                                    <EditIcon color='secondary' sx={{height:'16px'}} />
                                    {c.name}
                                    </Typography>;
                            return null;
                        })
                    }

                </Box>

                <Box sx={{ mr: 2, border: '1px solid lightgrey', borderRadius: 1, width: '350px', padding: 2 }}>

                    <Box sx={{ display: 'flex' }}>
                        <Typography variant='body1'>
                            <ArrowUpwardIcon sx={{ position: 'relative', top: '5px', mr: 0.5, color:'green' }} /> Income categories
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                    </Box>

                    <Divider sx={{ mb: 2, mt:1 }} />

                    {
                        categories.categories.map(c => {
                            if (c.type === 'income')
                                return <Typography onClick={()=>{setCategory(c); setEditCategoryWindow(true);}} variant='body2' key={c.id} sx={{'&:hover': { cursor: 'pointer', backgroundColor: '#f7f7f7' }}}>
                                    <EditIcon color='secondary' sx={{height:'16px'}} />
                                    {c.name}</Typography>;
                            return null;
                        })
                    }

                </Box>
            </Box>

        </Box >
    );
};

export default About;