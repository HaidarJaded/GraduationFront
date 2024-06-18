
import { createTheme } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';



const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            main: '#442d5d',
            mainDark : '#333366'
        },
        secondary: {
            main: '#F9FAFD',
            gray: '#344054',

        },

    },

});

export {theme};
