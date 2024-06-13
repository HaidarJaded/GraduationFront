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
import {deviceServices, usersServices} from "../../Routes";
import {useRouter} from "next/router";
import {Notify} from "../../utils";
//import {ModelsEnum} from "../../enums";
//import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditTechnician({...props}) {
    const {open} = props;
    const [id, setId] = useState(props.id)
    const route = useRouter()
    const [data, setData] = useState();
    const {update} = props;

    const fetchAndSetDevice = useCallback(async () => {
        const params = {
            'dir': 'desc',
        };
        const response = await usersServices.getUser(id, params);
        await setData(response);
    }, [id])

    useEffect(() => {
        fetchAndSetDevice();
    }, [fetchAndSetDevice]);


    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;


    const onSubmit = async () => {
        let dataUser = {}
        if (selectedName && selectedName !== data?.name)
            Object.assign(dataUser, {"name": selectedName})
        if (selectedLastName && selectedLastName !== data?.last_name)
            Object.assign(dataUser, {"last_name": selectedLastName})
        // if (selectedModel && selectedModel !== data?.model)
        //     Object.assign(dataUser, {"model": selectedModel})
        if (Object.keys(dataUser).length > 0) {
            try {
                const response = await usersServices.updateUser(id, dataUser);
                Notify("light", response.message, "success")
                props.onCloseDialog()
                update('update');
            } catch (error) {
                console.log(error)
            }

        }
    }

    const [selectedName, setSelectedName] = useState(data?.name);
    const [selectedLastName, setSelectedLastName] = useState(data?.last_name);

    //const [selectedFixSteps, setSelectedFixSteps] = useState(data?.name);
   // const [selectedModel, setSelectedModel] = useState(data?.model);
    const [modelOptions, setModelOptions] = useState([]);

    // useEffect(() => {
    //     const _ModelOptions = getEnum(ModelsEnum)
    //     setModelOptions(_ModelOptions)
    // }, [])


    function handleKeyUp(event) {
        let keyName = event.target.name;
        switch (keyName) {
            case 'name' :
                setSelectedName(event.target.value)
                break;
            case 'last_name' :
                setSelectedLastName(event.target.value)
                break;
            // case 'model':
            //     setSelectedModel(event.target.value)
            //     break;
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
                }>{"تعديل فني"}</DialogTitle>
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
                                    label="الاسم"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="last_name"
                                    defaultValue={`${data?.last_name || ''}`}
                                    fullWidth
                                    id="last_name"
                                    label="الكنية"
                                    autoFocus
                                />
                            </Grid>
                            {/*<Grid item xs={12} sm={6}>*/}
                            {/*    <TextField*/}
                            {/*        margin="normal"*/}
                            {/*        onKeyUp={handleKeyUp}*/}
                            {/*        name="model"*/}
                            {/*        defaultValue={`${data?.model || ''}`}*/}
                            {/*        fullWidth*/}
                            {/*        id="model"*/}
                            {/*        label="model"*/}

                            {/*    />*/}
                            {/*</Grid>*/}
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