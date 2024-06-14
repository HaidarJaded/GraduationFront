import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Box, InputAdornment, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {getValidationObject, Notify} from "../../utils";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {users, usersServices} from "../../Routes";
//import {ModelsEnum} from "../../enums";
//import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function AddUser({...props}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const handleClickShowPasswordConfirmation = () => {
        setShowPasswordConfirmation((prev) => !prev);
    };

    const handleMouseDownPasswordConfirmation = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const user = props.user
    const {open} = props;
    const [ruleId, setRuleId] = useState(props.ruleId);
    const [ruleName, setRuleName] = useState(props.ruleName)
    const {update} = props;
    const route = useRouter()

    const [data, setData] = useState({
        email: "", name: "", last_name: "", rule_id: ruleId, password: "", password_confirmation: "",
    });
    const formOptions = getValidationObject("email", "password","password_confirmation","name","last_name");
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;

    const onSubmit = async (user) => {
        const data = Object.assign(user, {rule_id: ruleId})
        const response =  await usersServices.addUser(data);
        if (response?.status === 200) {
            Notify("colored", `${response?.message || 'Logged in success'}`, "success")
        }
        props.onClose();
        update('update');
    };

    return (
        <>
            <Dialog
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props?.onClose}
                aria-describedby="alert-dialog-slide-description"
                noValidate
            >
                <DialogTitle sx={
                    {
                        fontWeight: "bold",
                        direction: "rtl",
                        color: '#20095e'
                    }
                }>إضافة {ruleName} </DialogTitle>
                <DialogContent>
                    <Box   sx={{width: "400px"}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address "
                                name="email"
                                autoComplete="email"
                                autoFocus
                                 {...register('email')}
                                helperText={errors.email && errors.email?.message || (data.email?.length > 0 && data.email[0])}
                                error={(errors.email || data.email?.length > 0) && true}
                            />
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="name "
                                name="name"
                                autoComplete="email"
                                autoFocus
                                 {...register('name')}
                                helperText={errors.name && errors.name?.message || (data.name?.length > 0 && data.name[0])}
                                error={(errors.name || data.name?.length > 0) && true}
                            />
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="last_name"
                                label="Last name "
                                name="last_name"
                                autoComplete="last_name"
                                autoFocus
                                 {...register('last_name')}
                                helperText={errors.last_name && errors.last_name?.message || (data.last_name?.length > 0 && data.last_name[0])}
                                error={(errors.last_name || data.last_name?.length > 0) && true}
                            />
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                {...register('password')}
                                helperText={errors.password && errors.password?.message || (data.login?.length > 0 && data.password[0])}
                                error={(errors.password || data.password?.length > 0) && true}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password_confirmation"
                                label="password confirmation"
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                id="password_confirmation"
                                autoComplete="current-password"
                                {...register('password_confirmation')}
                                helperText={errors.password_confirmation && errors.password_confirmation?.message || (data.login?.length > 0 && data.password_confirmation[0])}
                                error={(errors.password_confirmation || data.password_confirmation?.length > 0) && true}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPasswordConfirmation}
                                                onMouseDown={handleMouseDownPasswordConfirmation}
                                            >
                                                {showPasswordConfirmation ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props?.onClose}>Disagree</Button>
                    <Button type='submit'>إضافة</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}