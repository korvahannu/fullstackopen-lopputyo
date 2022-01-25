import React from 'react';
import Transactions from './Views/Transactions';
import PropTypes from 'prop-types';

const Main = ({view}) => {

    switch(view) {
        case 'transactions':
            return <Transactions />;
        
        default:
            return <div>Unknown</div>;
    }
};

Main.propTypes = {
    view: PropTypes.string
};

export default Main;