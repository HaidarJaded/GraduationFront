import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Checkbox, CircularProgress, Grid, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {deviceServices} from "../../Routes";
import {useRouter} from "next/router";
import {Notify} from "../../utils";
import {ListItemText,ListItemButton,ListItem,List} from "@mui/material";
import {permissionsServices} from "../../Routes/api/permissions";
//import {ModelsEnum} from "../../enums";
//import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function AllPermissions({...props}) {
    const [checked, setChecked] = React.useState([1]);

    // const handleToggle = (value) => () => {
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];
    //
    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }
    //
    //     setChecked(newChecked);
    // };
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


    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;



    const [selectedInfo, setSelectedInfo] = useState(data?.info);
    //const [selectedFixSteps, setSelectedFixSteps] = useState(data?.info);
    const [selectedModel, setSelectedModel] = useState(data?.model);

    return (
        <>
            <Dialog
                component="form"
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
                    <List dense sx={{ width: '100%', maxWidth: 560,bgcolor: '#ddd2d245',borderRadius:'78px',paddingRight: '44px'}}>

                        {allPermissions.map((permission) => {
                          //  const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                                <ListItem
                                    sx={{ maxWidth: 560 }}
                                    key={permission.id}
                                    secondaryAction={
                                        <Checkbox
                                             edge="end"
                                            // onChange={handleToggle(value)}
                                            // checked={checked.indexOf(value) !== -1}
                                            // inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    }

                                >
                                    <ListItemButton>
                                        <ListItemText id={permission.id} primary={permission.name} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props?.onCloseDialog}>Disagree</Button>
                    <Button type={'submit'}>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}