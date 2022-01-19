import React from 'react';
import useCategories from '../hooks/useCategories';
import PropTypes from 'prop-types';

const CategoryDropdown = ({onChangeValue}) => {

    const categories = useCategories();

    return (
        <select name="category" onChange={onChangeValue}>
            {
                categories.categories.map(r => <option value={r} key={r}>{r}</option>)
            }
        </select>
    );
};

CategoryDropdown.propTypes = {
    onChangeValue: PropTypes.func
};

export default CategoryDropdown;