import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography, Divider, Button, List, ListItem, ListItemText } from '@mui/material';
import useStyle from '../../styles';
import PsychologyIcon from '@mui/icons-material/Psychology';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';

const FrontPage = ({ view }) => {

    const classes = useStyle();

    return (
        <Box className={classes.frontPageContainer}>
            <Paper className={classes.frontPagePaper} elevation={4}>
                <Typography variant='h5' paragraph>Welcome to MY ECONOMY!</Typography>
                <Typography><InfoIcon sx={{ position: 'relative', top: '5px', mr: 0.5 }} />About</Typography>
                <Divider sx={{mb:2}}/>
                <Typography paragraph>
                    This application is meant to be a tool that invidual people can use to keep track of their personal finances.
                    To name a few notable features, there are statistics of your transactions (incomes and outcomes), shared accounts and
                    diverse ways of interacting with you data. Feel free to play around on your findings!
                </Typography>
                <Typography paragraph>
                    This project was made for the Full Stack open -MOOC-Course from Helsinki Open University. Full source code can be found <a href='https://github.com/korvahannu/fullstackopen-lopputyo'>here.</a>
                </Typography>

                <Typography>
                    This application is built using MERN-stack. What that means is this uses a technology stack composed from (M)ongoDB, (E)xpress, (R)eact and (N)ode.js.
                </Typography>
            </Paper>
            <Paper className={classes.frontPagePaper} elevation={4}> 
                <Typography paragraph variant='h5'>Getting started</Typography>

                <Typography><PsychologyIcon sx={{ position: 'relative', top: '5px', mr: 0.5 }} />Steps to financial freedom</Typography>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText>
                            1. Know your money
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            2. Recognize how you spend your money
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            3. Make conscious decisions
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            4. Achieve financial freedom
                        </ListItemText>
                    </ListItem>
                </List>

                <Typography variant='body2' align='center'>
                    This app provides you with the tools you on your way to financial freedom.
                    The tools provided here are not a promise of financial independency. You will need self-control and resilience.
                </Typography>

                <Box sx={{display:'flex', justifyContent:'center', paddingTop:4, mb:8}}>
                    <Button variant='contained' sx={{minWidth:'150px'}} onClick={()=>view.navigate('register', 'prevent-save')}>Register</Button>
                </Box>

                <Divider sx={{mb:2}} />

                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:4, mb:8}}>
                    <Typography variant='subtitle2'>Already a member?</Typography>
                    <Button sx={{minWidth:'150px'}} onClick={()=>view.navigate('login', 'prevent-save')}>Login</Button>
                </Box>

                
                
            </Paper>
            <Paper className={classes.frontPagePaper} elevation={4}>
                <Typography variant='h5' paragraph>Learn from the internet</Typography>
                <Typography><SchoolIcon sx={{ position: 'relative', top: '5px', mr: 0.5 }} />About</Typography>
                <Divider sx={{mb:2}}/>
                <Typography paragraph>
                    While this application provides a tool to keep track of your money; it does NOT teach you how to manage your money.
                    Therefor anyone who is serious about controlling home economy you should read about common practices
                    on how, when and where to spend wisely.
                </Typography>
            </Paper>
        </Box>
    );
};

FrontPage.propTypes = {
    view: PropTypes.object
};

export default FrontPage;