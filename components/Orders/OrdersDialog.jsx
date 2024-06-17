import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import {Box, Grid} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {merge} from "chart.js/helpers";
//import {ModelsEnum} from "../../enums";
//import {getEnum, getEnumValueByEnumKey} from "../../utils/common/methodUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function OrdersDialog({...props}) {
    const {open} = props;
    const {Devices} = props;
    const {Products} = props;
    const {OrdersProducts} = props;
    const {OrdersDevices} = props;
    console.log(Devices);

    let Merge = Devices.map(device => {
        // Find the corresponding order for this device
        const order = OrdersDevices.find(order => order.device_id === Devices.id);
        return {
            ...device,  // Spread the device properties
            order_type: order ? order.order_type : null  // Add the order type from the devices_orders, if found
        };
    });

console.log("Migeerad",Merge)

    const DeviceCard = ({ device }) => (
        <Card sx={{ maxWidth: 300, minWidth: 300, marginY: 3, marginX: '3px', borderRadius: "20px" }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {device.model}
                </Typography>
                <Typography variant="body2" sx={{ marginY: 1, paddingY: 0 }}>
                    {device.code}
                </Typography>
                <Typography variant="body2">
                    {device.order_type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );

    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={props.onClose}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.onClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} columns={14} sx={{ direction: "rtl" }}>
                        <Grid item xs={12} md={6} sx={{ margin: 3 }}>
                            {Merge.map(device => (
                                <Grid item key={device.id} sx={{ marginY: 3, marginX: '3px' }}>
                                    <DeviceCard device={device} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </React.Fragment>

    );
}