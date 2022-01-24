import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogActions, Slide, FormControl } from '@mui/material';
import { forwardRef } from 'react';
import useStyles from '../../../styles';


const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const DialogBody = ({title, titleColor, open, setOpen, addTransaction, children}) => {

    const classes = useStyles();

    return (
        <Dialog classes={{ paper: classes.dialog }} maxWidth='md' fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={() => setOpen(false)}>

            <DialogTitle sx={{ color: titleColor }}>{title}</DialogTitle>

            <FormControl fullWidth>

                {
                    children
                }

                <DialogActions>
                    <Button onClick={() => addTransaction()}>Add</Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
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