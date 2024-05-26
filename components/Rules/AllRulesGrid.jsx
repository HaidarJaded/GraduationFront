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
import {rulesServices} from "../../Routes/api/rules";

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
//
     const [rules, setRules] = useState([]);
     const [permissionsRules, setPermissionsRules] = useState([]);
     const fetchAndSetRules = useCallback(async () => {
         const params = {
             'name!': 'مدير',
             with: 'permissions'
         };
             const data = await rulesServices.getAllRulePermissions(params);
         if (data) {
             setRules(data?.body);
         }
         else {
             setRules([]);
             console.log("new test")

         }
         console.log(data ? data.body.id : []);

     }, []);

     useEffect(()=>{
         fetchAndSetRules();
     },[]);


    return (
        <Grid container spacing={3} columns={14}>
            {rules.map((rule) => (
                <Grid item xs={12} md={12} lg={4} key={rule.id} sx={{ margin: 3 }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: "rgba(219,206,206,0.19)",
                        padding: 3,
                        borderRadius: "5%",
                    }}>
                        <Typography sx={{ fontSize: 20, marginBottom: 2 }}>
                            {rule.name}
                        </Typography>
                    </Box>

                    <Box sx={{ width: '100%', bgcolor: 'background.paper', padding: 3, borderRadius: "2%", color: "#442d5d" , direction:'rtl'}}>

                        <List>
                            {rule.permissions?.map((permission) => (
                                <ListItem key={permission.id} sx={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
                                          secondaryAction={
                                              <IconButton edge="end" aria-label="delete">
                                                  <DeleteIcon />
                                              </IconButton>
                                          }>
                                    <ListItemText
                                        primary={permission.name}
                                        sx={{ textAlign: "start" }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}
