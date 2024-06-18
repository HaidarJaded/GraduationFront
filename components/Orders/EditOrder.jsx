import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {useForm} from "react-hook-form";
import {usersServices} from "../../Routes";
import {Notify} from "../../utils";
import {ordersServices} from "../../Routes/api/orders";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditOrder({...props}) {
    const {open} = props;
    const [id, setId] = useState(props.id)
    const [data, setData] = useState();
    const {update} = props;

    const [selectedDeliveryName, setSelectedDeliveryName] = useState(data?.user_id);
    const fetchAndSetDelivery = useCallback(async () => {
        const params = {
            'dir': 'desc',
            'with': 'user',
        };
        const response = await ordersServices.getOrder(id, params);
        console.log("this response of order",response)
        await setData(response);
    }, [id])


    useEffect(() => {
        fetchAndSetDelivery()
    }, [fetchAndSetDelivery])



    const onSubmit = async () => {
        let dataDelivery = {}
        if (selectedDeliveryName && selectedDeliveryName !== data?.user_id)
            Object.assign(dataDelivery, {"user_id": selectedDeliveryName})

        if (Object.keys(dataDelivery).length > 0) {
            try {
                const response = await ordersServices.updateOrder(id, dataDelivery);
                Notify("light", response.message, "success")
                props.onCloseDialog()
                update('update');
            } catch (error) {
                console.log(error)
            }

        }
    }

    const [modelOptions, setModelOptions] = useState([]);

    const fetchAndSetModelOptions = useCallback(async () => {
        const params = {
            'rule*name': 'عامل توصيل',
            // "at_work":1,
            'all_data': 1,
        };
        const data = await usersServices?.getAll(params);
        console.log("data?.body عامل توصيل",data?.body)
        data ? setModelOptions(data?.body) : setModelOptions([]);
    }, []);

    useEffect(() => {
        fetchAndSetModelOptions();
    }, [fetchAndSetModelOptions]);

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
                            <Grid item xs={12} sx={{marginTop:1}}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        id="user_id">
                                        عامل التوصيل المسؤول عن الطلب
                                    </InputLabel>
                                    <Select
                                        name={"user_id"}
                                        labelId="user_id"
                                        id="user_id"
                                        value={selectedDeliveryName}
                                        onChange={(event) => setSelectedDeliveryName(event.target.value)}
                                        label="عامل التوصيل المسؤول عن الطلب"
                                    >
                                        {modelOptions?.map((user) => (
                                            <MenuItem
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {`${user.name} ${user.last_name}`}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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