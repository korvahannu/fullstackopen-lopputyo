import { useState } from 'react';
import { createTheme } from '@mui/material';

const useTheme = () => {
    const [color, setColor] = useState('blue');

    const theme = createTheme({
        palette: {
            color,
            ...(color==='red')
            ? {
                primary: {
                    main: '#e53935'
                },
                secondary: {
                  main: '#b71c1c',
                },
            }
            : color, ...(color==='green')
            ? {
                primary: {
                    main: '#43a047',
                  },
                  secondary: {
                    main: '#b71c1c',
                  },
            }
            : color, ...(color==='pink')
            ? {
                primary: {
                    main: '#ab47bc',
                  },
                  secondary: {
                    main: '#d81b60',
                  },
            }
            : {

            }

        },
    });

    const changeTheme = (c) => {
        setColor(c);
    };

    return { color, changeTheme, theme };
};

export default useTheme;