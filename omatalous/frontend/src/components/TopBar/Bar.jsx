import { AppBar, Container, IconButton, Typography, Box, Tooltip, Avatar, Toolbar, Menu, MenuItem } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const Bar = ({profileIconMenuAnchor, handleOpenProfileIconMenu, handleCloseProfileIconMenu, handleProfileIconMenuOptionClick, profileIconMenuOptions, tooltip}) => (
    <AppBar position='static'>
        <Container maxWidth='xl'>
            <Toolbar disableGutters>
                <Typography variant='h6' component='div' noWrap sr={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>MY ECONOMY</Typography>

                <Box sx={{ flexGrow: 1, display: 'flex' }}>

                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title={tooltip}>
                        <IconButton onClick={handleOpenProfileIconMenu} sx={{ p: 0 }}>
                            <Avatar alt='profile picture' />
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
            </Toolbar>
        </Container>
    </AppBar>
);

Bar.propTypes = {
    profileIconMenuAnchor: PropTypes.object,
    handleOpenProfileIconMenu: PropTypes.func,
    handleCloseProfileIconMenu: PropTypes.func,
    handleProfileIconMenuOptionClick: PropTypes.func,
    profileIconMenuOptions: PropTypes.array,
    tooltip: PropTypes.string
};

export default Bar;