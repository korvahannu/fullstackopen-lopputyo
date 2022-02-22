import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const ColorSelector = ({color, setColor}) => (
    <Box sx={{ display: 'flex', flexDirection: 'row', '&:hover': { cursor: 'pointer' } }}>
        <Box onClick={() => setColor('blue')} sx={{
            backgroundColor: '#1976d2', width: '20px', height: '20px', borderRadius: '20px', mr: 1,
            border: color === 'blue' || color === '' ? '2px solid #000' : '2px solid #fff'
        }} />
        <Box onClick={() => setColor('green')} sx={{
            backgroundColor: '#43a047', width: '20px', height: '20px', borderRadius: '20px', mr: 1,
            border: color === 'green' || color === '' ? '2px solid #000' : '2px solid #fff'
        }} />
        <Box onClick={() => setColor('pink')} sx={{
            backgroundColor: '#ab47bc', width: '20px', height: '20px', borderRadius: '20px', mr: 1,
            border: color === 'pink' || color === '' ? '2px solid #000' : '2px solid #fff'
        }} />
        <Box onClick={() => setColor('red')} sx={{
            backgroundColor: '#e53935', width: '20px', height: '20px', borderRadius: '20px', mr: 1,
            border: color === 'red' || color === '' ? '2px solid #000' : '2px solid #fff'
        }} />
        <Box onClick={() => setColor('white')} sx={{
            backgroundColor: '#fafafa', width: '20px', height: '20px', borderRadius: '20px', mr: 1,
            border: color === 'white' || color === '' ? '2px solid #000' : '2px solid #fff'
        }} />
        <Box onClick={() => setColor('grey')} sx={{
            backgroundColor: '#263238', width: '20px', height: '20px', borderRadius: '20px', mr: 1,
            border: color === 'grey' || color === '' ? '2px solid #000' : '2px solid #fff'
        }} />
    </Box>
);

ColorSelector.propTypes = {
    setColor:PropTypes.func,
    color: PropTypes.string
};

export default ColorSelector;