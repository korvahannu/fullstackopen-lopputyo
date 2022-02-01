import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*
    Useview should be the only thing that uses useNavigate and localStorage of 'view'
*/

const useView = () => {
    const navigateTo = useNavigate();
    const [value, setView] = useState('home');

    useEffect(() => {
        const savedView
            = window.localStorage.getItem('view');
        
        if(savedView)
            navigate(savedView);
        else
            navigate('home');
    }, []);

    useEffect(()=> {
        window.localStorage.setItem('view', value);
    }, [value]);
    
    const navigate = (newView, options) => {
        
        if(options !== 'prevent-save') {
            setView(newView);
        }

        navigateTo(`/${newView}`);
    };

    const navigateToSaved = () => {
        if(value === '' ||value===null)
            navigateTo('home');
        else
            navigateTo(value);
    };

    return {
        value,
        navigate,
        navigateToSaved
    };
};

export default useView;