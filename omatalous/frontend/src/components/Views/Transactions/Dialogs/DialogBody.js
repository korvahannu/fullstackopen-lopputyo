import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogActions, Slide, FormControl } from '@mui/material';
import { forwardRef } from 'react';
import useStyles from '../../../styles';
import CheckIcon from '@mui/icons-material/Check';
import NewspaperIcon from '@mui/icons-material/Newspaper';


const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const DialogBody = ({title, titleColor, open, setOpen, addTransaction, children}) => {

    const classes = useStyles();

    return (
        <Dialog classes={{ paper: classes.dialog }} maxWidth='md' fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={() => setOpen(false)}>

            <DialogTitle sx={{ color: titleColor }}><NewspaperIcon /> {title}</DialogTitle>

            <FormControl fullWidth>

                {
                    children
                }

                <DialogActions>

                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant='contained' onClick={() => addTransaction()} endIcon={<CheckIcon />}> Accept</Button>
                    
                </DialogActions>

            </FormControl>

        </Dialog>
    );
};

DialogBody.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    addTransaction: PropTypes.func,
    children: PropTypes.node,
    title: PropTypes.string,
    titleColor: PropTypes.string
};

export default DialogBody;