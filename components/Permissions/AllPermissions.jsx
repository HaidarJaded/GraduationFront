import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Checkbox, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {permissionsServices} from "../../Routes/api/permissions";
import {Notify} from "../../utils";
//import {ModelsEnum} from "../../enums";
//import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function AllPermissions({...props}) {
    const user = props.user
    const {open} = props;
    const [id, setId] = useState(props.id)
    const route = useRouter()
    const [data, setData] = useState();
    const {update} = props;

    const [allPermissions, setAllPermissions] = useState([]);

    const fetchAndSetPermissions = useCallback(async () => {
        const data = await permissionsServices.getAllPermissions();
        data ? setAllPermissions(data?.body) : setAllPermissions([]);
        console.log(data?.body);

    }, [])

    useEffect(() => {
        fetchAndSetPermissions();
    }, [fetchAndSetPermissions]);

    const [checkedPermissions, setCheckedPermissions] = useState([]);

    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;
    const handleToggle = (value) => {
        const currentIndex = checkedPermissions.indexOf(value);
        const newChecked = [...checkedPermissions];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedPermissions(newChecked);
    };

    const onSubmit = async () => {
        if (user === "Client") {
            let dataPermissionsClient = {};
            Object.assign(dataPermissionsClient, {"permissions_ids": checkedPermissions});
            Object.assign(dataPermissionsClient, {"client_id": id});
            if (Object.keys(dataPermissionsClient.permissions_ids).length > 0) {
                try {
                    const response = await permissionsServices.addPermissions(dataPermissionsClient);
                    Notify("light", response.message, "success")
                    props.onCloseDialog()
                    console.log(dataPermissionsClient)

                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log("false")
            }
        } else {
            let dataPermissionsUser = {};
            Object.assign(dataPermissionsUser, {"permissions_ids": checkedPermissions});
            Object.assign(dataPermissionsUser, {"user_id": id});
            if (Object.keys(dataPermissionsUser.permissions_ids).length > 0) {
                try {
                    const response = await permissionsServices.addPermissionsUser(dataPermissionsUser);
                    Notify("light", response.message, "success")
                    props.onCloseDialog()

                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log("false")
            }
        }


    };

    const [selectedInfo, setSelectedInfo] = useState(data?.info);
    //const [selectedFixSteps, setSelectedFixSteps] = useState(data?.info);
    const [selectedModel, setSelectedModel] = useState(data?.model);


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
            >
                <DialogTitle sx={
                    {
                        fontWeight: "bold",
                        direction: "rtl",
                        color: '#20095e'
                    }
                }>{"إضافة صلاحية"}</DialogTitle>
                <DialogContent>
                    <List dense sx={{
                        width: '100%',
                        maxWidth: 560,
                        bgcolor: '#ddd2d245',
                        borderRadius: '10px',
                        paddingRight: '44px'
                    }}>

                        {allPermissions.map((permission) => {
                            //  const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                                <ListItem
                                    sx={{maxWidth: 560}}
                                    key={permission.id}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            checked={checkedPermissions.indexOf(permission.id) !== -1}
                                            onChange={() => handleToggle(permission.id)}
                                        />
                                    }

                                >
                                    <ListItemButton>
                                        <ListItemText id={permission.id} primary={permission.name}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props?.onCloseDialog}>Disagree</Button>
                    <Button type={'submit'}>إضافة</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}