import {useRouter} from "next/router";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {LoginPage} from "./auth/login";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import * as React from "react";
import {Typography} from "@mui/material";


export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get('auth-token')) {
            router.push('/auth/login');
        }
    }, [router]);

    return (<>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',  // Full viewport height
                width: '100%',  // Full width
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: 2, color:"#1b0986eb",fontWeight: "bold" }}>
                Loading...
            </Typography>
            <Box sx={{ width: '50%' }}>
                <LinearProgress />
            </Box>
        </Box>

    </>)
}


// export function getServerSideProps(context) {
//     const token = context.req.cookies['auth-token'];
//     if (!token) {
//         return {
//             redirect: {
//                 destination: '/auth/login',
//                 permanent: false,
//             },
//         };
//     }
//     return {
//         props: {}, // will be passed to the page component as props
//     };
// }