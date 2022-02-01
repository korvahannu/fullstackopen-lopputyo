import React from 'react';
import { List, ListItem, Box } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import WorkIcon from '@mui/icons-material/Work';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import PropTypes from 'prop-types';
import useStyle from '../styles';

const options = [
    {
        label: 'Home',
        value: 'home',
        icon: <HomeIcon />
    },
    {
        label:'My goals',
        value:'goals',
        icon: <EmojiEventsIcon />
    },
    {
        label:'Learn',
        value:'learn',
        icon: <SchoolIcon />
    },
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
        label:'About us',
        value:'about',
        icon: <InfoIcon />
    }
];

const SideBar = ({view}) => {

    const classes = useStyle();

    const handleClick = (value) => {
        view.navigate(value);
    };

    return (
        <Box className={classes.sidebarContainer}>
            <List>
                {options.map(option => (
                    <ListItem

                    className={
                        view.value === option.value
                        ? classes.sidebarSelected
                        : null
                    }
                    
                    button key={option.value} value={option.value} onClick={()=>handleClick(option.value)}>
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText
                        classes={view.value === option.value ? {primary: classes.sidebarSelectedText} : null} primary={option.label} />
                    </ListItem>
                ))}
            </List>
        </Box>
        );
};

SideBar.propTypes = {
    view: PropTypes.object
};

export default SideBar;