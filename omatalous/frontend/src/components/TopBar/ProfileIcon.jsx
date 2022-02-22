import React from 'react';
import { IconButton, Typography, Box, Tooltip, Avatar, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const ProfileIcon = ({ profileIconMenuAnchor, handleOpenProfileIconMenu, handleCloseProfileIconMenu,
    handleProfileIconMenuOptionClick, profileIconMenuOptions, tooltip,
    avatarUrl }) => (
    <Box sx={{ flexGrow: 0 }}>
        <Tooltip title={tooltip}>
            <IconButton onClick={handleOpenProfileIconMenu} sx={{ p: 0 }}>
                <Avatar alt='profile picture' src={avatarUrl} />
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={profileIconMenuAnchor}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(profileIconMenuAnchor)}
            onClose={handleCloseProfileIconMenu}
        >
            {profileIconMenuOptions.map((option) => (
                <MenuItem key={option} data-value={option} onClick={handleProfileIconMenuOptionClick}>
                    <Typography textAlign="center">{option}</Typography>
                </MenuItem>
            ))}
        </Menu>
    </Box>
);

ProfileIcon.propTypes = {
    profileIconMenuAnchor: PropTypes.object,
    handleOpenProfileIconMenu: PropTypes.func,
    handleCloseProfileIconMenu: PropTypes.func,
    handleProfileIconMenuOptionClick: PropTypes.func,
    profileIconMenuOptions: PropTypes.array,
    tooltip: PropTypes.string,
    avatarUrl: PropTypes.string,
};

export default ProfileIcon;