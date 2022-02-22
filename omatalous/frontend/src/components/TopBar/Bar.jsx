import { AppBar, Container, Typography, Box, Toolbar } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import useStyle from '../styles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ColorSelector from './ColorSelector';
import ProfileIcon from './ProfileIcon';

const Bar = ({ profileIconMenuAnchor, handleOpenProfileIconMenu, handleCloseProfileIconMenu,
    handleProfileIconMenuOptionClick, profileIconMenuOptions, tooltip,
    avatarUrl, setColor, color, handleLogoClick }) => {

    const classes = useStyle();

    return (
        <AppBar position='relative'>
            <Container maxWidth='xxxxl'>
                <Toolbar disableGutters>
                    <Typography variant='h6' component='div' noWrap className={classes.topBarHeader} sx={{'&:hover': { cursor: 'pointer'}}} onClick={handleLogoClick}>
                        <MonetizationOnIcon sx={{ position: 'relative', top: '-2px', width: '36px', height: '36px', mr: 1 }} />MY ECONOMY</Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex' }}>

                    </Box>

                    <ColorSelector color={color} setColor={setColor} />
                    <ProfileIcon 
                                tooltip={tooltip}
                                profileIconMenuOptions={profileIconMenuOptions}
                                profileIconMenuAnchor={profileIconMenuAnchor}
                                handleOpenProfileIconMenu={handleOpenProfileIconMenu}
                                handleCloseProfileIconMenu={handleCloseProfileIconMenu}
                                handleProfileIconMenuOptionClick={handleProfileIconMenuOptionClick}
                                avatarUrl={avatarUrl}/>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

Bar.propTypes = {
    ProfileIcon: PropTypes.func,
    setColor: PropTypes.func,
    color: PropTypes.string,
    handleLogoClick: PropTypes.func,
    profileIconMenuAnchor: PropTypes.object,
    handleOpenProfileIconMenu: PropTypes.func,
    handleCloseProfileIconMenu: PropTypes.func,
    handleProfileIconMenuOptionClick: PropTypes.func,
    profileIconMenuOptions: PropTypes.array,
    tooltip: PropTypes.string,
    avatarUrl: PropTypes.string,
};

export default Bar;