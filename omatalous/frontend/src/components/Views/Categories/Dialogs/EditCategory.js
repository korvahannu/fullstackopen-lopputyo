import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from '@mui/material';
import { forwardRef } from 'react';
import useStyles from '../../../styles';
import useField from '../../../../hooks/useField';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Alert from '../../../Alert';
import { useDispatch } from 'react-redux';
import { deleteCategory, editCategory } from '../../../../reducers/categoriesReducer';
import { loadTransactions } from '../../../../reducers/transactionsReducer';

const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const EditCategory = ({ category, open, setOpen }) => {
    const classes = useStyles();
    const name = useField('text', 'name');
    const [nameError, setNameError] = useState(false);
    const [deleteWindow, setDeleteWindow] = useState(false);
    const [editWindow, setEditWindow] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=> {
        category && name.setValue(category.name);
    }, [category]);


    const finishDelete = async () => {
        setOpen(false);
        await dispatch(deleteCategory(category.id));
        await dispatch(loadTransactions());
    };

    const finishEdit =  async () => {
        setOpen(false);
        await dispatch(editCategory(category.id, {
            name: name.value,
        }));
        await dispatch(loadTransactions());
        
    };

    return (
        <Dialog classes={{ paper: classes.dialog }} maxWidth='sm' fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={() => setOpen(false)}>

            <DialogTitle>Edit category</DialogTitle>

            <FormControl fullWidth>

                <DialogContent>
                    <TextField error={nameError} onFocus={()=>setNameError(false)} label='Category name name' type='text' variant='outlined' fullWidth value={name.value || ''} onChange={name.onChange} />
                    <Box sx={{ height: 32 }} />

                </DialogContent>

                <DialogActions sx={{display:'flex'}}>

                    <Button color='error' onClick={() => setDeleteWindow(true)} startIcon={<DeleteForeverIcon />}> Delete</Button>
                    <Box sx={{flexGrow:1}}/>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant='contained' onClick={() => setEditWindow(true)} startIcon={<CheckIcon />}> Accept</Button>

                </DialogActions>

            </FormControl>

            <Alert open={deleteWindow} setOpen={setDeleteWindow} titleText='Warning, please read!'
                bodyText='Deleting a category is permanent and it can not be undone. Proceed with care!'
                onAccept={finishDelete} />
            
            <Alert open={editWindow} setOpen={setEditWindow} titleText='Warning, please read!'
                bodyText='Changes you have done may affect your existing transactions. Proceed with care!'
                onAccept={finishEdit} />

        </Dialog>
    );
};

EditCategory.propTypes = {
    category: PropTypes.object,
    setOpen: PropTypes.func,
    open: PropTypes.bool
};

export default EditCategory;