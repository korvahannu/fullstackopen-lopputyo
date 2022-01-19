import { useState, useEffect } from 'react';
import { getUserPaymentMethods } from '../services/paymentMethods';

const usePaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);

    useEffect( ()=> {
        getPaymentMethods();
    }
    , []);

    const getPaymentMethods = async () => {
        const result = await getUserPaymentMethods();

        setPaymentMethods(
            result
        );
    };

    return { paymentMethods };
};

export default usePaymentMethods;