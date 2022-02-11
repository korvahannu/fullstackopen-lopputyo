import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, Typography, TextField } from '@mui/material';
import { forwardRef } from 'react';
import useStyles from '../../styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Alert from '../../Alert';
import { useSelector} from 'react-redux';
import useField from '../../../hooks/useField';
import { useDispatch } from 'react-redux';
import { logoutAndDeleteUser } from '../../../reducers/userReducer';

const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const EditCategory = ({  open, setOpen }) => {
    const classes = useStyles();
    const [deleteWindow, setDeleteWindow] = useState(false);
    const user = useSelector(state => state.user);
    const confirm = useField('text', 'confirm');
    const [confirmationError, setConfirmationError] = useState(false);
    const dispatch = useDispatch();

    const handleClick = () => {
        if(confirm.value ===
            `I wish to delete my account "${user.username}" and all data related to it.`)
            setDeleteWindow(true);
        else
            setConfirmationError(true);
    };

    if(!user)
        return null;

    const confirmationSentence = `I wish to delete my account "${user.username}" and all data related to it.`;

    const handleUserDeletion = () => {
        dispatch(logoutAndDeleteUser());

        return null;
    };

    return (
        <Dialog classes={{ paper: classes.dialog }} maxWidth='sm' fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={() => setOpen(false)}>

            <DialogTitle>Delete your account</DialogTitle>

            <FormControl fullWidth>

                <DialogContent>
                    <Typography paragraph>By deleting your account you will remove all the information from the mongoDB database this app is using. There is no turning back.</Typography>
                    <Typography paragraph>Please write the following sentence to the textfield to confirm this is what  you want</Typography>
                    <Typography sx={{userSelect:'none'}} color='green'>{confirmationSentence}</Typography>
                    <TextField error={confirmationError} onFocus={()=>setConfirmationError(false)} fullWidth size='small' value={confirm.value} onChange={confirm.onChange} />
                    {confirmationError && <Typography color='error'>Your confirmation sentence does not match!</Typography>}
                    <Box sx={{ height: 32 }} />

                </DialogContent>

                <DialogActions sx={{display:'flex'}}>

                    <Button color='error' onClick={() => handleClick()} startIcon={<DeleteForeverIcon />}> Delete</Button>
                    <Button variant='contained' onClick={()=>setOpen(false)}>Cancel</Button>

                </DialogActions>

            </FormControl>

            <Alert open={deleteWindow} setOpen={setDeleteWindow} titleText='Warning, please read!'
                bodyText='You are about to delete your account and all data referenced to it. Do you wish to proceed?'
                onAccept={()=>handleUserDeletion()} />

        </Dialog>
    );
};

EditCategory.propTypes = {
    setOpen: PropTypes.func,
    open: PropTypes.bool
};

export default EditCategory;