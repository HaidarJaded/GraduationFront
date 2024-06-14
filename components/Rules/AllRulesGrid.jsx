import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import {Box, Fab, Grid, Paper} from "@mui/material";
import {styled} from "@mui/material/styles";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import {rulesServices} from "../../Routes/api/rules";
import {AllPermissions} from "../Permissions";
import LinearProgress from "@mui/material/LinearProgress";

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
    const [rowIdAddPermissionsRule, setRowIdAddPermissionsRule] = React.useState(null);
    const [openAddPermissionsRule, setOpenAddPermissionsRule] = React.useState(false);
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
            console.log(data?.body);
        } else {

            console.log("new test")

        }

    }, []);

    useEffect(() => {
        fetchAndSetRules();
    }, []);


const handleClose = () => {
    setOpenAddPermissionsRule(false);
    setRowIdAddPermissionsRule(null);
};
    const reloadGrid = async update => {
        fetchAndSetRules()
    };

    return (
        <>
            {rules.length === 0 ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100%',
                    }}>
                        <Typography variant="h5" sx={{ marginBottom: 2, color: "#1b0986eb", fontWeight: "bold" }}>
                            Loading...
                        </Typography>
                        <Box sx={{ width: '50%' }}>
                            <LinearProgress />
                        </Box>
                    </Box>
                ):
                (
                <Grid container spacing={3} columns={14}>
                    {rules.map((rule) => (
                        <Grid item xs={12} md={12} lg={4} key={rule.id} sx={{ margin: 3 }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row-reverse',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: "rgba(219,206,206,0.19)",
                                padding: 2,
                                borderRadius: "5%",
                                direction: "rtl",
                            }}>
                                <Fab size="small" color="secondary" aria-label="add">
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={() => {
                                            setRowIdAddPermissionsRule(rule.id);
                                            setOpenAddPermissionsRule(true);
                                            setPermissionsRules(rule.permissions);
                                            console.log(rule.id)
                                        }}
                                        aria-label="close"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Fab>
                                <Typography sx={{ fontSize: 20, margin: 1 }}>
                                    {rule.name}
                                </Typography>
                            </Box>

                            <Box sx={{
                                width: '100%',
                                bgcolor: 'background.paper',
                                padding: 1,
                                borderRadius: "2%",
                                color: "#442d5d",
                                direction: 'rtl'
                            }}>
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
            )}
            {rowIdAddPermissionsRule && (
                <AllPermissions
                    open={openAddPermissionsRule}
                    id={rowIdAddPermissionsRule}
                    onClose={handleClose}
                    update={reloadGrid}
                    userPermissions={permissionsRules}
                    user="rule"
                />
            )}
        </>
    );

}
