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
import {clientsServices} from "../../Routes/api/clients";
//import {ModelsEnum} from "../../enums";
//import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditClient({...props}) {
    const {open} = props;
    const [id, setId] = useState(props.id)
    const route = useRouter()
    const [data, setData] = useState();
    const {update} = props;

    const [selectedCenterName, setSelectedCenterName] = useState(data?.center_name);



    const fetchAndSetClient = useCallback(async () => {

        const params = {
            'dir': 'desc',
        };
        const response = await clientsServices.getClient(id, params);
        await setData(response);
    }, [id])


    useEffect(() => {
        fetchAndSetClient()
    }, [fetchAndSetClient])

    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;


    const onSubmit = async () => {
        let dataClient = {}
        if (selectedCenterName && selectedCenterName !== data?.center_name)
            Object.assign(dataClient, {"center_name": selectedCenterName})

        if (Object.keys(dataClient).length > 0) {
            try {
                const response = await clientsServices.updateClients(id, dataClient);
                Notify("light", response.message, "success")
                props.onCloseDialog()
                update('update');
            } catch (error) {
                console.log(error)
            }

        }
    }



    function handleKeyUp(event) {
        let keyName = event.target.name;
        switch (keyName) {
            case 'center_name' :
                setSelectedCenterName(event.target.value);
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
                    {"تعديل معلومات العميل"}</DialogTitle>
                <DialogContent>

                    {data ? (
                        <Grid container maxWidth="lg" spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="center_name"
                                    defaultValue={`${data?.center_name || ''}`}
                                    fullWidth
                                    id="center_name"
                                    label="اسم مركز العميل"
                                    autoFocus
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
                    <Button onClick={props?.onCloseDialog}>إلغاء</Button>
                    <Button type={'submit'}>تعديل</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}