import React from 'react';
import { Paper, Typography, Divider, ButtonBase } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PropTypes from 'prop-types';

const AccountInfoHolder = ({account, paymentMethods}) => {
    return (
        <ButtonBase>
            <Paper elevation={6} sx={{padding: '32px', minWidth: '256px' }}>
                <Typography variant='h6'><AssignmentIndIcon /> {account.name}</Typography>
                <Typography variant='subtitle2' style={{color:account.balance < 0 ? 'red' : 'green'}}>{account.balance}$</Typography>
                <Divider />

                <Typography variant='overline'>
                {
                    paymentMethods.map(method => {
                        if(method.account.id !== account.id)
                            return null;
                        else
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
    paymentMethods: PropTypes.array
};

export default AccountInfoHolder;
