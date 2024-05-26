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
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import {users} from "../../Routes";
import {clientsServices} from "../../Routes/api/clients";
import AddIcon from "@mui/icons-material/Add";

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
export function AllRulesGrid() {
    const [permissionsClient, setPermissionsClient] = useState([]);
    const [permissionsRuleClient, setPermissionsRuleClient] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [ruleClient, setRuleClient] = useState({});
    const fetchAndSetPermissions = useCallback(async () => {
        const params = {
            'with': 'permissions,rule.permissions',
        };
        const data = await clientsServices.getAllClientPermissions(1,params);
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
    }, []);

    useEffect(() => {
        fetchAndSetPermissions();
    }, []);
    return (
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
                            <AddIcon />
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
                            {permissionsRuleClient?.map((item, index) => (
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
                                key={ruleClient?.id}
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
                                                {ruleClient ? ruleClient.name : 'No name available'}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

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
                                key={ruleClient?.id}
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
                                                {ruleClient ? ruleClient.name : 'No name available'}
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
    );
}
