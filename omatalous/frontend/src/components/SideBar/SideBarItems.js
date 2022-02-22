import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import WorkIcon from '@mui/icons-material/Work';
import InfoIcon from '@mui/icons-material/Info';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';

const SideBarItems = [
    {
        label: 'Home',
        value: 'home',
        icon: <HomeIcon />
    },
    {
        label: 'Assesment',
        value: 'assesment',
        icon: <AssessmentIcon />
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
        label: 'Categories',
        value: 'categories',
        icon: <CategoryIcon />
    },
    {
        label: 'About',
        value: 'about',
        icon: <InfoIcon />
    }
];

export default SideBarItems;