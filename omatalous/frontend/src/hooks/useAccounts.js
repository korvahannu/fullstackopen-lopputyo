import { useState, useEffect } from 'react';
import { getUserAccounts } from '../services/accounts';

const useAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( async ()=> {
        await getAccounts();
        setLoading(false);
    }
    , []);

    const getAccounts = async () => {
        const result = await getUserAccounts();

        setAccounts(
            result
        );
    };

    return { accounts, loading, getAccounts};
};

export default useAccounts;