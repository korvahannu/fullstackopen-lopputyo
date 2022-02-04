import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import Bar from './Bar';

const profileIconMenuOptions = [
    'Edit profile',
    'Log out'
];

const TopBar = ({ user , view, setColor}) => {

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
            case 'Edit profile':
                view.navigate('profile');
                break;
            default:
                console.log('unimplemented feature');
        }
    };

    const handleLogout = () => {
        // TODO: Do I need to empty all states when logging out?
        dispatch(logout());
    };

    const tooltip = user
        ? user.name
        : 'Login to view profile';

    const avatarUrl = user
    ? user.avatar || null
    : null;

    return (
        <Bar
            setColor={setColor}
            tooltip={tooltip}
            profileIconMenuOptions={profileIconMenuOptions}
            profileIconMenuAnchor={profileIconMenuAnchor}
            handleOpenProfileIconMenu={handleOpenProfileIconMenu}
            handleCloseProfileIconMenu={handleCloseProfileIconMenu}
            handleProfileIconMenuOptionClick={handleProfileIconMenuOptionClick}
            avatarUrl={avatarUrl}
        />
    );
};

TopBar.propTypes = {
    user: PropTypes.object,
    view: PropTypes.object,
    setColor: PropTypes.func
};

export default TopBar;