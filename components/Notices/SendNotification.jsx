import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useState} from "react";
import {getValidationObject, Notify} from "../../utils";
import {useForm} from "react-hook-form";
import {servicesProducts} from "../../Routes/api/products";


export function SendNotification({...props})
{
    const {open} = props;
    const {update} = props;

    const [data, setData] = useState({
        price: "", name: "", quantity: ""
    });
    const formOptions = getValidationObject("name", "price","quantity");
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;

    const onSubmit = async (user) => {
        console.log('submit');
        const data = Object.assign(user)
        const response =  await servicesProducts.addProduct(data);
        if (response?.status >= 200 && response?.status<300 ) {
            Notify("colored",
                "تمت الإضافة بنجاح", "success");
        }
        props.onCloseDialog();
        update('update');
    };
    return (
        <>
            <Dialog
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                open={open}
                keepMounted
                onClose={props?.onCloseDialog}
                aria-describedby="alert-dialog-slide-description"
                noValidate
            >
                <DialogTitle sx={
                    {
                        fontWeight: "bold",
                        direction: "rtl",
                        color: '#20095e'
                    }
                }>إرسال إِشعار </DialogTitle>
                <DialogContent>
                    <Box   sx={{width: "400px"}}>

                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="عنوان الإشعار "
                                name="name"
                                autoComplete="name"
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
                                id="name"
                                label="نص الإشعار "
                                name="name"
                                autoComplete="name"

                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props?.onCloseDialog}>إلغاء</Button>
                    <Button type='submit'>إرسال</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}