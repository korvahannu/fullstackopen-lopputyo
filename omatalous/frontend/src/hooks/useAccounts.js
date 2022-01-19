import { useState, useEffect } from 'react';
import { getUserAccounts } from '../services/accounts';

const useAccounts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect( ()=> {
        getAccounts();
    }
    , []);

    const getAccounts = async () => {
        const result = await getUserAccounts();

        setAccounts(
            result
        );
    };

    return { accounts };
};

export default useAccounts;