import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const AccountDropdown = ({onChangeValue, value}) => {

    const accounts = useSelector( state => state.accounts );

    return (
        <FormControl fullWidth>
            <InputLabel id='new-transaction-account-label'>Account</InputLabel>
            <Select name="account" value={value} defaultValue={''} onChange={onChangeValue} fullWidth label='Account' labelId='new-transaction-account-label'>
                {
                    accounts.map(r => <MenuItem value={r.id} key={r.id}>{r.name}</MenuItem>)
                }
            </Select>
        </FormControl>
    );
};

AccountDropdown.propTypes = {
    onChangeValue: PropTypes.func,
    value: PropTypes.string
};

export default AccountDropdown;