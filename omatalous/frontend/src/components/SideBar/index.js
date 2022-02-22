import React from 'react';
import { List, ListItem, Box } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import useStyle from '../styles';
import SideBarItems from './SideBarItems';

const SideBar = ({ view }) => {

    const selectedEffect = { color: '#01579b', backgroundColor: '#eee' };
    const classes = useStyle();
    const handleClick = (value) => {
        view.navigate(value);
    };

    return (
        <Box className={classes.sidebarContainer}>
            <List>
                {SideBarItems.map(option => (<div key={option.value}>
                    <ListItem

                        sx={
                            view.value === option.value
                                ? { selectedEffect }
                                : null
                        }

                        button value={option.value} onClick={() => handleClick(option.value)}>
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText
                        >
                            {
                                view.value === option.value
                                    ? <b>{option.label}</b>
                                    : <>{option.label}</>
                            }
                        </ListItemText>
                    </ListItem>
                </div>
                ))}
            </List>
        </Box>
    );
};

SideBar.propTypes = {
    view: PropTypes.object
};

export default SideBar;