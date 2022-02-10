import { Box, Typography } from '@mui/material';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

const ByCharts = ({transactions}) => {

    
    const data = [];

    transactions.forEach(transaction => {

        const filterer = (e) => {
            const date1 = new Date(e.name);
            const date2 = new Date(transaction.date);

            if(date1.getFullYear() === date2.getFullYear()
            && date1.getMonth() === date2.getMonth())
                return true;
            
            return false;
        };

        if(data.filter(filterer).length < 1) {
            data.push({
                name: transaction.date,
                Incomes: transaction.type === 'income' ? transaction.amount
                : 0,
                Outcomes: transaction.type === 'outcome' ? transaction.amount
                : 0
            });
        }
        else {
            data.forEach(element => {
                if (new Date(element.name).getMonth() === new Date(transaction.date).getMonth()
                && new Date(element.name).getFullYear() === new Date(transaction.date).getFullYear()) {
                    if(transaction.type === 'income') {
                        element.Incomes += transaction.amount; 
                    }
                    else {
                        element.Outcomes += transaction.amount;
                    }
                }
            });
        }
    });

    data.sort((a, b) => new Date(a.name) - new Date(b.name));

    data.forEach(d => {
        const currentDate = new Date(d.name);
        const newDate = `${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;
        d.name = newDate;
    });

    return (
        <Box>
            <Typography variant='h6' sx={{mb:2}}>Spendings per month</Typography>
            <LineChart sx={{width:'700px'}}
                width={700}
                height={350}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Outcomes" stroke="red" />
                <Line type="monotone" dataKey="Incomes" stroke="green" />
            </LineChart>
        </Box>
    );
};

ByCharts.propTypes = {
    transactions: PropTypes.oneOfType(PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.bool])),
};

export default ByCharts;