import React from 'react';
import { List, ListItem, Box } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import WorkIcon from '@mui/icons-material/Work';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
// import EqualizerIcon from '@mui/icons-material/Equalizer';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';
import PropTypes from 'prop-types';
import useStyle from '../styles';

const options = [
    {
        label: 'Home',
        value: 'home',
        icon: <HomeIcon />
    },
    {
        label: 'Assesment',
        value: 'assesment',
        icon: <AssessmentIcon />
    },/*
    {
        label: 'Learn',
        value: 'learn',
        icon: <SchoolIcon />
    },*/
    {
        label: 'Transactions',
        value: 'transactions',
        icon: <ReceiptLongIcon />
    },
    {
        label: 'Accounts',
        value: 'accounts',
        icon: <WorkIcon />
    },
    {
        label: 'Categories',
        value: 'categories',
        icon: <CategoryIcon />
    },/*
    {
        label: 'Statistics',
        value: 'statistics',
        icon: <EqualizerIcon />
    },*/
    {
        label: 'About',
        value: 'about',
        icon: <InfoIcon />
    }
];

const SideBar = ({ view }) => {

    const classes = useStyle();

    const handleClick = (value) => {
        view.navigate(value);
    };

    return (
        <Box className={classes.sidebarContainer}>
            <List>
                {options.map(option => (<div key={option.value}>
                    <ListItem

                        sx={
                            view.value === option.value
                                ? {color:'#01579b', backgroundColor:'#eee'}
                                : null
                        }

                        button  value={option.value} onClick={() => handleClick(option.value)}>
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText
                            >
                                {
                                    view.value === option.value
                                    ? <b>{option.label}</b>
                                    : <>{option.label}</>
                                }
                            </ListItemText>
                    </ListItem>
                </div>
                ))}
            </List>
        </Box>
    );
};

SideBar.propTypes = {
    view: PropTypes.object
};

export default SideBar;