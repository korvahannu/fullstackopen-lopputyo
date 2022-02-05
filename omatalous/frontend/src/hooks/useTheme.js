import { useState, useEffect } from 'react';
import { createTheme } from '@mui/material';

const useTheme = () => {
    const [color, setColor] = useState('blue');

    useEffect(() => {
      setColor(window.localStorage.getItem('color'));
    }, []);

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
                    main: '#a5d6a7',
                  },
                success: {
                  main:'#43a047'
                },
                error: {
                  main: '#f44336'
                }
            }
            : color, ...(color==='pink')
            ? {
                primary: {
                    main: '#ab47bc',
                  },
                  secondary: {
                    main: '#ce93d8',
                  },
            }
            : color, ...(color==='white')
            ? {
                primary: {
                    main: '#fafafa',
                  },
                  secondary: {
                    main: '#e0e0e0',
                  },
            }
            : color, ...(color==='grey')
            ? {
                primary: {
                    main: '#263238',
                  },
                  secondary: {
                    main: '#546e7a',
                  },
            }
            : color, ...(color==='blue' ||color === '')
            ? {
              secondary: {
                main: '#42a5f5'
              }
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