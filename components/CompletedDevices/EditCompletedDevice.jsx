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
import {Notify} from "../../utils";
// import {ModelsEnum} from "../../enums";
// import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";
import {completedDevices, completedDevicesServices} from "../../Routes/api/completedDevices";
import {deviceServices} from "../../Routes";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditCompletedDevice({...props}) {
    console.log("EditCompletedDevice after open pop",props.id);
    const {open} = props;
    const [id, setId] = useState(props.id)
    const route = useRouter()
    const [data, setData] = useState();
    const {update} = props;

    const fetchAndSetCompletedDevice = useCallback(async () => {
        const params = {
            'repaired_in_center': 1,
            'orderBy': 'date_delivery',
            'dir': 'desc',
        };
        console.log("shhsffffeesss", id);
        const response = await completedDevicesServices.getCompletedDevice(id, params);
        setData(response);
        console.log(response);
    }, [id]);

    useEffect(() => {
        // تحديث id عندما تتغير props.id
        setId(props.id);
    }, [props.id]);

    useEffect(() => {
        fetchAndSetCompletedDevice();
    }, [id, fetchAndSetCompletedDevice]);


    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;


    const onSubmit = async () => {
        let dataDevice = {}
        if (selectedInfo && selectedInfo !== data?.info)
            Object.assign(dataDevice, {"info": selectedInfo})
        // if (selectedFixSteps && selectedFixSteps !== data?.fix_steps)
        //     Object.assign(dataDevice, {"fix_steps": selectedFixSteps})
        if (selectedModel && selectedModel !== data?.model)
            Object.assign(dataDevice, {"model": selectedModel})
        if (selectedUserName && selectedUserName !== data?.user_name)
            Object.assign(dataDevice, {"user_name": selectedUserName})
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

    const [selectedInfo, setSelectedInfo] = useState(data?.info);
    // const [selectedFixSteps, setSelectedFixSteps] = useState(data?.info);
    const [selectedModel, setSelectedModel] = useState(data?.model);
    const [selectedUserName, setSelectedUserName] = useState(data?.user_name);

    //  const [modelOptions, setModelOptions] = useState([]);

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
            case 'model' :
                setSelectedModel(event.target.value)
                break;
            case 'user_name' :
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
                }>{"تعديل الأجهزة التي تم تسليمها"}</DialogTitle>
                <DialogContent>

                    {data ? (
                        <Grid container maxWidth="lg" spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="info"
                                    defaultValue={`${data?.info || ''}`}
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
                                    name="model"
                                    defaultValue={`${data?.model || ''}`}
                                    fullWidth
                                    id="model"
                                    label="model"

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="user_name"
                                    defaultValue={`${data?.user_name || ''}`}
                                    fullWidth
                                    id="user_name"
                                    label="user name"

                                />
                            </Grid>
                            {/*    <Grid item xs={12}>*/}
                            {/*        <FormControl fullWidth>*/}
                            {/*            <InputLabel*/}
                            {/*                id="model">*/}
                            {/*                Model*/}
                            {/*            </InputLabel>*/}
                            {/*            <Select*/}
                            {/*                name={"model"}*/}
                            {/*                labelId="model"*/}
                            {/*                id="model"*/}
                            {/*                value={selectedModel}*/}
                            {/*                onChange={(event) => setSelectedModel(event.target.value)}*/}
                            {/*                label="Model"*/}
                            {/*                MenuProps={{*/}
                            {/*                    sx: {*/}
                            {/*                        "&& .Mui-selected": {*/}
                            {/*                            color: "var(--system-light-theme-color)",*/}
                            {/*                            backgroundColor: "primary.main",*/}
                            {/*                        },*/}
                            {/*                    },*/}
                            {/*                }}*/}
                            {/*            >*/}
                            {/*                {modelOptions?.map((model) => (*/}
                            {/*                    <MenuItem*/}
                            {/*                        key={model.value}*/}
                            {/*                        value={model.value}*/}
                            {/*                    >*/}
                            {/*                        {model.title}*/}
                            {/*                    </MenuItem>*/}
                            {/*                ))}*/}
                            {/*            </Select>*/}

                            {/*        </FormControl>*/}
                            {/*    </Grid>*/}
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