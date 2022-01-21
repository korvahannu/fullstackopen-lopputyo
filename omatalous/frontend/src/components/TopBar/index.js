import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../../reducers/userReducer';
import { empty } from '../../reducers/transactionsReducer';
import { useDispatch } from 'react-redux';
import Bar from './Bar';

const profileIconMenuOptions = [
    'Edit profile',
    'Log out'
];

const TopBar = ({ user }) => {

    const dispatch = useDispatch();

    const [profileIconMenuAnchor, setProfileIconMenuAnchor] = useState(null);

    const handleOpenProfileIconMenu = (event) => {
        if(user)
            setProfileIconMenuAnchor(event.currentTarget);
    };

    const handleCloseProfileIconMenu = () => {
        setProfileIconMenuAnchor(null);
    };

    const handleProfileIconMenuOptionClick = (event) => {
        setProfileIconMenuAnchor(null);
        switch(event.currentTarget.dataset.value) {
            case 'Log out':
                handleLogout();
                break;
            default:
                console.log('unimplemented feature');
        }
    };

    const handleLogout = () => {
        dispatch(empty());
        dispatch(logout());
    };

    const tooltip = user
        ? user.name
        : 'Login to view profile';

    return (
        <Bar
            tooltip={tooltip}
            profileIconMenuOptions={profileIconMenuOptions}
            profileIconMenuAnchor={profileIconMenuAnchor}
            handleOpenProfileIconMenu={handleOpenProfileIconMenu}
            handleCloseProfileIconMenu={handleCloseProfileIconMenu}
            handleProfileIconMenuOptionClick={handleProfileIconMenuOptionClick}
        />
    );
};

TopBar.propTypes = {
    user: PropTypes.object
};

export default TopBar;