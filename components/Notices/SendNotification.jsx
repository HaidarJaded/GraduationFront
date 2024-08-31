import * as React from 'react';
import {useEffect, useState} from "react";
import {getValidationObject, Notify} from "../../utils";
import {useForm} from "react-hook-form";
import {servicesProducts} from "../../Routes/api/products";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    InputLabel, List, ListItem, Checkbox, ListItemButton, ListItemText, ListSubheader
} from '@mui/material';
import {usersServices} from "../../Routes";
import {clientsServices} from "../../Routes/api/clients";


export function SendNotification({...props})
{
    const {open} = props;
    const {update} = props;

    const formOptions = getValidationObject();
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [recipientType, setRecipientType] = useState('all');
    const [specificUser, setSpecificUser] = useState('');
    const [mixedGroupClients, setMixedGroupClients] = useState([]);
    const [mixedGroup, setMixedGroup] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [checkedUsers, setCheckedUsers] = useState([]);

    const fetchMixedGroup = async ()=>{
        try {
            const mixedGroup= await usersServices.getAll();
            mixedGroup? setMixedGroup(mixedGroup?.data.body):setMixedGroup([]);
            console.log(mixedGroup)
        }
        catch (error)
        {
            console.log(error)
        }
    }

    const fetchMixedGroupClients = async ()=>{
        try {
            const mixedGroupClients= await clientsServices.getAll();
            mixedGroupClients? setMixedGroupClients(mixedGroupClients?.data.body):setMixedGroupClients([]);

        }
        catch (error)
        {
            console.log(error)
        }
    }
    useEffect(() => {
        if (recipientType === 'mixed') {
            fetchMixedGroupClients();

        } else {
            setMixedGroupClients([]);
        }
    }, [recipientType]);

    useEffect(() => {
        if (recipientType === 'mixed') {
            fetchMixedGroup();

        } else {
            setMixedGroup([]);
        }
    }, [recipientType]);

    const handleToggle = (user) => {
        const { id, rule_id } = user;
        const userKey = `${id}-${rule_id}`;

        const currentIndex = checkedUsers.findIndex(
            (checkedUser) => `${checkedUser.id}-${checkedUser.rule_id}` === userKey
        );

        const newChecked = [...checkedUsers];
        if (currentIndex === -1) {
            newChecked.push(user);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedUsers(newChecked);
    };

    const onSubmit = async (user) => {
        console.log(recipientType);
        console.log(checkedUsers);
        console.log('checkedUsers');

    };
    return (
        <>
            <Dialog
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                open={open}
                keepMounted
                onClose={props?.onCloseDialog}
                aria-describedby="alert-dialog-slide-description"
                noValidate
            >
                <DialogTitle sx={
                    {
                        fontWeight: "bold",
                        direction: "rtl",
                        color: '#20095e'
                    }
                }>إرسال إِشعار </DialogTitle>
                <DialogContent>
                    <Box   sx={{width: "400px"}}>

                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="عنوان الإشعار "
                                name="name"
                                autoComplete="name"
                                autoFocus
                            />
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                margin="normal"
                                label="نص الإشعار"
                                multiline
                                rows={2}
                                fullWidth
                            />
                        </Box>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">اختر المستلمين</FormLabel>
                            <RadioGroup row value={recipientType} onChange={(e) => setRecipientType(e.target.value)}>
                                <FormControlLabel value="all" control={<Radio />} label="للجميع" />
                                <FormControlLabel value="technicians" control={<Radio />} label="للفنيين فقط" />
                                <FormControlLabel value="clients" control={<Radio />} label="للعملاء فقط" />
                                <FormControlLabel value="deliveries" control={<Radio />} label="لعمال التوصيل فقط" />
                                <FormControlLabel value="specific" control={<Radio />} label="لمستخدم محدد" />
                                <FormControlLabel value="mixed" control={<Radio />} label="لمجموعة محددة" />
                            </RadioGroup>
                        </FormControl>
                        {recipientType === 'specific' && (
                            <>
                                <TextField
                                    margin="dense"
                                    label="اسم المستخدم"
                                    fullWidth
                                    value={specificUser}
                                    onChange={(e) => setSpecificUser(e.target.value)}
                                />
                                <TextField
                                    margin="dense"
                                    label="دور المستخدم"
                                    fullWidth
                                    value={userRole}
                                    onChange={(e) => setUserRole(e.target.value)}
                                />
                            </>
                        )}
                        {recipientType === 'mixed' && (
                            <FormControl fullWidth margin="normal">
                                <InputLabel>اختر المستخدمين</InputLabel>
                                <Select
                                    multiple
                                    value={[]}
                                    onChange={() => {}}
                                >
                                    <ListSubheader>عمال التوصيل</ListSubheader>
                                    <MenuItem>
                                        <List dense sx={{
                                            width: '100%',
                                            maxWidth: 560,
                                            bgcolor: '#ddd2d245',
                                            borderRadius: '10px',
                                            paddingRight: '44px'
                                        }}>
                                            {mixedGroup?.map((user) => {
                                                if (user.rule_id === 4) {
                                                    return (
                                                        <>
                                                        <ListItem
                                                            sx={{ maxWidth: 560 }}
                                                            key={user.id}
                                                            secondaryAction={
                                                                <Checkbox
                                                                    edge="end"
                                                                    // checked={checkedUsers.indexOf(user.id) !== -1}
                                                                    // onChange={() => handleToggle(user.id)}
                                                                    checked={checkedUsers.some(
                                                                        (checkedUser) =>
                                                                            checkedUser.id === user.id && checkedUser.rule_id === user.rule_id
                                                                    )}
                                                                    onChange={() => handleToggle(user)}
                                                                />
                                                            }
                                                        >
                                                            <ListItemButton>
                                                                <ListItemText id={user.id} primary={`${user.name} ${user.last_name}`} />
                                                            </ListItemButton>
                                                        </ListItem>
                                                        </>
                                                    );
                                                }
                                            })}
                                        </List>
                                    </MenuItem>
                                    <ListSubheader>الفنيين</ListSubheader>
                                    <MenuItem>
                                        <List dense sx={{
                                            width: '100%',
                                            maxWidth: 560,
                                            bgcolor: '#ddd2d245',
                                            borderRadius: '10px',
                                            paddingRight: '44px'
                                        }}>
                                            {mixedGroup?.map((user) => {
                                                if (user.rule_id === 2) {
                                                    return (
                                                        <>
                                                            <ListItem
                                                                sx={{ maxWidth: 560 }}
                                                                key={user.id}
                                                                secondaryAction={
                                                                    <Checkbox
                                                                        edge="end"
                                                                        // checked={checkedUsers.indexOf(user.id) !== -1}
                                                                        // onChange={() => handleToggle(user.id)}
                                                                        checked={checkedUsers.some(
                                                                            (checkedUser) =>
                                                                                checkedUser.id === user.id && checkedUser.rule_id === user.rule_id
                                                                        )}
                                                                        onChange={() => handleToggle(user)}
                                                                    />
                                                                }
                                                            >
                                                                <ListItemButton>
                                                                    <ListItemText id={user.id} primary={`${user.name} ${user.last_name}`} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </>
                                                    );
                                                }
                                            })}
                                        </List>
                                    </MenuItem>
                                    <ListSubheader>العملاء</ListSubheader>
                                    <MenuItem>
                                        <List dense sx={{
                                            width: '100%',
                                            maxWidth: 560,
                                            bgcolor: '#ddd2d245',
                                            borderRadius: '10px',
                                            paddingRight: '44px'
                                        }}>
                                            {mixedGroupClients?.map((user) => {
                                                    return (
                                                        <>
                                                            <ListItem
                                                                sx={{ maxWidth: 560 }}
                                                                key={user.id}
                                                                secondaryAction={
                                                                    <Checkbox
                                                                        edge="end"
                                                                        // checked={checkedUsers.indexOf(user.id) !== -1}
                                                                        // onChange={() => handleToggle(user.id)}
                                                                        checked={checkedUsers.some(
                                                                            (checkedUser) =>
                                                                                checkedUser.id === user.id && checkedUser.rule_id === user.rule_id
                                                                        )}
                                                                        onChange={() => handleToggle(user)}
                                                                    />
                                                                }
                                                            >
                                                                <ListItemButton>
                                                                    <ListItemText id={user.id} primary={`${user.name} ${user.last_name}`} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </>
                                                    );
                                            })}
                                        </List>
                                    </MenuItem>
                                </Select>
                            </FormControl>)}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props?.onCloseDialog}>إلغاء</Button>
                    <Button type='submit'>إرسال</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}