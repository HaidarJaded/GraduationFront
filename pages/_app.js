import '../styles/globals.css'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@mui/material/CssBaseline';
import {theme} from '/theme/theme';
import {ThemeProvider} from '@mui/material/styles';
import getConfig from 'next/config';
import {Layout} from "../layouts";
import LoginPage from "./auth/login";
import {responseErrorHandlers} from "../wrappers";
import Home from "./index";
const {publicRuntimeConfig} = getConfig();

function MyApp({Component, pageProps}) {

    const style =
        'background: #221E2D; color: #D6D3DC; ' +
        'padding: 10px 20px; font-size: 20px;font-family: Courier New';
    const rainbowStyle =
        'font-weight: bold; ' +
        'font-size: 100px;color: white;font-family: Courier New; ' +
        'text-shadow: 6px 6px 0 rgb(142,142,147) , ' +
        '9px 9px 0 rgb(99,99,102) , 12px 12px 0 rgb(72,72,74) , 15px 15px 0 rgb(58,58,60) , ' +
        '18px 18px 0 rgb(44,44,46) , 21px 21px 0 rgb(28,28,30), 3px 3px 0 rgb(0,0,0)';

    // eslint-disable-next-line no-console
    console.log('%cprojecy name', rainbowStyle);

    // eslint-disable-next-line no-console,max-len
    console.log(`%cprojecy name \nVersion ${publicRuntimeConfig.version}+${publicRuntimeConfig.build}\nUpdated ${publicRuntimeConfig.updated_at} `,
        style
    );
    if (Component!==LoginPage && Component!== Home){
    return (
        <>

            <ThemeProvider theme={theme}>

                <CssBaseline/>

                <Layout>
                    <Component {...pageProps}/>
                </Layout>


                <ToastContainer/>
            </ThemeProvider>

        </>

    )}
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>


                    <Component {...pageProps}/>



                <ToastContainer/>
            </ThemeProvider>

        </>
    );
}

export default MyApp
