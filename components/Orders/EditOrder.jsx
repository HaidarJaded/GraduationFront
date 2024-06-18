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
import {deviceServices, usersServices} from "../../Routes";
import {useRouter} from "next/router";
import {Notify} from "../../utils";
import {clientsServices} from "../../Routes/api/clients";
//import {ModelsEnum} from "../../enums";
//import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditOrder({...props}) {
    const {open} = props;
    const [id, setId] = useState(props.id)
    const [data, setData] = useState();
    const {update} = props;

    const [selectedDeliveryName, setSelectedDeliveryName] = useState(data?.name);
    const fetchAndSetDelivery = useCallback(async () => {

        const params = {
            'dir': 'desc',
        };
        const response = await usersServices.getUser(id, params);
        await setData(response);
    }, [id])


    useEffect(() => {
        fetchAndSetDelivery()
    }, [fetchAndSetDelivery])

    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;


    const onSubmit = async () => {
        let dataDelivery = {}
        if (selectedDeliveryName && selectedDeliveryName !== data?.name)
            Object.assign(dataDelivery, {"name": selectedDeliveryName})

        if (Object.keys(dataDelivery).length > 0) {
            try {
                const response = await usersServices.updateUser(id, dataDelivery);
                Notify("light", response.message, "success")
                props.onCloseDialog()
                update('update');
            } catch (error) {
                console.log(error)
            }

        }
    }



    function handleKeyUp(event) {
        let keyName = event.target.name;
        switch (keyName) {
            case 'name' :
                setSelectedDeliveryName(event.target.value);
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
                }>
                    {"تعديل عامل توصيل الطلب"}</DialogTitle>
                <DialogContent>

                    {data ? (
                        <Grid container maxWidth="lg" spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="name"
                                    defaultValue={`${data?.name || ''}`}
                                    fullWidth
                                    id="name"
                                    label="اسم عامل التوصيل"
                                    autoFocus
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
                    <Button onClick={props?.onCloseDialog}>إلغاء</Button>
                    <Button type={'submit'}>تعديل</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}