import * as React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {CircularProgress, Grid, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {deviceServices} from "../../Routes";
import {useRouter} from "next/router";
import {getValidationObject, Notify} from "../../utils";
import {completedDevicesServices} from "../../Routes/api/completedDevices";
//import {ModelsEnum} from "../../enums";
//import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditCompletedDevice({...props}) {
    const {open} = props;
    const [id, setId] = useState(props.id)
    const route = useRouter()
    const [data, setData] = useState({});
    const dataRef = useRef(data);
    const {update} = props;

    const [selectedInfo, setSelectedInfo] = useState(data?.info);
    const [selectedCostToClient, setSelectedCostToClient] = useState(data?.model);
    const [modelOptions, setModelOptions] = useState([]);

    const [info, setInfo] = useState('');
    const [costToClient, setCostToClient] = useState('');
    const [model, setModel] = useState('');

    useEffect(() => {
        setInfo(data?.info || '');

    }, [data?.info]);

    const handleInfoChange = (event) => {
        setInfo(event.target.value);
    };


    // Update local state whenever data.info changes
    useEffect(() => {
        setCostToClient(data?.cost_to_client || '');

    }, [data?.cost_to_client]);

    const handleCostToClientChange = (event) => {
        setCostToClient(event.target.value);
    };

    useEffect(() => {
        dataRef.current = data; // Update ref every time data changes
    }, [data]);

    const fetchAndSetDevice = useCallback(async () => {
        const params = {
            'repaired_in_center': 1,
            'with': 'client,user',
            'orderBy': 'date_receipt',
            'dir': 'desc',
            'deliver_to_client': 0,
        };
        const response = await completedDevicesServices.getCompletedDevice(id, params);
        await setData(response);
        console.log("kkkkkkksssskkkkkk",response);
    }, [id]);


    useEffect(()=>{
        setId(props.id);
    },[props.id])

    useEffect(() => {
        fetchAndSetDevice();
    }, [fetchAndSetDevice]);

    useEffect(() => {
        setSelectedInfo(data?.info);
        setSelectedCostToClient(data?.cost_to_client);
    }, [data]);

    const formOptions = getValidationObject("cost_to_client");
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;


    const onSubmit = async () => {
        let dataDevice = {}
        if (selectedInfo && selectedInfo !== data?.info)
            Object.assign(dataDevice, {"info": selectedInfo})

        if (selectedCostToClient && setSelectedCostToClient !== data?.cost_to_client)
            Object.assign(dataDevice, {"cost_to_client": selectedCostToClient})

        if (Object.keys(dataDevice).length > 0) {
            try {
                const response = await completedDevicesServices.updateCompletedDevice(id, dataDevice);
                Notify("light", response.message, "success")
                props.onCloseDialog()
                update('update');
            } catch (error) {
                console.log(error)
            }

        }
    }



    // useEffect(() => {
    //     const _ModelOptions = getEnum(ModelsEnum)
    //     setModelOptions(_ModelOptions)
    // }, [])


    function handleKeyUp(event) {
        let keyName = event.target.name;
        switch (keyName) {
            case 'info' :
                setSelectedInfo(event.target.value)
                break;
            case 'cost_to_client':
                setSelectedCostToClient(event.target.value)
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
                }>{"تعديل جهاز"}</DialogTitle>
                <DialogContent>

                    {data ? (
                        <Grid container maxWidth="lg" spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="info"
                                    value={info}
                                    onChange={handleInfoChange}
                                    fullWidth
                                    id="info"
                                    label="Info"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="cost_to_client"
                                    value={costToClient}
                                    onChange={handleCostToClientChange}
                                    fullWidth
                                    id="cost_to_client"
                                    label="الكلفة"
                                    {...register('cost_to_client')}
                                    helperText={errors.cost_to_client && errors.cost_to_client?.message || (data.cost_to_client?.length > 0 && data.cost_to_client[0])}
                                    error={(errors.cost_to_client || data.cost_to_client?.length > 0) && true}

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
                    <Button onClick={props?.onCloseDialog}>Disagree</Button>
                    <Button type={'submit'}>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}