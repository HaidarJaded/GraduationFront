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
import {Grid} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {EditService} from "../Services/EditService";

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

export function OrderCard() {
    const [orders,setOrders]=useState([]);
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
    return (
        <>
            {orders.length===0?(
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
            ):(
                <Box>
                    <Grid sx={{display: 'flex', flexDirection: ' row-reverse', alignItems: 'flex-end'}} container spacing={2}>
                        {orders.map((order) => (
                            <Grid item key={service.id} sx={{marginY: 3, marginX: '3px'}}>
                                <Card xs={12} sm={6} md={12} lg={3} sx={{
                                    maxWidth: 300, minWidth: 300, marginX: {
                                        xs: 0,
                                        sm: 0,
                                        md: 1,
                                        lg: 0,
                                    }, borderRadius: "20px"
                                }}>
                                    <CardMedia
                                        sx={{ marginY: 2, borderRadius: "20px" }}
                                        component="img"
                                        height="225"
                                        image="/assets/images/svg/logo-black.svg"
                                        alt="Service Image"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: '#50439ccc', padding: 3 }} aria-label="recipe">
                                                MYP
                                            </Avatar>
                                        }
                                        title={` خدمة ${service.name}`}
                                        subheader={service.created_at}
                                    />
                                    <CardContent sx={{ direction: "rtl" }}>
                                        <Typography variant="body1" color="text.secondary">
                                            {`السعر: ${service.price}`}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {`الوقت: ${service.time_required}`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="edit"  sx={{color: "#ec6060"}}>
                                            <FavoriteIcon
                                                onClick={handleEditClick(service.id) }/>
                                        </IconButton>
                                        <IconButton aria-label="edit">
                                            <DeleteIcon
                                                onClick={handleDeleteClick(service.id) }
                                                disabled={deletingId === service.id}/>
                                        </IconButton>
                                    </CardActions>
                                </Card>

                            </Grid>
                        ))}

                    </Grid>
                    {rowId && (
                        <EditService
                            open={open}
                            onCloseDialog={handleClose}
                            id={rowId}
                            update={reloadTable}
                        />
                    )}
                    {/*<Box sx={{bgcolor:'rgba(163,126,132,0.25)',*/}
                    {/*    display: 'flex',*/}
                    {/*    flexWrap: 'wrap',*/}
                    {/*    justifyContent:' space-evenly',*/}
                    {/*    flexDirection: 'row',*/}
                    {/*    alignItems: 'center',*/}
                    {/*    width:'100%',*/}
                    {/*    borderRadius: '30px',*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*    <TablePagination*/}
                    {/*        component="div"*/}
                    {/*        count={100}*/}
                    {/*        page={page}*/}
                    {/*        onPageChange={handleChangePage}*/}
                    {/*        rowsPerPage={rowsPerPage}*/}
                    {/*        onRowsPerPageChange={handleChangeRowsPerPage}*/}
                    {/*    />*/}
                    {/*    <Pagination count={10} hidePrevButton hideNextButton />*/}
                    {/*</Box>*/}
                    <CustomPagination/>

                </Box>
            )}
        </>

    );
}