import React from 'react';
import useAccounts from '../hooks/useAccounts';
import PropTypes from 'prop-types';

const AccountDropdown = ({onChangeValue}) => {

    const accounts = useAccounts();

    return (
        <select name="account" onChange={onChangeValue}>
            <option value=''>---</option>
            {
                accounts.accounts.map(r => <option value={r.id} key={r.id}>{r.name}</option>)
            }
        </select>
    );
};

AccountDropdown.propTypes = {
    onChangeValue: PropTypes.func
};

export default AccountDropdown;