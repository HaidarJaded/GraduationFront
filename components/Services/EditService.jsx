import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {CircularProgress, Grid, Stack, Box, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {getValidationObject, Notify} from "../../utils";
import {servicesServices} from "../../Routes/api/services";
//import {ModelsEnum} from "../../enums";
//import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditService({...props}) {
    const {open} = props;
    const [id, setId] = useState(props.id);
    const [data, setData] = useState();
    const {update} = props;

    const fetchAndSetService = useCallback(async () => {

        const response = await servicesServices.getService(id);
        await setData(response);
    }, [id])

    useEffect(() => {
        fetchAndSetService();
    }, [fetchAndSetService]);


    const formOptions = getValidationObject("price");
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;

    const extractDays = (timeRequired) => {
        const match = timeRequired?.match(/(\d+)+days/);
        console.log(match ? match[1] : 0)
        return match ? match[1] : 0;
    };
    const extractHours = (timeRequired) => {
        const match = timeRequired?.match(/(\d+)+hours/);
        console.log(match ? match[1] : 0)
        return match ? match[1] : 0;
    };

    const [days, setDays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [selectedTimeRequired, setSelectedTimeRequired] = useState(data?.time_required);

    useEffect(() => {
        if (data?.time_required) {
            const extractedDays = extractDays(data.time_required);
            const extractedHours = extractHours(data.time_required);
            setDays(extractedDays);
            setHours(extractedHours);
        }
    }, [data?.time_required]);
    const handleDaysChange = (event) => {
        setDays(event.target.value);
        processInput(event.target.value, hours);
    };

    const handleHoursChange = (event) => {
        setHours(event.target.value);
        processInput(days, event.target.value);
    };

    const processInput = (daysValue, hoursValue) => {
        console.log("prosTnput");
        const formattedValue = `${daysValue}days ${hoursValue}hours`;
        setSelectedTimeRequired(formattedValue);
    };

    const onSubmit = async () => {
        setEditState(true);
        console.log("sed")
        let dataService = {}

        if (selectedTimeRequired && selectedTimeRequired !== data?.time_required)
            Object.assign(dataService, {"time_required": selectedTimeRequired})

        if (selectedName && selectedName !== data?.name)
            Object.assign(dataService, {"name": selectedName})

        if (selectedPrice && selectedPrice !== data?.price)
            Object.assign(dataService, {"price": selectedPrice})

        if (selectedDeviceModel && selectedDeviceModel !== data?.device_model)
            Object.assign(dataService, {"device_model": selectedDeviceModel})
        if (Object.keys(dataService).length > 0) {
            try {
                const response = await servicesServices.updateService(id, dataService);
                Notify("light", response.message, "success")
                props.onCloseDialog()
                update('update');
            } catch (error) {
                console.log(error)
            }

        }
        setEditState(false);
    }

    // const [selectedTimeRequired, setSelectedTimeRequired] = useState(data?.time_required);
    const [selectedName, setSelectedName] = useState(data?.name);
    const [selectedPrice, setSelectedPrice] = useState(data?.price);
    const [selectedDeviceModel, setSelectedDeviceModel] = useState(data?.device_model);
    const [editState,setEditState]=useState(false);


    // useEffect(() => {
    //     const _ModelOptions = getEnum(ModelsEnum)
    //     setModelOptions(_ModelOptions)
    // }, [])


    function handleKeyUp(event) {
        let keyName = event.target.name;
        switch (keyName) {
            case 'device_model' :
                setSelectedDeviceModel(event.target.value)
                break;
            case 'price':
                setSelectedPrice(event.target.value)
                break;
            case 'time_required':
                setSelectedTimeRequired(event.target.value)
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
                component="form"
                onSubmit={handleSubmit(onSubmit)}
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
                }>{"تعديل خدمة"}</DialogTitle>
                <DialogContent>

                    {data ? (
                        <Box   sx={{width: "400px"}} >
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="name"
                                    defaultValue={`${data?.name || ''}`}
                                    fullWidth
                                    id="name"
                                    label="اسم الخدمة"
                                    autoFocus
                                />

                            </Box>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="device_model"
                                    defaultValue={`${data?.device_model || ''}`}
                                    fullWidth
                                    id="device_model"
                                    label="نوع الجهاز"

                                />
                            </Grid>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
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
                    <Button type="submit" disabled={editState}>تعديل</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}