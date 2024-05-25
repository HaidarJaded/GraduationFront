import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {useState} from "react";
import {Grid, Paper, Box} from "@mui/material";
import {styled} from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export function PermissionsTechnician({...props}) {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const {open} = props;
    const [id, setId] = useState(props.id)

    return (
        <React.Fragment>
            {/*<Button variant="outlined" onClick={handleClickOpen}>*/}
            {/*    Open full-screen dialog*/}
            {/*</Button>*/}
            <Dialog
                fullScreen
                open={open}
                onClose={props?.onClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props?.onClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} columns={24} sx={{ direction:"rtl"}}>
                        <Grid item xs={8} sx={{margin:3}}>
                            <Typography sx={{
                                backgroundColor:"rgba(219,206,206,0.19)",
                                padding:3,color:"#442d5d",
                                fontSize:25,
                                borderRadius:"5%",
                            }}>
                                صلاحيات المستخدم  :
                            </Typography>
                            <Item>

                                <List sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper',text }}>

                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary="صلاحية"
                                            secondary={
                                                <React.Fragment>
                                                  انشاء حساب

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
        </React.Fragment>
    );
}
