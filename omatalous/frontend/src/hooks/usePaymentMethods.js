import { useState, useEffect } from 'react';
import { getUserPaymentMethods } from '../services/paymentMethods';

const usePaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( async ()=> {
        await getPaymentMethods();
        setLoading(false);
    }
    , []);

    const getPaymentMethods = async () => {
        const result = await getUserPaymentMethods();

        setPaymentMethods(
            result
        );
    };

    return { paymentMethods, loading };
};

export default usePaymentMethods;