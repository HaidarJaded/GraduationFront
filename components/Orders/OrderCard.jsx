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
import {Grid, MenuItem, Select, Stack} from "@mui/material";
import {OrdersDialog} from "./OrdersDialog";
import IconButton from "@mui/material/IconButton";
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import {EditOrder} from "./EditOrder";
import {servicesServices} from "../../Routes/api/services";
import {Notify} from "../../utils";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

export function OrderCard() {
    const [orders, setOrders] = useState([]);
    const [ordersDevices, setOrdersDevices] = useState([]);
    const [ordersProducts, setOrdersProducts] = useState([]);
    const [devices, setDevices] = useState([]);
    const [products, setProducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [rowId, setRowId] = React.useState(null);
    const [pagination, setPagination] = useState({});
    const [rowCount, setRowCount] = useState(pagination?.total)
    const [pageSize, setPageSize] = useState(pagination?.per_page)
    const [currentPage, setCurrentPage] = useState(pagination?.current_page)
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState(null);
    const fetchAndSetOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        const params = {
            'with': 'devices,products,devices_orders,products_orders,user',
            'orderBy': 'date',
            "dir": "desc",
            'page': currentPage,
            'per_page': pageSize,
        };
        const response = await ordersServices.getAllOrders(params);
        const data = await response?.data;
        const status = await response?.status;
        data ? setOrders(data?.body) : setOrders([]);
        setPagination(data?.pagination);
        if (status !== 200) {
            setError(data?.message);
        }
        setLoading(false);
    }, [pageSize, currentPage]);
    useEffect(() => {
        fetchAndSetOrders();
    }, [fetchAndSetOrders, pageSize, currentPage]);

    useEffect(() => {
        setRowCount(pagination?.total)
        setPageSize(pagination?.per_page)
        setCurrentPage(pagination?.current_page)

    }, [pagination])

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleDeleteClick = (id) => async () => {
        setDeletingId(id);
        if (await ordersServices.deleteOrder(id)) {
            Notify("colored",
                "تم الحذف بنجاح", "success");
        }
        setDeletingId(null);
        reloadTable("update")
    };
    const handleEditClick = (id) => () => {
        setOpenEdit(true)
        setRowId(id)
        console.log("opeem")
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setRowId(null)
    };
    const reloadTable = async update => {
        fetchAndSetOrders()
    };
    function CustomPagination() {
        const handlePageSizeChange = (event) => {
            setPageSize(Number(event.target.value));
            setCurrentPage(1)
        };
        const pageCount = Math.ceil(rowCount / pageSize);


        const firstItemIndex = (currentPage - 1) * pageSize + 1;
        const lastItemIndex = Math.min(currentPage * pageSize, rowCount);


        const startPages = range(1, Math.min(pageCount, 2));
        const endPages = range(Math.max(pageCount - 1, 2), pageCount);
        const middlePages = currentPage > 1 && currentPage < pageCount - 2
            ? [currentPage, currentPage + 1, currentPage + 2]
            : [2, 3];
        const paginationRanges = [...new Set([...startPages, ...middlePages, ...endPages])].sort((a, b) => a - b);
        const validPaginationRanges = paginationRanges.filter(page => page <= pageCount);

        return (
            <Stack direction="row" sx={{width: 1, px: 1, marginTop: 3, bgcolor: "#b9a9a985"}} alignItems="center"
                   spacing={2}>
                <Box sx={{
                    flexGrow:
                        '1',
                    display: "flex",
                    gap: 1,
                    alignItems: "center"
                }}>
                    <Select sx={{
                        paddingTop: '0',
                        paddingBottom: '0',
                        height: '30px',
                        borderRadius: '10px',
                    }} value={pageSize || 50} onChange={handlePageSizeChange} displayEmpty
                            inputProps={{'aria-label': 'Page size'}}>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                    <Typography sx={{
                        color:
                            '#8A9099'

                    }}>
                        {isAllSelected
                            ? `Showing ${rowCount} of ${rowCount}`
                            : `Showing ${firstItemIndex} - ${lastItemIndex} of ${rowCount}`}
                    </Typography>
                </Box>


                {validPaginationRanges?.map((page, index) => (
                    <Button
                        sx={{
                            background:
                                'rgba(243,243,243,0)',
                            maxWidth: '25px',
                            minWidth: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: ' 25px',
                            borderRadius: '50%',
                            color: '#475467',

                            "&:hover": {

                                background: 'rgba(255,255,255,0.56)',
                            }, "&.Mui-disabled": {
                                color: "#182230",
                                opacity: "1",
                                background: '#f3f3f3',
                            },
                        }}
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        disabled={page === currentPage}
                        variant={'text'}
                    >
                        {paginationRanges[index + 1] < page ? `...` : page}
                    </Button>
                ))}
            </Stack>
        );
    }

    const isAllSelected = pageSize >= rowCount;

    function range(start, end) {

        return Array.from({length: end - start + 2}, (_, i) => start + i);
    }

    return (
        <>
            {loading ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    width: '100%',
                }}>
                    <Typography variant="h5" sx={{marginBottom: 2, color: "#1b0986eb", fontWeight: "bold"}}>
                        Loading...
                    </Typography>
                    <Box sx={{width: '50%'}}>
                        <LinearProgress/>
                    </Box>
                </Box>
            ) : error ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    width: '100%',
                }}>
                    <Typography variant="h5" sx={{color: "red", fontWeight: "bold"}}>
                        {error}
                    </Typography>
                </Box>
            ) : orders.length===0?(
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    width: '100%',
                }}>
                    <Typography variant="h5" sx={{color: "red", fontWeight: "bold"}}>
                        No data
                    </Typography>
                </Box>
            ):(
                <Box>
                    <Grid sx={{display: 'flex', flexDirection: ' row-reverse', alignItems: 'flex-end'}} container
                          spacing={2}>
                        {orders?.map((orderUser) => (
                            <Grid item key={orderUser.id} sx={{marginY: 3, marginX: '3px'}}>
                                <Card xs={12} sm={6} md={12} lg={3} sx={{
                                    maxWidth: 300, minWidth: 300, marginX: {
                                        xs: 0,
                                        sm: 0,
                                        md: 1,
                                        lg: 0,
                                    }, borderRadius: "20px"
                                }}>
                                    <CardContent sx={{padding:3}}>
                                        <Typography variant="h5" component="div" sx={{
                                            color: "#3f0a77",
                                            fontSize: 26,
                                            marginBottom: 2
                                        }}>
                                            {orderUser.description}
                                        </Typography>
                                        <Typography variant="body2" sx={{marginY: 1, paddingY:1}}>
                                            {`تاريخ الطلب : ${orderUser.date} `}

                                        </Typography>
                                        <Typography variant="body2">
                                           {` ${orderUser?.user?.name} :عامل التوصيل `}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <Button size="small" onClick={() => {
                                            setDevices(orderUser.devices);
                                            setProducts(orderUser.products);
                                            setOrdersProducts(orderUser.products_orders);
                                            setOrdersDevices(orderUser.devices_orders);
                                            setOpenDialog(true);
                                        }}>عرض تفاصيل الطلب</Button>
                                        <IconButton aria-label="edit"  sx={{color: "#690b9d"}}>

                                            <BorderColorTwoToneIcon   onClick={handleEditClick(orderUser.id) } />
                                        </IconButton>
                                        <IconButton aria-label="delete"
                                                    sx={{color: "#690b9d"}}
                                                    onClick={handleDeleteClick(orderUser.id)}
                                                    disabled={deletingId === orderUser.id}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </CardActions>
                                </Card>

                            </Grid>
                        ))}
                    </Grid>

                </Box>
            )}
            {rowId && (
                <EditOrder
                    open={openEdit}
                    onCloseDialog={handleCloseEdit}
                    id={rowId}
                    update={reloadTable}
                />
            )}
            <CustomPagination/>
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