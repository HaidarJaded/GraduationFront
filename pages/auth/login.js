import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Button, Container, CssBaseline, TextField, Typography} from '@mui/material';
import {authServices} from "/Routes";

import {useRouter} from "next/router";

import {getValidationObject, Notify} from "/utils";
import {useForm} from "react-hook-form";
import Image from 'next/image';
import Cookies from 'js-cookie';
// TODO remove, this demo shouldn't need to reset the theme.


export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        if (Cookies.get('auth-token')) {
            router.push('/');
        }
    }, []);


    const [data, setData] = useState({
        email: "", password: ""
    });
    const formOptions = getValidationObject("email", "password");
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;

    const onSubmit = async (email) => {
        const response = await authServices.login(email)
        if (response?.status === 200) {
            Notify("colored", `${response?.message || 'Logged in success'}`, "success")
            await router.push('/');
        }
    };

    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh"
            }}
            component="main" maxWidth="xs">
            <CssBaseline/>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',

            }}>

                <Image
                    src="/assets/images/svg/logo-black.svg"
                    alt="Description of the image"
                    fill={1}
                     loading='lazy'
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        zIndex: '-1',
                        maxWidth: '737px',
                        opacity: '.025',
                    }}
                />
                <Typography component="h1" variant="h5" sx={{
                    textAlign: 'start',
                    fontWeight: "bold",
                    mt: 3
                }}>
                    Log in
                </Typography>
                <Typography component="p" sx={{
                    textAlign: 'start',

                }}>
                    Welcome back! Please enter your details.
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}
                     noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        {...register('email')}
                        helperText={errors.email && errors.email?.message || (data.email?.length > 0 && data.email[0])}
                        error={(errors.email || data.email?.length > 0) && true}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register('password')}
                        helperText={errors.password && errors.password?.message || (data.login?.length > 0 && data.password[0])}
                        error={(errors.password || data.password?.length > 0) && true}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, bgcolor: "primary.mainDark"}}
                    >
                        Sign In
                    </Button>

                </Box>
            </Box>
        </Container>

    );
}

// export function getServerSideProps(context) {
//     const token = context.req.cookies['auth-token'];
//
//     if (token) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         };
//     }
//
//     return {
//         props: {}, // will be passed to the page component as props
//     };
// }