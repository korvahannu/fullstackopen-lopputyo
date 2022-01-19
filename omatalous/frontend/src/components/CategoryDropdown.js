import React from 'react';
import useCategories from '../hooks/useCategories';
import PropTypes from 'prop-types';

const CategoryDropdown = ({onChangeValue}) => {

    const categories = useCategories();

    return (
        <select name="category" onChange={onChangeValue}>
            <option value=''>---</option>
            {
                categories.categories.map(r => <option value={r.id} key={r.id}>{r.name}</option>)
            }
        </select>
    );
};

CategoryDropdown.propTypes = {
    onChangeValue: PropTypes.func
};

export default CategoryDropdown;