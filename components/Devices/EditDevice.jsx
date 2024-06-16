import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {deviceServices, usersServices} from "../../Routes";
import {useRouter} from "next/router";
import {getValidationObject, Notify} from "../../utils";
// import {ModelsEnum} from "../../enums";
// import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditDevice({...props}) {
    const {open} = props;
    const [id, setId] = useState(props.id);
    const route = useRouter()
    const [data, setData] = useState();
    const {update} = props;

    const fetchAndSetDevice = useCallback(async () => {
        const params = {
            'repaired_in_center': 1,
            'with': 'client,user',
            'orderBy': 'date_receipt',
            'dir': 'desc',
            'deliver_to_client': 0,
        };
        const response = await deviceServices.getDevice(id, params);
        console.log(response)
        await setData(response);
    }, [id])

    useEffect(() => {
        fetchAndSetDevice();
    }, [fetchAndSetDevice]);


    const formOptions = getValidationObject("cost_to_client");
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;


    const onSubmit = async () => {
        let dataDevice = {}
        if (selectedInfo && selectedInfo !== data?.info)
            Object.assign(dataDevice, {"info": selectedInfo})
        console.log(selectedModel)
        console.log(data?.model)
        if (selectedUserName && selectedUserName !== data?.user?.id)
            Object.assign(dataDevice, {"user_id": selectedUserName})
        if (selectedModel && selectedModel !== data?.model)
            Object.assign(dataDevice, {"model": selectedModel})
        if (selectedCostToClient && selectedCostToClient !== data?.cost_to_client)
            Object.assign(dataDevice, {"cost_to_client": selectedCostToClient})
        if (Object.keys(dataDevice).length > 0) {
            try {
                const response = await deviceServices.updateDevice(id, dataDevice);
                Notify("light", response.message, "success")
                props.onCloseDialog()
                update('update');
            } catch (error) {
                console.log(error)
            }

        }
    }

    const [selectedInfo, setSelectedInfo] = useState(data?.info);
    const [selectedCostToClient, setSelectedCostToClient] = useState(data?.cost_to_client);
    const [selectedUserName, setSelectedUserName] = useState(data?.user?.id);
    const [selectedModel, setSelectedModel] = useState(data?.model);
    const [modelOptions, setModelOptions] = useState([]);

    const fetchAndSetModelOptions = useCallback(async () => {
        const params = {
            'rule*name': 'فني',
            'all_data': 1,
        };
        const data = await usersServices?.getAll(params);
        console.log("data?.body للفنيين",data?.body)
        data ? setModelOptions(data?.body) : setModelOptions([]);
    }, []);

    useEffect(() => {
        fetchAndSetModelOptions();
    }, [fetchAndSetModelOptions]);


    function handleKeyUp(event) {
        let keyName = event.target.name;
        switch (keyName) {
            case 'info' :
                setSelectedInfo(event.target.value)
                break;
            case 'cost_to_client':
                setSelectedCostToClient(event.target.value)
                break;
            case 'model':
                setSelectedModel(event.target.value)
                break;
            case 'userName':
                setSelectedUserName(event.target.value)
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
                            <Grid item xs={12} sx={{maxWidth:1}}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="info"
                                    defaultValue={`${data?.info || ''}`}
                                    fullWidth
                                    id="info"
                                    label="معلومات الجهاز"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="model"
                                    defaultValue={`${data?.model || ''}`}
                                    fullWidth
                                    id="model"
                                    label="model"

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="cost_to_client"
                                    defaultValue={`${data?.cost_to_client || ''}`}
                                    fullWidth
                                    id="cost_to_client"
                                    label="الكلفة"
                                    {...register('cost_to_client')}
                                    helperText={errors.cost_to_client && errors.cost_to_client?.message || (data.cost_to_client?.length > 0 && data.cost_to_client[0])}
                                    error={(errors.cost_to_client || data.cost_to_client?.length > 0) && true}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{marginTop:1}}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        id="userName">
                                        اسم الفني المسؤول عن الجهاز
                                    </InputLabel>
                                    <Select
                                        name={"userName"}
                                        labelId="userName"
                                        id="userName"
                                        value={selectedUserName}
                                        onChange={(event) => setSelectedUserName(event.target.value)}
                                        label="اسم الفني المسؤول عن الجهاز"
                                        MenuProps={{
                                            sx: {
                                                "&& .Mui-selected": {
                                                    color: "var(--system-light-theme-color)",
                                                    backgroundColor: "primary.main",
                                                },
                                            },
                                        }}
                                    >
                                        {modelOptions?.map((user) => (
                                            <MenuItem
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {`${user.name}  ${user.last_name}`}
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