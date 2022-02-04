import { AppBar, Container, IconButton, Typography, Box, Tooltip, Avatar, Toolbar, Menu, MenuItem } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import useStyle from '../styles';
import SavingsIcon from '@mui/icons-material/Savings';

const Bar = ({ profileIconMenuAnchor, handleOpenProfileIconMenu, handleCloseProfileIconMenu,
    handleProfileIconMenuOptionClick, profileIconMenuOptions, tooltip,
    avatarUrl, setColor }) => {

    const classes = useStyle();

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography variant='h6' component='div' noWrap className={classes.topBarHeader}>
                        <SavingsIcon sx={{ paddingTop: 2, width: '32px', height: '32px' }} />MY ECONOMY</Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex' }}>

                    </Box>

                    <Box sx={{display:'flex', flexDirection:'row', '&:hover': {cursor:'pointer'}}}>
                        <Box onClick={()=>setColor('blue')} sx={{ backgroundColor: '#1976d2', width: '20px', height: '20px', borderRadius: '20px', mr: 1, border: '2px solid #fff' }} /> <br />
                        <Box onClick={()=>setColor('green')} sx={{ backgroundColor: '#43a047', width: '20px', height: '20px', borderRadius: '20px', mr: 1, border: '2px solid #fff' }} />
                        <Box onClick={()=>setColor('pink')} sx={{ backgroundColor: '#ab47bc', width: '20px', height: '20px', borderRadius: '20px', mr: 1, border: '2px solid #fff' }} />
                        <Box onClick={()=>setColor('red')} sx={{ backgroundColor: '#e53935', width: '20px', height: '20px', borderRadius: '20px', mr: 1, border: '2px solid #fff' }} />
                    </Box>

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
                </Toolbar>
            </Container>
        </AppBar>
    );
};

Bar.propTypes = {
    profileIconMenuAnchor: PropTypes.object,
    handleOpenProfileIconMenu: PropTypes.func,
    handleCloseProfileIconMenu: PropTypes.func,
    handleProfileIconMenuOptionClick: PropTypes.func,
    profileIconMenuOptions: PropTypes.array,
    tooltip: PropTypes.string,
    avatarUrl: PropTypes.string,
    setColor: PropTypes.func
};

export default Bar;