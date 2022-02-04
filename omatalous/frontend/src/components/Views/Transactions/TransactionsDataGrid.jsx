import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const CustomDataGrid = styled(DataGrid)(() => ({
  '.MuiDataGrid-iconButtonContainer': {
    display: 'none'
  }
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 0, hide: true },
  { field: 'amount', headerName: 'Amount', flex: 1, },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'category', headerName: 'Category', flex: 1 },
  { field: 'paymentMethod', headerName: 'Payment Method', flex: 1 },
  { field: 'account', headerName: 'Account', flex: 1 },
  { field: 'date', headerName: 'Date', flex: 1 },
];

const TransactionsDataGrid = ({ transactions, onSelectionChange }) => {

  
  const rows = transactions.map(transaction => {

    const accName = transaction.account === null
    ||transaction.account === undefined
    ? 'X'
    : transaction.account.name;

    const pmName = transaction.paymentMethod === null ||
    transaction.paymentMethod === undefined
    ? 'X'
    : transaction.paymentMethod.name;

    if (transaction.category.type === 'outcome') {
      return {
        id: transaction.id,
        amount: -(transaction.amount),
        description: transaction.description,
        category: transaction.category.name,
        paymentMethod: pmName,
        account: accName,
        date: transaction.date.substring(0, 10)
      };
    }
    else if (transaction.category.type === 'income') {
      return {
        id: transaction.id,
        amount: transaction.amount,
        description: transaction.description,
        category: transaction.category.name,
        paymentMethod: '',
        account: accName,
        date: transaction.date.substring(0, 10)
      };
    }

  });

  return (
    <Box
      sx={{
        height: 475,
        width: 1,
        '& .negative': {
          color: 'red'
        },
        '& .positive': {
          color: 'green',
        },
      }}
    >
      <CustomDataGrid disableColumnMenu={true} onSelectionModelChange={onSelectionChange}
        onSortModelChange={() => null}
        density='compact' columns={columns} rows={rows} rowsPerPageOptions={[10]} pageSize={10} checkboxSelection

        getCellClassName={(params) => {
          if (params.field === 'amount') {
            return params.value < 0
              ? 'negative'
              : 'positive';
          }

          return '';
        }}
      />
    </Box>
  );
};

TransactionsDataGrid.propTypes = {
  transactions: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.bool]),
  onSelectionChange: PropTypes.func
};

export default TransactionsDataGrid;