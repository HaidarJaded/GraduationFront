import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {
    Autocomplete,
    Box,
    CircularProgress,
    FormControl,
    Grid, InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useForm} from "react-hook-form";
import {getValidationObject, Notify} from "../../utils";
import {servicesServices} from "../../Routes/api/services";
import {deviceServices, usersServices} from "../../Routes";
import {clientsServices} from "../../Routes/api/clients";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress";
import {reset} from "next/dist/lib/picocolors";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function AddDevice({...props}) {
    const {open} = props;
    const {update} = props;

    const [data, setData] = useState({
        model: "", client_id: "", customer_id: "", customer_complaint: ""
    });

    const formOptions = getValidationObject('model','customer_complaint','imei');
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;
    const [addState,setAddState]=useState(false);

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
                setError(data?.message=== "Successful" ? 'لا يوجد عملاء':"لقد حدث خطأ أثناء جلب البيانات");
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
            fetchAndSetClientsOptions();
        }
    }, [open]);


    const onSubmit = async (device) => {
        setAddState(true);
        console.log('client_id',selectedCLientName)
        const data = Object.assign(device, {repaired_in_center: 1,client_id:selectedCLientName})
        console.log('data',data)
        const response =  await deviceServices.addDevice(data);
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
                }>إضافة </DialogTitle>
                <DialogContent>
                    <Box   sx={{width: "400px"}}>
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
                                {...register('imei')}
                                error={!!errors.imei}
                                helperText={errors.imei?.message}
                            />
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
                            <Grid item xs={12} sx={{ marginTop: 1 }}>
                                <FormControl fullWidth>

                                    {isLoading ? (
                                        <Grid>
                                            <Typography variant="h5" sx={{marginBottom: 2, color: "#8f8aa8eb",fontSize: '17px'}}>
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
                                                style: { color: 'red' }
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

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props?.onClose}>إلغاء</Button>
                    <Button type='submit' disabled={addState}>إضافة</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}