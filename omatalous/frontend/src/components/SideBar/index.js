import React from 'react';
import { List, ListItem, Box } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import WorkIcon from '@mui/icons-material/Work';

const options = [
    {
        label:'Home',
        value:'home',
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

const SideBar = () => (
    <Box>
        <List>
            {options.map(option => (
                <ListItem button key={option.value}>
                    <ListItemIcon>
                        {option.icon}
                    </ListItemIcon>
                    <ListItemText primary={option.label} />
                </ListItem>
            ))}
        </List>
    </Box>
);

export default SideBar;