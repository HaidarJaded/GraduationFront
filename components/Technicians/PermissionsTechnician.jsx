import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
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
import {users} from "../../Routes";
import Link from "next/link";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import AddIcon from "@mui/icons-material/Add";
import {AllPermissions} from "../Permissions";

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
const permissionsExample = [
    { name: 'إدارة المستخدمين', description: 'يمكنه إدارة المستخدمين وتعديل صلاحياتهم' },
    { name: 'عرض التقارير', description: 'يمكنه عرض التقارير وتحليل البيانات' },
    // أضف المزيد من الصلاحيات حسب الحاجة
];



export function PermissionsTechnician({...props}) {
    const {open} = props;
    const [id, setId] = useState(props.id)
    console.log(id);


    const [rowIdAddPermissionsTechnician, setRowIdAddPermissionsTechnician] = React.useState(null);
    const [openAddPermissionsTechnician, setOpenAddPermissionsTechnician] = React.useState(false);



    const [permissionsTechnician, setPermissionsTechnician] = useState([]);
    const [permissionsRuleTechnician, setPermissionsRuleTechnician] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [ruleTechnician, setRuleTechnician] = useState({});
    const [allTechnicianPermission, setAllTechnicianPermission] = useState({});
    const fetchAndSetPermissions = useCallback(async () => {
        const params = {
            'with': 'permissions,rule.permissions',
        };
        const data = await users.getAllPermissions(id, params);
        if (data) {
            setPermissionsTechnician(data.body);
            setPermissionsRuleTechnician(data.body?.rule?.permissions || []);
            setPermissions(data.body?.permissions || []);
            setRuleTechnician(data.body?.rule || {});
            setAllTechnicianPermission(permissions.concat(permissionsRuleTechnician))
            console.log("test")
        } else {
            setPermissionsTechnician([]);
            setPermissions([]);
            setPermissionsRuleTechnician([]);
            setRuleTechnician([]);
            console.log("new test")

        }
        console.log(data ? data.body : []);
    }, []);

    useEffect(() => {
        fetchAndSetPermissions();
    }, []);
    const handleClose = () => {
        setOpenAddPermissionsTechnician(false);
        setRowIdAddPermissionsTechnician(null);
    };
    const reloadGrid = async update => {
        fetchAndSetPermissions()
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
                                            setRowIdAddPermissionsTechnician(id);
                                            setOpenAddPermissionsTechnician(true);
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

                                <List sx={{ width: '100%', maxWidth: '100%', minWidth: '50%', bgcolor: 'background.paper' }}>
                                    {permissionsRuleTechnician?.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                sx={{ textAlign: "start", margin: 0}}
                                                primary={    <React.Fragment>
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
                                    {permissions?.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                sx={{ textAlign: "start", margin: 0}}
                                                primary={    <React.Fragment>
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

                                <Link href={'/rules'} passHref>  {/* Remove the underline and style as needed */}
                                    <IconButton edge="start">
                                        <Typography sx={{
                                            color: "#442d5d",
                                            fontSize: 15,
                                            marginLeft: 2
                                        }}>
                                            جميع الأدوار
                                        </Typography>
                                        <ArrowCircleLeftOutlinedIcon />
                                    </IconButton>
                                </Link>
                                <Typography sx={{
                                    color: "#442d5d",
                                    fontSize: 25,

                                }}>
                                    دور المستخدم :
                                </Typography>

                            </Box>
                            <Item>

                                <List sx={{ width: '100%', maxWidth: '100%', minWidth: '50%', bgcolor: 'background.paper' }}>
                                        <ListItem
                                            key={ruleTechnician?.id}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
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
                                                            {ruleTechnician ? ruleTechnician.name : 'No name available'}
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
            {rowIdAddPermissionsTechnician && (
                <AllPermissions
                    open={openAddPermissionsTechnician}
                    id={rowIdAddPermissionsTechnician}
                    onClose={handleClose}
                    update={reloadGrid}
                    user="user"
                    userPermissions={allTechnicianPermission}/>
            )}
        </React.Fragment>
    );
}
