import { useState, useEffect } from 'react';
import { getUserCategories } from '../services/categories';

const useCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect( ()=> {
        getCategories();
    }
    , []);

    const getCategories = async () => {
        const result = await getUserCategories();

        setCategories(
            result
        );
    };

    return { categories };
};

export default useCategories;