import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Box, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {getValidationObject, Notify} from "../../utils";
import {servicesProducts} from "../../Routes/api/products";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function AddProduct({...props}) {
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
                    <Button onClick={props?.onClose}>إلغاء</Button>
                    <Button type='submit'>إضافة</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}