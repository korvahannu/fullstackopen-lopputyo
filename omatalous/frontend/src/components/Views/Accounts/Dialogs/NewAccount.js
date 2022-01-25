import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, FormControl } from '@mui/material';
import { forwardRef } from 'react';
import useStyles from '../../../styles';
import useField from '../../../../hooks/useField';

const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const NewAccount = ({ open, setOpen }) => {

    const classes = useStyles();
    const name = useField('text', 'name');
    const description = useField('text', 'description');


    return (
        <Dialog classes={{ paper: classes.dialog }} maxWidth='md' fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={() => setOpen(false)}>

            <DialogTitle>Add a new account</DialogTitle>

            <FormControl fullWidth>

                <DialogContent>
                    <TextField label='Account name' type='text' variant='outlined' fullWidth value={name.value || ''} onChange={name.onChange} />
                    <Box sx={{ height: 32 }} />
                    <TextField label='Description' variant='outlined' fullWidth value={description.value || ''} onChange={description.onChange} />
                    <Box sx={{ height: 32 }} />
                    <Divider />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => console.log('unimplemented')}>Add</Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>

            </FormControl>

        </Dialog>
    );
};

NewAccount.propTypes = {
    children: PropTypes.node,
    setOpen: PropTypes.func,
    open: PropTypes.bool
};

export default NewAccount;