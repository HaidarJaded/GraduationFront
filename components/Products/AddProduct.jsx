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
import {servicesProducts} from "../../Routes/api/products";
//import {ModelsEnum} from "../../enums";
//import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function AddProduct({...props}) {
    const {open} = props;
    const {update} = props;
    const route = useRouter()

    const [data, setData] = useState({
        price: "", name: "", quantity: ""
    });
    const formOptions = getValidationObject("name", "price","quantity");
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;

    const onSubmit = async (user) => {
        const data = Object.assign(user)
        const response =  await servicesProducts.addProduct(data);
        if (response?.status === 200) {
            Notify("colored", `${response?.message || 'add product success'}`, "success")
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
                }>إضافة منتج </DialogTitle>
                <DialogContent>
                    <Box   sx={{width: "400px"}}>

                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="name "
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
                                id="price"
                                label="price "
                                name="price"
                                autoComplete="price"
                                autoFocus
                                {...register('price')}
                                helperText={errors.price && errors.price?.message || (data.price?.length > 0 && data.price[0])}
                                error={(errors.price || data.price?.length > 0) && true}
                            />
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="quantity"
                                label="quantity"
                                name="quantity"
                                autoComplete="quantity"
                                autoFocus
                                {...register('quantity')}
                                helperText={errors.quantity && errors.quantity?.message || (data.quantity?.length > 0 && data.quantity[0])}
                                error={(errors.quantity || data.quantity?.length > 0) && true}
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