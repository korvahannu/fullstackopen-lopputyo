import { useState } from 'react';
import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const useTheme = () => {
    const [dark, setDark] = useState(false);

    const theme = createTheme({
        palette: {
            dark,
            ...(dark===true)
            ? {
                primary:  {
                    main: grey[500],
                    divider: grey[700],
                    background: {
                      default: grey[900],
                      paper: grey[900],
                    },
                    text: {
                      primary: '#fff',
                      secondary: grey[500],
                    },
                }
            }
            : {

            }

        },
    });

    const changeTheme = (mode) => {
        setDark(mode);
    };

    return { dark, changeTheme, theme };
};

export default useTheme;