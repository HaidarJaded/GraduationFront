import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import {Box, Grid, Paper} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {styled, useTheme} from "@mui/material/styles";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#b5cae3' : 'rgba(192,177,220,0.08)',
    ...theme.typography.body2,
    paddingRight: 7,
    paddingLeft: 7,
    textAlign: 'end',
    color: theme.palette.text.secondary,
    fontSize: "33px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export function OrdersDialog({...props}) {
    const theme = useTheme();
    const {open} = props;
    const {Devices} = props;
    const {Products} = props;
    const {OrdersProducts} = props;
    const {OrdersDevices} = props;
    console.log("Devices", Devices);
    console.log("OrdersDevices", OrdersDevices);

    let Merge = Devices.map(device => {
        // Find the corresponding order for this device
        let order = OrdersDevices.find(order => order.device_id === device.id);
        console.log(order)
        return {
            ...device,  // Spread the device properties
            order_type: order ? order.order_type : "ffs"  // Corrected to use the right property name
        };
    });
    let MergeProduct = Products.map(product => {
        let order = OrdersProducts.find(order => order.product_id === product.id);
        console.log(order)
        return {
            ...product,  // Spread the device properties
            order_type: order ? order.order_type : "ffs"  // Corrected to use the right property name
        };
    });
    const DeviceCard = ({device}) => (
        <Card sx={{
            maxWidth: 300,
            minWidth: 300,
            marginY: 3,
            marginX: '3px',
            borderRadius: "20px",
            bgcolor: "rgba(183,162,162,0.16)"
        }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{
                    color: "#3f0a77",
                    fontSize: 26,
                }}>
                    {`Device: ${device.model}`}
                </Typography>
                <Typography variant="body2" sx={{
                    color: "#442d5d",
                    fontSize: 14, marginY: 1, paddingY: 0
                }}>
                    {`Code: ${device.code}`}
                </Typography>
                <Typography variant="body2" sx={{
                    color: "#442d5d",
                    fontSize: 14, marginY: 1, paddingY: 0
                }}>
                    {`IMEI: ${device.imei}`}
                </Typography>
                <Typography variant="body2" sx={{
                    color: "#442d5d",
                    fontSize: 15,
                    bgcolor: "#b7a2a2a1",
                    borderRadius: "34px",
                    width: "fit-content",
                    marginTop: 3,
                    padding: 1
                }}>
                    {`نوع الطلب : ${device.order_type}`}
                </Typography>
            </CardContent>
        </Card>
    );
    const ProductCard = ({product}) => (
        <Card sx={{
            maxWidth: 300,
            minWidth: 300,
            marginY: 3,
            marginX: '3px',
            borderRadius: "20px",
            bgcolor: "rgba(183,162,162,0.16)"
        }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{
                    color: "#3f0a77",
                    fontSize: 26,
                }}>
                    {/*{`Device: ${device.model}`}*/}
                </Typography>
                <Typography variant="body2" sx={{
                    color: "#442d5d",
                    fontSize: 14, marginY: 1, paddingY: 0
                }}>
                    {`Code: ${device.code}`}
                </Typography>
                <Typography variant="body2" sx={{
                    color: "#442d5d",
                    fontSize: 14, marginY: 1, paddingY: 0
                }}>
                    {/*{`IMEI: ${device.imei}`}*/}
                </Typography>
                <Typography variant="body2" sx={{
                    color: "#442d5d",
                    fontSize: 15,
                    bgcolor: "#b7a2a2a1",
                    borderRadius: "34px",
                    width: "fit-content",
                    marginTop: 3,
                    padding: 1
                }}>
                    {/*{`نوع الطلب : ${device.order_type}`}*/}
                </Typography>
            </CardContent>
        </Card>
    );
    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={props.onClose}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.onClose}
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
                                display: 'flex', // هذا يجعل الأيقونة على اليسار والنص على اليمين
                                alignItems: 'center',
                                justifyContent: 'space-between',// لمحاذاة العناصر عموديًا
                                backgroundColor: "rgba(219,206,206,0.19)",
                                padding: 3,
                                borderRadius: "5%",

                            }}>

                                <Typography sx={{
                                    color: "#442d5d",
                                    fontSize: 30,

                                }}>
                                    طلبات المنتجات
                                </Typography>

                            </Box>
                            <Grid container spacing={2} sx={{
                                marginTop: 2,
                                display: {
                                    xs: "flex",
                                    md: "flex",
                                },
                                flexDirection:{
                                    xs: "column",
                                    md: "column",
                                    lg: "row",
                                    sm: "row"
                                },
                                flexWrap:{
                                    xs: "wrap",
                                    md: "wrap",
                                },
                                alignContent:{
                                    xs: "center",
                                    md: "center",
                                }
                            }}>
                                {MergeProduct.map(product => (
                                    <Grid item key={product.id} item xs={12} md={12} lg={6} sm={6} sx={{marginY: 1}}>
                                        <ProductCard product={product}/>
                                    </Grid>
                                ))}
                            </Grid>

                        </Grid>
                        <Grid item xs={12} md={6} sx={{margin: 3}}>
                            <Box sx={{
                                backgroundColor: "rgba(219,206,206,0.19)",
                                padding: 3,
                                borderRadius: "5%",
                            }}>
                                <Typography sx={{
                                    color: "#442d5d",
                                    fontSize: 30,
                                }}>
                                    طلبات الأجهزة
                                </Typography>
                            </Box>
                           <Item>
                            <Grid container spacing={2} sx={{
                                marginTop: 2,
                                display: {
                                    xs: "flex",
                                    md: "flex",
                                },
                                flexDirection:{
                                    xs: "column",
                                    md: "column",
                                    lg: "row",
                                    sm: "row"
                                },
                                flexWrap:{
                                    xs: "wrap",
                                    md: "wrap",
                                },
                                alignContent:{
                                    xs: "center",
                                    md: "center",
                                }
                            }}>
                                {Merge.map(device => (
                                    <Grid item key={device.id}  item xs={12} md={12} lg={6} sm={6} sx={{marginY: 1}}>
                                        <DeviceCard device={device}/>
                                    </Grid>
                                ))}
                            </Grid>
                           </Item>
                        </Grid>

                    </Grid>
                </Box>
            </Dialog>
        </React.Fragment>

    );
}