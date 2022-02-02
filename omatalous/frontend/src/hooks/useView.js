import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/*
    Useview should be the only thing that uses useNavigate and localStorage of 'view'
*/

const useView = () => {
    const navigateTo = useNavigate();
    const [value, setView] = useState('home');
    const location = useLocation();

    useEffect(() => {

        if(location.pathname.startsWith('/confirm')
        || location.pathname.startsWith('/email-sent-to-verify'))
            return null;

        const savedView
            = window.localStorage.getItem('view');
        
        if(savedView)
            navigate(savedView);
        else
            navigate('home');
    }, []);

    useEffect(()=> {
        if(location.pathname.startsWith('/confirm')
        || location.pathname.startsWith('/email-sent-to-verify'))
            return null;
            
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