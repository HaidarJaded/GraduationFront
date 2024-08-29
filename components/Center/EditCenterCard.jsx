import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {getValidationObject, Notify} from "../../utils";
import {DashboardInfo} from "../../Routes/api/dashboardInfo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditCenterCard({...props}) {
    const {open} = props;
    const [id, setId] = useState(props.id);
    const [data, setData] = useState();
    const {update} = props;


    const [startWorkValue, setStartWorkValue] = React.useState(data?.start_work);

    const [endWorkValue, setEndWorkValue] = React.useState(data?.end_work);
    const handleChangeEndWork = (newValue) => {
        const formattedTime = newValue.format('hh:mm A');
        setEndWorkValue(formattedTime);

        console.log(formattedTime);
    };

    const handleChange = (newValue) => {
        const formattedTime = newValue.format('hh:mm A');
        setStartWorkValue(formattedTime);
        console.log(formattedTime);

    };

    const [selectedCenterName, setSelectedCenterName] = useState(data?.name);
    const [selectedCenterAddress, setSelectedCenterAddress] = useState(data?.address);
    const [selectedCenterStatus, setSelectedCenterStatus] = useState(data?.status);
    const [selectedCenterStartWork, setSelectedCenterStartWork] = useState(data?.start_work);
    const [selectedCenterEndWork, setSelectedCenterEndWork] = useState(data?.end_work);


    const fetchAndSetCenter = useCallback(async () => {
        const response = await DashboardInfo.getCenter(1);
        setData(response);
    }, [])


    useEffect(() => {
        fetchAndSetCenter()
    }, [fetchAndSetCenter])

    const formOptions = getValidationObject("start_work", "end_work");
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;


    const onSubmit = async () => {
        let dataCenter = {};

        if (startWorkValue && startWorkValue !== data?.start_work) {
            console.log("start work if ",startWorkValue)
            dataCenter.start_work = startWorkValue;
            console.log(startWorkValue, data?.start_work);
        }
        if (endWorkValue && endWorkValue !== data?.end_work) {
            console.log("end work if ",endWorkValue)
            dataCenter.end_work = endWorkValue;
            console.log(endWorkValue, data?.end_work);
        }

        if (selectedCenterName && selectedCenterName !== data?.name) {
            dataCenter.name = selectedCenterName;
            console.log(selectedCenterName, data?.name);
        }
        if (selectedCenterAddress && selectedCenterAddress !== data?.address) {
            dataCenter.address = selectedCenterAddress;
            console.log(selectedCenterAddress, data?.address);
        }
        if (selectedCenterStatus && selectedCenterStatus !== data?.status) {
            dataCenter.status = selectedCenterStatus;
            console.log(selectedCenterStatus, data?.status);
        }
        // if (selectedCenterStartWork && selectedCenterStartWork !== data?.start_work)
        //     dataCenter.start_work = selectedCenterStartWork;
        // if (selectedCenterEndWork && selectedCenterEndWork !== data?.end_work)
        //     dataCenter.end_work = selectedCenterEndWork;
        console.log(dataCenter);

        if (Object.keys(dataCenter).length > 0) {
            try {
                const response = await DashboardInfo.updateCenter(1, dataCenter);
                Notify("light", response.message, "success");
                props.onCloseDialog();
                update('update');
            } catch (error) {
                console.log(error);
            }
        }
    };

    function handleKeyUp(event) {
        let keyName = event.target.name;
        switch (keyName) {
            case 'name' :
                setSelectedCenterName(event.target.value);
                break;
            case 'address' :
                setSelectedCenterAddress(event.target.value);
                break;
            case 'start_work' :
                setSelectedCenterStartWork(event.target.value);
                break;
            case 'end_work' :
                setSelectedCenterEndWork(event.target.value);
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
                    {"تعديل معلومات المركز"}</DialogTitle>
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
                                    label="اسم المركز"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="address"
                                    defaultValue={`${data?.address || ''}`}
                                    fullWidth
                                    id="address"
                                    label="عنوان المركز"
                                />
                            </Grid>

                            {/*<Grid item xs={12} sm={12}>*/}
                            {/*    <TextField*/}
                            {/*        margin="normal"*/}
                            {/*        onKeyUp={handleKeyUp}*/}
                            {/*        name="end_work"*/}
                            {/*        defaultValue={`${data?.end_work || ''}`}*/}
                            {/*        fullWidth*/}
                            {/*        id="end_work"*/}
                            {/*        label="ساعات إنتهاء العمل"*/}
                            {/*        {...register('end_work')}*/}
                            {/*        helperText={errors.end_work ? errors.end_work.message : ''}*/}
                            {/*        error={!!errors.end_work}*/}

                            {/*    />*/}
                            {/*</Grid>*/}

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <TimePicker
                                            label="بدء العمل"
                                            value={data?.start_work ? dayjs(data.start_work, 'HH:mm A') : null}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TimePicker
                                            label="نهاية العمل"
                                            value={data?.end_work ? dayjs(data.end_work, 'HH:mm A') : null}
                                            onChange={handleChangeEndWork}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                </Grid>
                            </LocalizationProvider>

                            <Grid item xs={12} sx={{marginTop: 1}}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        id="status">
                                        حالة المركز
                                    </InputLabel>
                                    <Select
                                        name="status"
                                        labelId="status"
                                        id="status"
                                        value={selectedCenterStatus}
                                        onChange={(event) => {
                                            setSelectedCenterStatus(event.target.value);
                                            console.log(event.target.value)
                                        }}
                                        label="حالة المركز"
                                        MenuProps={{
                                            sx: {
                                                "&& .Mui-selected": {
                                                    color: "var(--system-light-theme-color)",
                                                    backgroundColor: "primary.main",
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem
                                            key={1}
                                            value={'مفتوح'}
                                        >
                                            مفتوح
                                        </MenuItem>
                                        <MenuItem
                                            key={2}
                                            value={'مغلق'}
                                        >
                                            مغلق
                                        </MenuItem>
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