import React from 'react';
import { Paper, Typography, Divider, ButtonBase } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const AccountInfoHolder = ({account, openEditAccountWindow}) => {

    const paymentMethods = useSelector(state => state.paymentMethods.filter(method => {
        if(method.account === null)
            return false;
        if(method.account.id !== account.id)
            return null;
        
        return true;
    }));

    return (
        <ButtonBase onClick={()=>openEditAccountWindow(account)}>
            <Paper elevation={6} sx={{padding: '32px', minWidth: '256px', minHeight:'256px', margin:3 }}>
                <Typography variant='h6'><AssignmentIndIcon /> {account.name}</Typography>
                <Typography variant='subtitle2' style={{color:account.balance < 0 ? 'red' : 'green'}}>{account.balance}$</Typography>
                <Divider />

                <Typography variant='overline'>
                {
                    paymentMethods.map(method => {
                            return <div key={method.id}> {method.name} <br/></div>;
                    })
                }
                </Typography>
            </Paper>
        </ButtonBase>
    );
};

AccountInfoHolder.propTypes = {
    account: PropTypes.object,
    paymentMethods: PropTypes.array,
    openEditAccountWindow: PropTypes.func
};

export default AccountInfoHolder;
