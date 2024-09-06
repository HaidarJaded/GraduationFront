import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Autocomplete, Box, FormControl, Grid, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {getValidationObject, Notify} from "../../utils";
import {deviceServices, usersServices} from "../../Routes";
import {clientsServices} from "../../Routes/api/clients";
import IconButton from "@mui/material/IconButton";
import {CameraAlt} from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress";
import {BrowserMultiFormatReader} from "@zxing/browser";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function AddDevice({...props}) {
    const {open} = props;
    const {update} = props;

    const [data, setData] = useState({
        model: "", client_id: "", customer_id: "", customer_complaint: ""
    });

    const formOptions = getValidationObject('model', 'customer_complaint', 'imei');
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;
    const [addState, setAddState] = useState(false);

    const [selectedCLientName, setSelectedClientName] = useState(null);
    const [clientsOptions, setClientsOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAndSetClientsOptions = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await clientsServices.getAll();
            const data = await response?.data;
            const status = await response?.status;

            if (status === 200 && data?.body?.length > 0) {
                setClientsOptions(data?.body);

            } else {
                setClientsOptions([]);
                setError(data?.message === "Successful" ? 'لا يوجد عملاء' : "لقد حدث خطأ أثناء جلب البيانات");
            }
        } catch (error) {
            setError("لقد حدث خطأ أثناء جلب البيانات.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAndSetClientsOptions();
    }, [fetchAndSetClientsOptions]);

    useEffect(() => {
        if (open) {

            // reset({
            //     model: '',
            //     customer_complaint: '',
            //     imei: '',
            //     info: ''
            // });

            console.log("open Dialog true")
            fetchAndSetUsersOptions();
            fetchAndSetClientsOptions();
        }
    }, [open]);

    const [selectedUserName, setSelectedUserName] = useState(null);
    const [usersOptions, setUsersOptions] = useState([]);
    const [isLoadingUsersOptions, setIsLoadingUsersOptions] = useState(true);
    const [errorUsersOptions, setErrorUsersOptions] = useState(null);

    const fetchAndSetUsersOptions = useCallback(async () => {

        setIsLoadingUsersOptions(true);
        setErrorUsersOptions(null);
        const params = {
            'rule*name': 'فني',
            'all_data': 1,
        };
        try {
            const response = await usersServices.getAll(params);
            const data = await response?.data;
            const status = await response?.status;

            if (status === 200 && data?.body?.length > 0) {
                setUsersOptions(data?.body);

            } else {
                setUsersOptions([]);
                setErrorUsersOptions(data?.message === "Successful" ? 'لا يوجد فنيين' : "لقد حدث خطأ أثناء جلب البيانات");
            }
        } catch (error) {
            setErrorUsersOptions("لقد حدث خطأ أثناء جلب البيانات.");
        } finally {
            setIsLoadingUsersOptions(false);
        }
    }, []);

    useEffect(() => {
        fetchAndSetUsersOptions();
    }, [fetchAndSetUsersOptions]);

    const [openScanBarcode, setOpenScanBarcode] = useState(false);
    const [text, setText] = useState('');

    // const handleScanBarcode = async () => {
    //     setOpenScanBarcode(true);
    //     const codeReader = new BrowserMultiFormatReader();
    //     try {
    //         const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();
    //         const selectedDeviceId = videoInputDevices[0].deviceId;
    //         const result = await codeReader.decodeOnceFromVideoDevice(selectedDeviceId, 'video');
    //         setText(invertValue(result.text));
    //         setOpenScanBarcode(false);
    //     } catch (error) {
    //         console.error(error);
    //         setOpenScanBarcode(false);
    //     } finally {
    //         codeReader.reset();
    //     }
    // };
    // const handleScanBarcodeClose = () => {
    //     setOpenScanBarcode(false);
    // }
    const invertValue = (value) => {
        return value.split('').reverse().join('');
    };

    function formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const onSubmit = async (device) => {
        setAddState(true);

        const data = Object.assign(device,
    {
                repaired_in_center: 1,
                user_id: selectedUserName,
                client_id: selectedCLientName,
                date_receipt: formatDateTime(new Date())
            })

        const response = await deviceServices.addDevice(data);
        if (response?.status === 200) {
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
                }>إضافة جهاز</DialogTitle>
                <DialogContent>
                    <Box sx={{width: "400px"}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="model"
                                label="model "
                                name="model"
                                autoComplete="model"
                                autoFocus
                                {...register('model')}
                                error={!!errors.model}
                                helperText={errors.model?.message}
                            />
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="customer_complaint"
                                label="شكوى الزبون"
                                name="customer_complaint"
                                autoComplete="customer_complaint"
                                {...register('customer_complaint')}
                                error={!!errors.customer_complaint}
                                helperText={errors.customer_complaint?.message}
                            />
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="imei"
                                label="imei"
                                name="imei"
                                autoComplete="imei"
                                // value={text} onChange={(e) => setText(e.target.value)}
                                {...register('imei')}
                                error={!!errors.imei}
                                helperText={errors.imei?.message}

                            />
                            {/*<IconButton onClick={handleScanBarcode}>*/}
                            {/*    <CameraAlt/>*/}
                            {/*</IconButton>*/}
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="info"
                                label="info"
                                name="info"
                                autoComplete="info"
                                {...register('info')}
                            />
                        </Box>

                        <Grid container maxWidth="lg" spacing={1}>
                            <Grid item xs={12} sx={{marginTop: 1}}>
                                <FormControl fullWidth>

                                    {isLoading ? (
                                        <Grid>
                                            <Typography variant="h5"
                                                        sx={{marginBottom: 2, color: "#8f8aa8eb", fontSize: '17px'}}>
                                                جاري تحميل العملاء
                                            </Typography>
                                            <Box sx={{width: '100%'}}>
                                                <LinearProgress/>
                                            </Box>
                                        </Grid>

                                    ) : error ? (
                                        <TextField
                                            fullWidth
                                            disabled
                                            value={error}
                                            InputProps={{
                                                readOnly: true,
                                                style: {color: 'red'}
                                            }}
                                        />
                                    ) : (
                                        <Autocomplete
                                            options={clientsOptions}
                                            getOptionLabel={(option) => `${option?.name} ${option?.last_name}`}
                                            onChange={(event, newValue) => {
                                                setSelectedClientName(newValue?.id);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="ابحث عن العميل"
                                                    variant="outlined"
                                                />
                                            )}
                                            noOptionsText="لا توجد بيانات"
                                        />
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container maxWidth="lg" spacing={1}>
                            <Grid item xs={12} sx={{marginTop: 1}}>
                                <FormControl fullWidth>

                                    {isLoadingUsersOptions ? (
                                        <Grid>
                                            <Typography variant="h5"
                                                        sx={{marginBottom: 2, color: "#8f8aa8eb", fontSize: '17px'}}>
                                                جاري تحميل الفنيين
                                            </Typography>
                                            <Box sx={{width: '100%'}}>
                                                <LinearProgress/>
                                            </Box>
                                        </Grid>

                                    ) : errorUsersOptions ? (
                                        <TextField
                                            fullWidth
                                            disabled
                                            value={error}
                                            InputProps={{
                                                readOnly: true,
                                                style: {color: 'red'}
                                            }}
                                        />
                                    ) : (
                                        <Autocomplete
                                            options={usersOptions}
                                            getOptionLabel={(option) => `${option?.name} ${option?.last_name}`}
                                            onChange={(event, newValue) => {
                                                setSelectedUserName(newValue?.id);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="ابحث عن الفني"
                                                    variant="outlined"
                                                />
                                            )}
                                            noOptionsText="لا توجد بيانات"
                                        />
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props?.onClose}>إلغاء</Button>
                    <Button type='submit' disabled={addState}>إضافة</Button>
                </DialogActions>
            </Dialog>
            {/*<Dialog open={openScanBarcode} onClose={handleScanBarcodeClose}>*/}
            {/*    <DialogContent>*/}
            {/*        <video id="video" style={{width: '100%'}}></video>*/}
            {/*    </DialogContent>*/}
            {/*</Dialog>*/}
        </>
    );
}