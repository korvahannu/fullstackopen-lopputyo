import { useState } from 'react';
import { createTheme } from '@mui/material';

const useTheme = ({isDarkMode}) => {
    const [dark, setDark] = useState(isDarkMode);

    const theme = createTheme({
        palette: {
            type: dark ? 'dark' : 'light',
        },
    });

    const changeTheme = ({isDarkMode}) => {
        setDark(isDarkMode);
    };

    return { dark, changeTheme, theme };
};

export default useTheme;