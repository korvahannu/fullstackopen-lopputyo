import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const CategoryDropdown = ({label, onChangeValue, value, type, error, setError}) => {

    const categories = useSelector(state => state.categories);

    return (
        <FormControl fullWidth>
            <InputLabel id='new-transaction-category-label'>{label || 'Category' }</InputLabel>
            <Select error={error} onFocus={()=>setError(false)} name="category" value={value} defaultValue={''} onChange={onChangeValue} fullWidth label={label || 'Category'} labelId='new-transaction-category-label'>
                {
                    categories.categories.map(r => {
                        if(r.type === type)
                            return <MenuItem value={r.id} key={r.id}>{r.name}</MenuItem>;
                        else
                         return null;
                    })
                }
            </Select>
        </FormControl>
    );
};

CategoryDropdown.propTypes = {
    onChangeValue: PropTypes.func,
    value: PropTypes.string,
    type: PropTypes.string,
    error: PropTypes.bool,
    setError: PropTypes.func,
    label: PropTypes.string
};

export default CategoryDropdown;