import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const AccountDropdown = ({label, onChangeValue, value, error, setError}) => {

    const accounts = useSelector( state => state.accounts );

    if(!accounts||accounts.loading||!accounts.accounts)
        return null;

    return (
        <FormControl fullWidth>
            <InputLabel id='new-transaction-account-label'>{label ||'Account'}</InputLabel>
            <Select error={error} onFocus={()=> setError(false)} name="account" value={value} defaultValue={''} onChange={onChangeValue} fullWidth label={label || 'Account'} labelId='new-transaction-account-label'>
                {
                    accounts.accounts.map(r => <MenuItem value={r.id} key={r.id}>{r.name}</MenuItem>)
                }
            </Select>
        </FormControl>
    );
};

AccountDropdown.propTypes = {
    onChangeValue: PropTypes.func,
    value: PropTypes.string,
    error: PropTypes.bool,
    setError: PropTypes.func,
    label: PropTypes.string
};

export default AccountDropdown;