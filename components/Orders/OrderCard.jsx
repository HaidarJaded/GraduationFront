import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ordersServices} from "../../Routes/api/orders";
import LinearProgress from "@mui/material/LinearProgress";
import {DialogContentText, Grid} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {OrdersDialog} from "./OrdersDialog";

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

export function OrderCard() {
    const [orders, setOrders] = useState([]);
    const [ordersDevices, setOrdersDevices] = useState([]);
    const [ordersProducts, setOrdersProducts] = useState([]);
    const [devices, setDevices] = useState([]);
    const [products, setProducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const fetchAndSetOrders = useCallback(async () => {
        const params = {
            'with': 'devices,products,devices_orders,products_orders',
            'all_data': 1,
            'orderBy': 'date',
            'dir': 'desc',
        };
        const data = await ordersServices.getAllOrders(params);
        data ? setOrders(data?.body) : setOrders([]);
        console.log(data);
    }, []);
    useEffect(() => {
        fetchAndSetOrders();
        console.log(orders)
    }, [fetchAndSetOrders]);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <>
            {orders.length === 0 ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100%',
                }}>
                    <Typography variant="h5" sx={{marginBottom: 2, color: "#1b0986eb", fontWeight: "bold"}}>
                        Loading...
                    </Typography>
                    <Box sx={{width: '50%'}}>
                        <LinearProgress/>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Grid sx={{display: 'flex', flexDirection: ' row-reverse', alignItems: 'flex-end'}} container
                          spacing={2}>
                        {orders.map((orderUser) => (
                            <Grid item key={orderUser.id} sx={{marginY: 3, marginX: '3px'}}>
                                <Card xs={12} sm={6} md={12} lg={3} sx={{
                                    maxWidth: 300, minWidth: 300, marginX: {
                                        xs: 0,
                                        sm: 0,
                                        md: 1,
                                        lg: 0,
                                    }, borderRadius: "20px"
                                }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {orderUser.description}
                                        </Typography>
                                        <Typography variant="body2" sx={{marginY: 1, paddingY: 0}}>
                                            {`تاريخ الطلب : ${orderUser.date} `}

                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() =>{
                                            setDevices(orderUser.devices);
                                            setProducts(orderUser.products);
                                            setOrdersProducts(orderUser.products_orders);
                                            setOrdersDevices(orderUser.devices_orders);
                                            setOpenDialog(true);
                                        } }>عرض تفاصيل الطلب</Button>
                                    </CardActions>
                                </Card>

                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
            <OrdersDialog
                open={openDialog}
                onClose={handleCloseDialog}
                Devices={devices}
                Products={products}
                OrdersProducts={ordersProducts}
                OrdersDevices={ordersDevices}
            />
        </>

    );
}