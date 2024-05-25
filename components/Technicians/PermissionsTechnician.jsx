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
import {Box, Grid, Paper} from "@mui/material";
import {styled} from "@mui/material/styles";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ListItem from "@mui/material/ListItem";
import {users} from "../../Routes";

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

    const [permissionsTechnician, setPermissionsTechnician] = useState([]);

    const fetchAndSetPermissions = useCallback(async ()=>{
        const params = {
            'with':'permissions,rule.permissions',
        };
        const data = await users.getAllPermissions(id,params);
        data ? setPermissionsTechnician(data?.rule) : setPermissionsTechnician([]);
        console.log(permissionsTechnician)
        console.log("mfkdmmklmdk")
    },[permissionsTechnician])

    useEffect(() => {
        fetchAndSetPermissions
    }, [])

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
                    <Grid container spacing={2} columns={24} sx={{direction: "rtl"}}>
                        <Grid item xs={8} sx={{margin: 3}}>
                            <Typography sx={{
                                backgroundColor: "rgba(219,206,206,0.19)",
                                padding: 3, color: "#442d5d",
                                fontSize: 25,
                                borderRadius: "5%",
                            }}>
                                صلاحيات المستخدم :
                            </Typography>
                            <Item>

                                <List sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}>
                                    {permissionsExample.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                sx={{ textAlign: "start", margin: 1, fontSize: 100 }}
                                                primary={`صلاحية ${item.name}`} // عرض اسم الصلاحية الفعلي
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography sx={{
                                                            backgroundColor: "rgba(219,206,206,0.19)",
                                                            padding: 3, color: "#442d5d",
                                                            fontSize: 25,
                                                            borderRadius: "5%",
                                                        }}>
                                                            {item.description} // عرض وصف الصلاحية الفعلي
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Item>

                        </Grid>

                    </Grid>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}
