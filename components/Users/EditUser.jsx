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
import {usersServices} from "../../Routes";
import {useRouter} from "next/router";
import {getValidationObject, Notify} from "../../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function EditUser({...props}) {
    const {open} = props;
    const [ruleName, setRuleName] = useState(props.ruleName)
    const [ruleId, setRuleId] = useState(props.ruleId);
    const [id, setId] = useState(props.id);
    const route = useRouter()
    const [data, setData] = useState();
    const {update} = props;

    const [selectedName, setSelectedName] = useState(data?.name);
    const [selectedLastName, setSelectedLastName] = useState(data?.last_name);
    const [selectedEmail, setSelectedEmail] = useState(data?.email);
    const [selectedPhone, setSelectedPhone] = useState(data?.phone);
    const [selectedAddress, setSelectedAddress] = useState(data?.address);

    const fetchAndSetUser = useCallback(async () => {
        const params = {
            'dir': 'desc',
        };
        const response = await usersServices.getUser(id, params);
        await setData(response);
    }, [id])

    useEffect(() => {
        fetchAndSetUser();
    }, [fetchAndSetUser]);


    const formOptions = getValidationObject("email","name","last_name",'phone');
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;


    const onSubmit = async () => {
        let dataUser = {}
        if (selectedEmail && selectedEmail !== data?.email)
            Object.assign(dataUser, {"email": selectedEmail})
        if (selectedName && selectedName !== data?.name)
            Object.assign(dataUser, {"name": selectedName})
        if (selectedLastName && selectedLastName !== data?.last_name)
            Object.assign(dataUser, {"last_name": selectedLastName})
        if (selectedAddress && selectedAddress !== data?.address)
            Object.assign(dataUser, {"address": selectedAddress})
        if (selectedPhone && selectedPhone !== data?.phone)
            Object.assign(dataUser, {"phone": selectedPhone})
        if (Object.keys(dataUser).length > 0) {
            const data = Object.assign(dataUser, {rule_id: ruleId})
            try {
                const response = await usersServices.updateUser(id, data);
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
            case 'email' :
                setSelectedEmail(event.target.value)
                break;
            case 'name' :
                setSelectedName(event.target.value)
                break;
            case 'last_name' :
                setSelectedLastName(event.target.value);
                break;
            case 'phone':
                setSelectedPhone(event.target.value)
                break;
            case 'address':
                setSelectedAddress(event.target.value)
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
                }>{`  تعديل ${ruleName} `}</DialogTitle>
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
                                    {...register('name')}
                                    helperText={errors.name ? errors.name.message : ''}
                                    error={!!errors.name}
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
                                    {...register('last_name')}
                                    helperText={errors.last_name ? errors.last_name.message : ''}
                                    error={!!errors.last_name}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="email"
                                    defaultValue={`${data?.email || ''}`}
                                    fullWidth
                                    id="email"
                                    label="email"
                                    {...register('email')}
                                    helperText={errors.email ? errors.email.message : ''}
                                    error={!!errors.email}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    onKeyUp={handleKeyUp}
                                    name="address"
                                    defaultValue={`${data?.address || ''}`}
                                    fullWidth
                                    id="address"
                                    label="العنوان"

                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                            <TextField
                                margin="normal"
                                onKeyUp={handleKeyUp}
                                name="phone"
                                defaultValue={`${data?.phone || ''}`}
                                fullWidth
                                id="phone"
                                label="الهاتف"
                                {...register('phone')}
                                helperText={errors.phone ? errors.phone.message : ''}
                                error={!!errors.phone}
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