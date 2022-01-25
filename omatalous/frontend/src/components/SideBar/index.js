import React from 'react';
import { List, ListItem, Box } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import WorkIcon from '@mui/icons-material/Work';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const options = [
    {
        label: 'Home',
        value: 'home',
        icon: <HomeIcon />
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
    }
];

const SideBar = ({view, setView}) => {

    const navigate = useNavigate();

    const handleClick = (value) => {
        setView(value);
        navigate(`/${value}`);
    };

    return (
        <Box>
            <List>
                {options.map(option => (
                    <ListItem 
                    
                    sx={{color: view === option.value
                        ? '#3f51b5'
                        : '',
                        textDecoration: view === option.value
                        ? 'underline'
                        : ''
                    }}
                    
                    button key={option.value} value={option.value} onClick={()=>handleClick(option.value)}>
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText primary={option.label} />
                    </ListItem>
                ))}
            </List>
        </Box>
        );
};

SideBar.propTypes = {
    view: PropTypes.string,
    setView: PropTypes.func
};

export default SideBar;