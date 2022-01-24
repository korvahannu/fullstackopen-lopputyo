import React from 'react';
import useCategories from '../../../../hooks/useCategories';
import PropTypes from 'prop-types';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const CategoryDropdown = ({onChangeValue, value, type}) => {

    const categories = useCategories();

    return (
        <FormControl fullWidth>
            <InputLabel id='new-transaction-category-label'>Category</InputLabel>
            <Select name="category" value={value} defaultValue={''} onChange={onChangeValue} fullWidth label='Category' labelId='new-transaction-category-label'>
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
    type: PropTypes.string
};

export default CategoryDropdown;