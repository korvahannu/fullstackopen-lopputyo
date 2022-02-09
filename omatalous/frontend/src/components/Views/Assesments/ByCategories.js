import React, { useState } from 'react';
import { Box, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import Loading from '../../Loading';

const ByCategories = () => {

    const transactions = useSelector(state => state.transactions);
    const categories = useSelector(state => state.categories);
    const [filter, setFilter] = useState('thismonth');

    if (!categories || categories.loading || !categories.categories
        || !transactions || transactions.loading || !transactions.transactions)
        return <Loading />;

    const date = new Date();
    const currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const sixMonthsAgo = new Date(date.getFullYear(), date.getMonth() - 6, 1);
    const yearAgo = new Date(date.getFullYear() - 1, date.getMonth(), 1);
    const twoYearsAgo = new Date(date.getFullYear() - 2, date.getMonth(), 1);

    categories.categories.forEach(category => {
        if (!isNaN(category.incomes) || !isNaN(category.outcomes)) {
            console.log('error, it is ' + category.incomes);
            category.incomes = 0;
            category.outcomes = 0;
        }
    });

    categories.categories.forEach(category => {
        transactions.transactions.filter(transaction => {
        
            switch (filter) {
                case 'thismonth':
                    return new Date(transaction.date) >= currentMonth;
                case 'lasttwomonths':
                    return new Date(transaction.date) >= lastMonth;
                case 'lastsixmonths':
                    return new Date(transaction.date) >= sixMonthsAgo;
                case 'lastyear':
                    return new Date(transaction.date) >= yearAgo;
                case 'lasttwoyears':
                    return new Date(transaction.date) >= twoYearsAgo;
                default:
                    return true;
            }
        })
        .forEach(transaction => {
            if (category.id === transaction.category._id) {
                category.date = transaction.date;

                if (isNaN(category.incomes) || isNaN(category.outcomes)) {
                    console.log('error, it is ' + category.incomes);
                    category.incomes = 0;
                    category.outcomes = 0;
                }

                if (transaction.type === 'income') {
                    console.log('original income ' + category.incomes);
                    category.incomes += transaction.amount;
                    console.log('updated income ' + category.incomes);
                }
                else {
                    console.log('original outcome ' + category.outcomes);
                    category.outcomes += transaction.amount;
                    console.log('updated outcome ' + category.outcomes);
                }
            }
        });
    });

    return (
        <Box sx={{ mt: 2, mr: 2, border: '1px solid lightgrey', borderRadius: 1, width: '700px', padding: 2, }}>

            <Box sx={{ display: 'flex' }}>
                <Typography variant='h6'>
                    Transactions per category
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Select size='small' variant='standard' sx={{ minWidth: '200px' }}
                    value={filter} onChange={(event) => setFilter(event.target.value)}>
                    <MenuItem value={'thismonth'}>This month</MenuItem>
                    <MenuItem value={'lasttwomonths'}>Last two months</MenuItem>
                    <MenuItem value={'lastsixmonths'}>Last six months</MenuItem>
                    <MenuItem value={'lastyear'}>Last year</MenuItem>
                    <MenuItem value={'lasttwoyears'}>Last two years</MenuItem>
                    <MenuItem value={'alltime'}>All time</MenuItem>
                </Select>
            </Box>

            <Divider sx={{ mb: 1, mt: 1 }} />

            <Typography color='green' variant='overline' sx={{ ml: 2, mt: 2 }}>Incomes</Typography>

            <TableContainer component={Paper}>
                <Table aria-label='by-category-table'>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'secondary.main' }}>
                            <TableCell>Category</TableCell>
                            <TableCell align='right'>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ background: 'linear-gradient(0deg, rgba(255,255,255,1) 51%, rgba(215,251,219,1) 100%)' }}>

                        {
                             categories.categories.filter(c => c.type === 'income' && c.incomes)
                                .sort((a, b) => b.incomes - a.incomes)
                                .map(c => {
                                    return (
                                        <TableRow key={c.id}>
                                            <TableCell>{c.name}</TableCell>
                                            <TableCell align='right'>{c.incomes} €</TableCell>
                                        </TableRow>
                                    );
                                })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ height: '16px' }} />
            <Typography color='error' variant='overline' sx={{ ml: 2 }}>Outcomes</Typography>

            <TableContainer component={Paper}>
                <Table aria-label='by-category-table'>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'secondary.main' }}>
                            <TableCell>Category</TableCell>
                            <TableCell align='right'>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ background: 'linear-gradient(0deg, rgba(255,255,255,1) 51%, rgba(251,215,215,1) 100%)' }}>

                        {
                             categories.categories.filter(c => c.type === 'outcome' && c.outcomes)
                                .sort((a, b) => b.outcomes - a.outcomes)
                                .map(c => {
                                    return (
                                        <TableRow key={c.id}>
                                            <TableCell>{c.name}</TableCell>
                                            <TableCell align='right'>{c.outcomes} €</TableCell>
                                        </TableRow>
                                    );
                                })
                        }

                    </TableBody>
                </Table>
            </TableContainer>

            <Divider sx={{ mt: 2, mb: 2 }} />
        </Box>
    );
};

export default ByCategories;