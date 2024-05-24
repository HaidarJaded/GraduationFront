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
import {deviceServices} from "../../Routes";
import {useRouter} from "next/router";
import {Notify} from "../../utils";
//import {ModelsEnum} from "../../enums";
//import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditDeliverie({...props}) {
    const {open} = props;
    const [id, setId] = useState(props.id)
    const route = useRouter()
    const [data, setData] = useState();
    const {update} = props;

    const fetchAndSetUsers = useCallback(async () => {
        const params = {
            'repaired_in_center': 1,
            'with': 'client,user',
            'orderBy': 'date_receipt',
            'dir': 'desc',
            'deliver_to_client': 0,
        };
        const response = await deviceServices.getDevice(id, params);
        setData(response);
    }, [id]);

    useEffect(() => {
        fetchAndSetUsers();
    }, [fetchAndSetUsers]);


    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;


    const onSubmit = async () => {
        let dataDevice = {}
        if (selectedInfo && selectedInfo !== data?.info)
            Object.assign(dataDevice, {"info": selectedInfo})
        // if (selectedFixSteps && selectedFixSteps !== data?.fix_steps)
        //     Object.assign(dataDevice, {"fix_steps": selectedFixSteps})
        console.log(selectedModel)
        console.log(data?.model)
        if (selectedModel && selectedModel !== data?.model)
            Object.assign(dataDevice, {"model": selectedModel})
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
    //const [selectedFixSteps, setSelectedFixSteps] = useState(data?.info);
    const [selectedModel, setSelectedModel] = useState(data?.model);
    const [modelOptions, setModelOptions] = useState([]);

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
            // case 'fix_steps' :
            //     setSelectedFixSteps(event.target.value)
            //     break;
            case 'model':
                setSelectedModel(event.target.value)
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
                }>{"تعديل معلومات عامل التوصيل"}</DialogTitle>
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