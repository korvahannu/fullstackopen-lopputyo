import React from 'react';
import { Paper, Typography, Divider, ButtonBase, CircularProgress } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useStyle from '../../styles';

const AccountInfoHolder = ({ account, openEditAccountWindow }) => {

    const classes = useStyle();

    const paymentMethods = useSelector(state => {
        if (!state.paymentMethods.paymentMethods)
            return { loading: true, paymentMethods: null };

        return {
            loading: state.paymentMethods.loading,
            paymentMethods: state.paymentMethods.paymentMethods.filter(method => {
                if (method.account === null)
                    return false;
                if (method.account.id !== account.id)
                    return false;

                return true;
            })
        };
    });

    return (
        <ButtonBase onClick={() => openEditAccountWindow(account)}>
            <Paper elevation={6} className={classes.accountInfoContainer}>
                <Typography variant='h6'><AssignmentIndIcon /> {account.name}</Typography>
                <Typography variant='subtitle2' style={{ color: account.balance < 0 ? 'red' : 'green' }}>{account.balance} €</Typography>
                <Divider />

                {
                    paymentMethods.loading
                        ? <CircularProgress sx={{ marginTop: '32px' }} />
                        : <Typography variant='overline'>
                            {
                                paymentMethods.paymentMethods.map(method => {
                                    return <div key={method.id}> {method.name} <br /></div>;
                                })
                            }
                        </Typography>
                }

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
