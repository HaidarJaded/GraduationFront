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
import {useRouter} from "next/router";
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


    const formOptions = getValidationObject("price","time_required");
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;

    const onSubmit = async () => {
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
    }

    const [selectedTimeRequired, setSelectedTimeRequired] = useState(data?.time_required);
    const [selectedName, setSelectedName] = useState(data?.name);
    const [selectedPrice, setSelectedPrice] = useState(data?.price);
    const [selectedDeviceModel, setSelectedDeviceModel] = useState(data?.device_model);

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
                }>{"تعديل خدمة"}</DialogTitle>
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
                                    label="اسم الخدمة"
                                    autoFocus
                                />
                            </Grid>

                            {/*<Grid item xs={12} sm={6}>*/}
                            {/*    <TextField*/}
                            {/*        margin="normal"*/}
                            {/*        onKeyUp={handleKeyUp}*/}
                            {/*        name="device_model"*/}
                            {/*        defaultValue={`${data?.device_model || ''}`}*/}
                            {/*        fullWidth*/}
                            {/*        id="device_model"*/}
                            {/*        label="نوع الجهاز"*/}

                            {/*    />*/}
                            {/*</Grid>*/}
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
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="time_required"
                                    defaultValue={`${data?.time_required || ''}`}
                                    fullWidth
                                    id="time_required"
                                    label="الوقت المطلوب"
                                    {...register('time_required')}
                                    helperText={errors.time_required ? errors.time_required.message : ''}
                                    error={!!errors.time_required}

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
                    <Button type={'submit'}>تعديل</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}