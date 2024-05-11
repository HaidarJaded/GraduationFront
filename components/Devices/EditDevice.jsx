import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TextField} from "@mui/material";
 import {useState} from "react";
import {useForm} from "react-hook-form";
import {authServices} from "../../Routes";
import {device} from "../../Routes";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditDevice({...props}) {

    const {open} = props;
    const {id} = props;

    const [userName, setUserName] = useState();

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };
    const params={
        id:{id},
        userName:userName
    };
    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;

    const submit = async (params) => {
         const response=await device.updateDevice(params);
         console.log(response);

        // if (response?.status === 200) {

        //
        // props?.onCloseDialog;
        // }
    };


    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props?.onCloseDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="اسم الفني"
                                name="userName"
                                value={userName}
                                onChange={handleUserNameChange}
                                autoComplete="userName"
                                autoFocus
                            />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props?.onCloseDialog}>Disagree</Button>
                    <Button type='submit'>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}