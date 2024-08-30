import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Box, Grid, Stack, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {getValidationObject, Notify} from "../../utils";
import {servicesServices} from "../../Routes/api/services";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function AddService({...props}) {
    const {open} = props;
    const {update} = props;

    const [data, setData] = useState({
        price: "", name: "", time_required: ""
    });
    const formOptions = getValidationObject("name", "price","device_model");
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;
    const [addState,setAddState]=useState(false);

    const [days, setDays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [selectedTimeRequired, setSelectedTimeRequired] = useState(data?.time_required);

    const handleDaysChange = (event) => {
        setDays(event.target.value);
        processInput(event.target.value, hours);
    };

    const handleHoursChange = (event) => {
        setHours(event.target.value);
        processInput(days, event.target.value);
    };

    const processInput = (daysValue, hoursValue) => {
        const formattedValue = `${daysValue}days ${hoursValue}hours`;
        setSelectedTimeRequired(formattedValue);
    };

    const onSubmit = async (service) => {
        setAddState(true);
        console.log('submit');
        const data = {
            ...service, // نسخ القيم الموجودة في service
            time_required: selectedTimeRequired // إضافة أو تحديث قيمة time_required
        };
        const response =  await servicesServices.addService(data);
        if (response?.status >= 200 && response?.status<300 ) {
            Notify("colored",
                "تمت الإضافة بنجاح", "success");
        }
        setAddState(false);
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
                }>إضافة خدمة </DialogTitle>
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
                                id="device_model"
                                label="device_model"
                                name="device_model"
                                autoComplete="device_model"

                                {...register('device_model')}
                                helperText={errors.device_model && errors.device_model?.message || (data.device_model?.length > 0 && data.device_model[0])}
                                error={(errors.device_model || data.device_model?.length > 0) && true}
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
                                {...register('price')}
                                helperText={errors.price && errors.price?.message || (data.price?.length > 0 && data.price[0])}
                                error={(errors.price || data.price?.length > 0) && true}
                            />
                        </Box>
                        <Stack  direction="column">
                            <Typography sx={{color:"rgba(0, 0, 0, 0.6)",fontSize:15 ,direction:'rtl'}}>
                                الوقت المطلوب :
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sx={{marginTop:2}}>
                                    <TextField

                                        label="Days"
                                        type="number"
                                        value={days}
                                        onChange={handleDaysChange}
                                        InputProps={{ inputProps: { min: 0 } }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} sx={{marginTop:2}}>
                                    <TextField
                                        label="Hours"
                                        type="number"
                                        value={hours}
                                        onChange={handleHoursChange}
                                        InputProps={{ inputProps: { min: 0, max: 23 } }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Stack>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props?.onClose}>إلغاء</Button>
                    <Button type="submit" disabled={addState}>إضافة</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}