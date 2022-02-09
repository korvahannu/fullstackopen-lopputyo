import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, Checkbox, Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, FormControlLabel, Typography } from '@mui/material';
import { forwardRef } from 'react';
import useStyles from '../../../styles';
import useField from '../../../../hooks/useField';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../../reducers/categoriesReducer';

const Transition = forwardRef(
    function Transition(props, ref) {
        return <Slide direction='up' ref={ref} {...props} />;
    }
);

const NewCategory = ({ open, setOpen }) => {
    const classes = useStyles();
    const [type, setType] = useState('income');
    const name = useField('text', 'name');
    const [nameError, setNameError] = useState(false);
    const dispatch = useDispatch();

    const closeWindow = () => {
        name.setValue('');
        setType('income');
        setOpen(false);
    };

    const createNewCategory = async () => {

        if (!name.value) {
            return setNameError(true);
        }

        closeWindow();
        await dispatch(addCategory({name: name.value,
        type}));
    };

    const handleCheckboxChange = (event) => {
        setType(event.target.name);
    };

    return (
        <Dialog classes={{ paper: classes.dialog }} maxWidth='sm' fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={() => closeWindow()}>

            <DialogTitle>Create a new category</DialogTitle>

            <FormControl fullWidth>

                <DialogContent>
                    <TextField error={nameError} onFocus={() => setNameError(false)} label='Category name name' type='text' variant='outlined' fullWidth value={name.value || ''} onChange={name.onChange} />
                    <Box sx={{ height: 32 }} />

                    <FormGroup sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomColor: 'primary.main', borderBottom: '1px solid' }}>
                        <Typography sx={{ mr: 16 }}> Category type: </Typography>
                        <FormControlLabel label='Income' sx={{ mr: 8 }}
                            control={<Checkbox checked={type === 'income'} onChange={handleCheckboxChange} name='income' />} />
                        <FormControlLabel label='Outcome'
                            control={<Checkbox checked={type === 'outcome'} onChange={handleCheckboxChange} name='outcome' />} />
                    </FormGroup>

                </DialogContent>

                <DialogActions>

                    <Button onClick={() => closeWindow()}>Cancel</Button>
                    <Button variant='contained' onClick={() => createNewCategory()} endIcon={<CheckIcon />}> Accept</Button>

                </DialogActions>

            </FormControl>

        </Dialog>
    );
};

NewCategory.propTypes = {
    setOpen: PropTypes.func,
    open: PropTypes.bool
};

export default NewCategory;