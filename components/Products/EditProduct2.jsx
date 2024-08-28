import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {CircularProgress, Grid, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {getValidationObject, Notify} from "../../utils";
import {servicesProducts} from "../../Routes/api/products";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditProduct2({...props}) {
    const {open} = props;
    const [id, setId] = useState(props.id);
    const [data, setData] = useState();
    const {update} = props;


    const fetchAndSetProduct = useCallback(async () => {
        const response = await servicesProducts.getProduct(id);
        await setData(response);
    }, [id])
    ///


    useEffect(() => {
        fetchAndSetProduct();
    }, [fetchAndSetProduct]);


    const formOptions = getValidationObject("price","quantity","name");
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;

    const onSubmit = async () => {
        setEditState(true);
        console.log("dddd")
        let dataProduct = {}

        if (selectedName && selectedName !== data?.name)
            Object.assign(dataProduct, {"name": selectedName})

        if (selectedPrice && selectedPrice !== data?.price)
            Object.assign(dataProduct, {"price": selectedPrice})

        if (selectedQuantity && selectedQuantity !== data?.quantity)
            Object.assign(dataProduct, {"quantity": selectedQuantity})
        if (Object.keys(dataProduct).length > 0) {
            console.log("شرط انو في تعباية صحيح");
            try {
                const response = await servicesProducts.updateProduct(id, dataProduct);
                Notify("light", response.message, "success")
                props.onCloseDialog()
                update('update');
            } catch (error) {
                console.log(error)
            }

        }
        setEditState(false);

    }


    const [selectedQuantity, setSelectedQuantity] = useState(data?.quantity);
    const [selectedName, setSelectedName] = useState(data?.name);
    const [selectedPrice, setSelectedPrice] = useState(data?.price);
    const [editState,setEditState]=useState(false);


    function handleKeyUp(event) {
        console.log("Keyup")
        let keyName = event.target.name;
        switch (keyName) {
            case 'price':
                setSelectedPrice(event.target.value)
                break;
            case 'quantity':
                setSelectedQuantity(event.target.value)
                break;
            case 'name':
                setSelectedName(event.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Dialog
                component="form" onSubmit={handleSubmit(onSubmit)}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props?.onCloseDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={
                    {
                        fontWeight: "bold",
                        direction: "rtl",
                        color: '#20095e'
                    }
                }>{"تعديل منتج"}</DialogTitle>
                <DialogContent>

                    {data ? (
                        <Grid container maxWidth="lg" spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="name"
                                    defaultValue={`${data?.name || ''}`}
                                    fullWidth
                                    id="name"
                                    label="اسم المنتج"
                                    {...register('name')}
                                    helperText={errors.name ? errors.name.message : ''}
                                    error={!!errors.name}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="price"
                                    defaultValue={`${data?.price || ''}`}
                                    fullWidth
                                    id="price"
                                    label="السعر"
                                    {...register('price')}
                                    helperText={errors.price && errors.price?.message || (data.price?.length > 0 && data.price[0])}
                                    error={(errors.price || data.price?.length > 0) && true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="quantity"
                                    defaultValue={`${data?.quantity || ''}`}
                                    fullWidth
                                    id="quantity"
                                    label="الكمية"
                                    {...register('quantity')}
                                    helperText={errors.quantity && errors.quantity?.message || (data.quantity?.length > 0 && data.quantity[0])}
                                    error={(errors.quantity || data.quantity?.length > 0) && true}

                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container maxWidth="lg" justifyContent={'center'} spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <CircularProgress/>
                            </Grid>
                        </Grid>

                    )}

                </DialogContent>
                <DialogActions>
                    <Button onClick={props?.onCloseDialog}>إلغاء التعديل</Button>
                    <Button type={'submit'} disabled={editState}>تعديل</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}