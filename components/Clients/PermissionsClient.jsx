import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {Box, Fab, Grid, Paper} from "@mui/material";
import {styled} from "@mui/material/styles";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ListItem from "@mui/material/ListItem";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import {clientsServices} from "../../Routes/api/clients";
import AddIcon from "@mui/icons-material/Add";
import {AllPermissions} from "../Permissions";
import {permissionsServices} from "../../Routes/api/permissions";
import {Notify} from "../../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export function PermissionsClient({...props}) {
    const {open} = props;
    const [id, setId] = useState(props.id)
    console.log(id);

    const [rowIdAddPermissionsClient, setRowIdAddPermissionsClient] = React.useState(null);
    const [openAddPermissionsClient, setOpenAddPermissionsClient] = React.useState(false);
    const [deletingId, setDeletingId] = React.useState(null);


    const [permissionsClient, setPermissionsClient] = useState([]);
    const [permissionsRuleClient, setPermissionsRuleClient] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [ruleClient, setRuleClient] = useState({});
    const fetchAndSetPermissions = useCallback(async () => {
        const params = {
            'with': 'permissions,rule.permissions',
        };
        const data = await clientsServices.getAllClientPermissions(id, params);
        if (data) {
            setPermissionsClient(data.body);
            setPermissionsRuleClient(data.body?.rule?.permissions || []);
            setPermissions(data.body?.permissions || []);
            setRuleClient(data.body?.rule || {});
            console.log("test")
        } else {
            setPermissionsClient([]);
            setPermissions([]);
            setPermissionsRuleClient([]);
            setRuleClient([]);
            console.log("new test")

        }
        console.log(data ? data.body : []);
    }, [id]);

    useEffect(() => {
        fetchAndSetPermissions();
    }, [fetchAndSetPermissions]);

    const handleClose = () => {
        setOpenAddPermissionsClient(false);
        setRowIdAddPermissionsClient(null);
    };
    const reloadGrid = async update => {
        fetchAndSetPermissions()
    };
    const handleDeleteClick = (permissionId) => async () => {
        setDeletingId(permissionId);
        if (await permissionsServices.deletePermissionFromClient(id, permissionId)) {
            Notify("colored",
                "تم الحذف بنجاح", "success");
            //why id ?
            setPermissions(permissions.filter((permission) => permission.id !== permissionId));
        }
        setDeletingId(null);
        reloadGrid("update")
    };

    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={props?.onClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props?.onClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2} columns={14} sx={{direction: "rtl"}}>
                        <Grid item xs={12} md={6} sx={{margin: 3}}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row-reverse',  // هذا يجعل الأيقونة على اليسار والنص على اليمين
                                alignItems: 'center',
                                justifyContent: 'space-between',// لمحاذاة العناصر عموديًا
                                backgroundColor: "rgba(219,206,206,0.19)",
                                padding: 3,
                                borderRadius: "5%",
                            }}>

                                <Fab size="small" color="secondary" aria-label="add">
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={() => {
                                            setRowIdAddPermissionsClient(id);
                                            setOpenAddPermissionsClient(true);
                                            console.log("ssss")
                                        }}
                                        aria-label="close"
                                    >
                                        <AddIcon/>
                                    </IconButton>
                                </Fab>
                                <Typography sx={{
                                    color: "#442d5d",
                                    fontSize: 25,

                                }}>
                                    صلاحيات المستخدم :
                                </Typography>

                            </Box>
                            <Item>

                                <List sx={{
                                    width: '100%',
                                    maxWidth: '100%',
                                    minWidth: '50%',
                                    bgcolor: 'background.paper'
                                }}>
                                    {permissions?.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            secondaryAction={
                                                <IconButton edge="end"
                                                            aria-label="delete"
                                                            onClick={handleDeleteClick(item.id)}
                                                            disabled={deletingId === item.id}

                                                >

                                                    <DeleteIcon/>
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                sx={{textAlign: "start", margin: 0}}
                                                primary={<React.Fragment>
                                                    <Typography sx={{

                                                        padding: 1, color: "#442d5d",
                                                        fontSize: 20,
                                                        borderRadius: "5%",
                                                    }}>
                                                        {`صلاحية ${item.name}`}
                                                    </Typography>
                                                </React.Fragment>}

                                            />
                                        </ListItem>

                                    ))}

                                </List>
                            </Item>

                        </Grid>
                        <Grid item xs={12} md={6} sx={{margin: 3}}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row-reverse',  // هذا يجعل الأيقونة على اليسار والنص على اليمين
                                alignItems: 'center',
                                justifyContent: 'space-between',// لمحاذاة العناصر عموديًا
                                backgroundColor: "rgba(219,206,206,0.19)",
                                padding: 3,
                                borderRadius: "5%",
                            }}>

                                <Link href={'/rules'} passHref>
                                    <IconButton edge="start">
                                        <Typography sx={{
                                            color: "#442d5d",
                                            fontSize: 15,
                                            marginLeft: 2
                                        }}>
                                            جميع الأدوار
                                        </Typography>
                                        <ArrowCircleLeftOutlinedIcon/>
                                    </IconButton>
                                </Link>
                                <Typography sx={{
                                    color: "#442d5d",
                                    fontSize: 25,

                                }}>
                                    صلاحيات دور المستخدم ({ruleClient ? ruleClient.name : 'No name available'})
                                </Typography>

                            </Box>

                            <Item>

                                <List sx={{ width: '100%', maxWidth: '100%', minWidth: '50%', bgcolor: 'background.paper' }}>
                                    <ListItem
                                        key={ruleClient?.id}
                                        // secondaryAction={
                                        //     <IconButton edge="end" aria-label="delete">
                                        //         <DeleteIcon />
                                        //     </IconButton>
                                        // }
                                    >
                                        <ListItemText
                                            sx={{ textAlign: "start", margin: 1, fontSize: 100 }}
                                            primary={
                                                <React.Fragment>
                                                    <Typography sx={{
                                                        padding: 1, color: "#442d5d",
                                                        fontSize: 20,
                                                        borderRadius: "5%",
                                                    }}>
                                                        {permissionsRuleClient?.map((item, index) => (
                                                            // <ListItem
                                                            //     key={index}
                                                            //     secondaryAction={
                                                            //         <IconButton edge="end" aria-label="delete">
                                                            //             <DeleteIcon />
                                                            //         </IconButton>
                                                            //     }
                                                            // ></ListItem>
                                                            <ListItemText
                                                                key={index}
                                                                sx={{ textAlign: "start", margin: 0 }}
                                                                primary={<React.Fragment>
                                                                    <Typography sx={{

                                                                        padding: 1, color: "#442d5d",
                                                                        fontSize: 20,
                                                                        borderRadius: "5%",
                                                                    }}>
                                                                        {`صلاحية ${item.name}`}
                                                                    </Typography>
                                                                </React.Fragment>}
                                                            />

                                                        ))}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>

                                </List>
                            </Item>

                        </Grid>

                    </Grid>
                </Box>
            </Dialog>
            {rowIdAddPermissionsClient && (
                <AllPermissions
                    open={openAddPermissionsClient}
                    id={rowIdAddPermissionsClient}
                    onClose={handleClose}
                    update={reloadGrid}
                    user="Client"
                    userPermissions={permissions}/>


            )}
        </React.Fragment>
    );
}
