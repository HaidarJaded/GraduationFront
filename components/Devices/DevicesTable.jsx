import * as React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import {DataGrid, GridActionsCellItem,} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {deviceServices} from "../../Routes";
import {useRouter} from "next/router";
import {EditDevice} from "./EditDevice";
import {Box, Chip, DialogContentText, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Notify} from '../../utils';
import LinearProgress from "@mui/material/LinearProgress";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import NotificationAddRoundedIcon from "@mui/icons-material/NotificationAddRounded";
import {SendNotification} from "../Notices";
import {AddDevice} from "./AddDevice";
import {reset} from "next/dist/lib/picocolors";

const StyledGridOverlay = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));


export function Devices() {
    const [rows, setRows] = React.useState([]);
    const [deletingId, setDeletingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);


    // for edit
    const [open, setOpen] = React.useState(false);
    const [searchKey, setSearchKey] = React.useState('');
    const [bufferedSearchKey, setBufferedSearchKey] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchKey(bufferedSearchKey);
        }, 1500);

        return () => clearTimeout(timer);
    }, [bufferedSearchKey]);
    const [rowId, setRowId] = React.useState(null);


    const handleClose = () => {
        setOpen(false);
        setRowId(null)
    };
    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        console.log("Close")
    };
    const handleEditClick = (id) => () => {
        setOpen(true)
        setRowId(id)
    };

    const [openDeliverToClientDialog, setOpenDeliverToClientDialog] = useState(false);
    const [openPaymentStatus, setOpenPaymentStatus] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const handleOpenDialogDeliverToClient = (id) => {
        setCurrentId(id);
        setOpenPaymentStatus(true);
    };

    const handleCloseDialogDeliverToClient = () => {
        setOpenDeliverToClientDialog(false);
    };
    const handleCloseDialogPaymentStatus = () => {
        setOpenDeliverToClientDialog(true);
        setOpenPaymentStatus(false);

    };
    const handleConfirmPaymentStatus = () => {
        setOpenDeliverToClientDialog(true);
        setIsPaid(true);
    };
    const handleConfirmDeliverToClient = async () => {
        setOpenPaymentStatus(false)
        console.log(currentId);
        const updateData = async () => {
            try {
                if(isPaid){
                    const response = await deviceServices.updateDevice(currentId, {deliver_to_client: 1,payment_status:1});
                    Notify("light", response.message, "success");
                }
                else {
                    const response = await deviceServices.updateDevice(currentId, {deliver_to_client: 1});
                    Notify("light", response.message, "success");
                }

            } catch (error) {
                console.log(error)
            }

        };
        await updateData();
        setOpenDeliverToClientDialog(false);
        fetchAndSetDevices();
    };


    const handleDeleteClick = (id) => async () => {
        const confirmed = window.confirm("هل أنت متأكد من رغبتك في حذف هذا السجل؟\nلا يمكن التراجع عن هذه الخطوة.");
        if (!confirmed) {
            return;
        }
        setDeletingId(id);
        const status = devices.find(device => device.id === id)?.status;
        if (status !== 'لم يتم بدء العمل فيه') {
            Notify("colored",
                "عذراً لا يمكن حذف جهاز قد تم بدء العمل به أو أصبح في حالة تسليم", "info");
            setDeletingId(null);
            return;
        }
        if (await deviceServices.deleteDevice(id)) {
            Notify("colored",
                "تم الحذف بنجاح", "success");
            setRows(rows.filter((row) => row.id !== id));
            setDeletingId(null);
            return;
        }
        setDeletingId(null);
    };

//=============================================================
    const columns = [

        {field: 'rowNumber', headerName: '#', width: 1},
        // {field: 'id', headerName: 'ID', width: 70},
        {field: 'model', headerName: 'Model', width: 130},
        {field: 'imei', headerName: 'Imei', width: 170},
        {field: 'code', headerName: 'Code', width: 170},
        {field: 'clientName', headerName: 'اسم العميل', width: 170},
        {field: 'userName', headerName: 'اسم فني الصيانة', width: 200},
        {field: 'status', headerName: 'حالة الجهاز', width: 160},
        {field: 'cost_to_client', headerName: 'الكلفة', width: 160},
        {field: 'customer_complaint', headerName: 'الشكوى', width: 160},
        {field: 'problem', headerName: 'العطل', width: 160},
        {field: 'date_receipt', headerName: 'تاريخ الاستلام', width: 160},
        {
            field: 'deliver_to_client',
            headerName: 'تسليم الجهاز للعميل',
            width: 150,
            renderCell: (params) => {
                const isDisabled = params.row.deliver_to_client === 1;
                return (
                    <GridActionsCellItem
                        key={params.id}
                        icon={<Box sx={{display: 'flex', alignItems: 'center'}}>
                            <CheckBoxRoundedIcon/>
                            <Box component="span" sx={{marginLeft: 1}}>
                                تسليم الجهاز
                            </Box>
                        </Box>}
                        label="deliver to client"
                        className="textPrimary"
                        onClick={() => handleOpenDialogDeliverToClient(params.id)}
                        color="inherit"
                        disabled={isDisabled}
                    />

                )
            }


        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            getActions: ({id}) => {
                return [
                    <GridActionsCellItem
                        key={id}
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                        disabled={deletingId === id}
                    />,
                    <GridActionsCellItem
                        key={id}
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                        disabled={deletingId === id}
                    />,
                ];
            },
        },

    ];

    //get devices from Api
    const [devices, setDevices] = useState([]);
    const [pagination, setPagination] = useState({});
    const [rowCount, setRowCount] = useState(pagination?.total)
    const [pageSize, setPageSize] = useState(pagination?.per_page??20)
    const [currentPage, setCurrentPage] = useState(pagination?.current_page??1)
    const route = useRouter()

    const cacheRef = useRef({});

//fetch data and pagination process

    const fetchAndSetDevices = useCallback(async (forceReload= false) => {
        setLoading(true);
        setError(null);
        const cacheKey = `${currentPage}-${pageSize}-${searchKey}`;

        if (!forceReload && cacheRef.current[cacheKey]) {
            setDevices(cacheRef.current[cacheKey]);
            setLoading(false);
            return;
        }
        const params = {
            'repaired_in_center': 1,
            'with': 'client,user',
            'orderBy': 'created_at',
            'dir': 'desc',
            'deliver_to_client': 0,
            'page': currentPage,
            'per_page': pageSize,
            'search': searchKey

        };
        try {
            const response = await deviceServices.getAll(params);
            const data = await response?.data;
            const status = await response?.status;

            if (status === 200 && data?.body?.length > 0) {

                cacheRef.current[cacheKey] = data?.body;
                setDevices(data?.body);
                setPagination(data?.pagination);
            } else {
                setDevices([]);
                setError(data?.message=== "Successful" ? 'لا يوجد أجهزة مدخلة':"لقد حدث خطأ أثناء جلب البيانات");
            }
        } catch (error) {
            setError("لقد حدث خطأ أثناء جلب البيانات.");
        } finally {
            setLoading(false);
        }


    }, [route, pageSize, currentPage, searchKey]);

    // useEffect(() => {
    //     fetchAndSetDevices();
    // }, [fetchAndSetDevices]);
    useEffect(() => {
        fetchAndSetDevices(searchKey !== '');
    }, [searchKey, currentPage, pageSize]);

    const reloadTable = async update => {
        fetchAndSetDevices(true)
    };
    useEffect(() => {
        setRowCount(pagination?.total)
    }, [pagination])

    function CustomNoRowsOverlay() {
        return (
            <StyledGridOverlay>
                <svg
                    style={{flexShrink: 0}}
                    width="240"
                    height="200"
                    viewBox="0 0 184 152"
                    aria-hidden
                    focusable="false">
                    <g fill="none" fillRule="evenodd">
                        <g transform="translate(24 31.67)">
                            <ellipse
                                className="ant-empty-img-5"
                                cx="67.797"
                                cy="106.89"
                                rx="67.797"
                                ry="12.668"
                            />
                            <path
                                className="ant-empty-img-1"
                                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                            />
                            <path
                                className="ant-empty-img-2"
                                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                            />
                            <path
                                className="ant-empty-img-3"
                                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                            />
                        </g>
                        <path
                            className="ant-empty-img-3"
                            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                        />
                        <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"/>
                            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"/>
                        </g>
                    </g>
                </svg>
                <Box sx={{mt: 1}}>No Data</Box>
            </StyledGridOverlay>
        );
    }

    const isAllSelected = pageSize >= rowCount;
    useEffect(() => {
        const rowsDevices = devices?.map((device, index) => ({
            id: device?.id,
            rowNumber: index + 1,
            model: device?.model,
            imei: device?.imei,
            code: device?.code,
            clientName: device?.client?.name + ' ' + device?.client?.last_name,
            userName: device?.user?.name + ' ' + device?.user?.last_name,
            userId: device?.user?.id,
            status: device?.status,
            cost_to_client:device?.cost_to_client,
            date_receipt: device?.date_receipt,
            customer_complaint:device?.customer_complaint,
            problem:device?.problem,
            deliver_to_client: device?.deliver_to_client,
        }));

        setRows(rowsDevices);
    }, [devices]);

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
            <Stack direction="row" sx={{width: 1, px: 1}} alignItems="center" spacing={2}>
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


                {validPaginationRanges.map((page, index) => (
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

                                background: 'rgba(248,4,4,0.56)',
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

    function range(start, end) {

        return Array.from({length: end - start + 2}, (_, i) => start + i);
    }

    return (
        <>
            <Box sx={{
                m: 2,
                display: 'flex',
                gap: 2,
                justifyContent: 'end',
                alignItems: 'center',
            }}>

                <Box sx={{
                    minWidth: '300px',
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {(bufferedSearchKey !== '') && (<>
                            <ClearIcon onClick={(event) => {
                                setBufferedSearchKey('');
                            }}/>
                        </>
                    )}
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Search"
                        name="search"
                        autoComplete="search"
                        value={bufferedSearchKey}
                        onChange={(event) => {
                            setBufferedSearchKey(event.target.value);
                        }}
                    />
                </Box>
                <Box>

                    <IconButton aria-label="delete" sx={{borderRadius:6}}
                                onClick={() => {
                                    setOpenAddDialog(true);
                                }}>
                        <Stack direction="row" spacing={2}>
                            <Chip icon={<NotificationAddRoundedIcon/>} label="إضافة جهاز"
                                  sx={{
                                      fontSize: '18px',
                                      padding:2.5,
                                      backgroundColor: 'rgba(47,33,86,0.6)',
                                      color: '#fff',
                                      '& .MuiChip-icon': {
                                          color: '#fff',
                                          fontSize: '24px'
                                      }
                                  }} />
                        </Stack>

                    </IconButton>
                </Box>
            </Box>
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
            ) : (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // height: '100vh',
                    width: '100%',
                }}>
                    <DataGrid
                        sx={{
                            '&.MuiDataGrid-root': {
                                minHeight: 'calc(100vh - 130px)',
                                height: '100%',
                                maxWidth: "calc(100vw - 100px)",
                                width: '100%',
                            },
                            '& .MuiDataGrid-main': {
                                maxHeight: 'calc(100vh - 200px)'
                            }
                        }}
                        rows={rows}
                        columns={columns}
                        loading={false}
                        // checkboxSelection
                        // rowModesModel={rowModesModel}
                        // onRowModesModelChange={handleRowModesModelChange}
                        // onRowEditStop={handleRowEditStop}
                        // processRowUpdate={processRowUpdate}
                        // slots={{
                        //     toolbar: EditToolbar,
                        // }}
                        // slotProps={{
                        //     toolbar: {setRows, setRowModesModel},
                        // }}
                        components={{
                            noRowsOverlay: CustomNoRowsOverlay,
                            Pagination: CustomPagination,
                        }}
                    />
                </Box>

            )}
            {rowId && (
                <EditDevice
                    open={open}
                    onCloseDialog={handleClose}
                    id={rowId}
                    update={reloadTable}
                />
            )}
            <Dialog open={openPaymentStatus} onClose={handleCloseDialogPaymentStatus}
                    aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">{"تحديد حالة الدفع"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       هل ثمن الجهاز مقبوض؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogPaymentStatus}>غير مقبوض</Button>
                    <Button onClick={handleConfirmPaymentStatus} autoFocus>
                        مقبوض
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDeliverToClientDialog} onClose={handleCloseDialogDeliverToClient}
                    aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">{"تأكيد تسليم جهاز"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        هل أنت متأكد من انك تريد تسليم هذا الجهاز للعميل؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogDeliverToClient}>إلغاء</Button>
                    <Button onClick={handleConfirmDeliverToClient} autoFocus>
                        تسليم
                    </Button>
                </DialogActions>
            </Dialog>

            <AddDevice
                open={openAddDialog}
                onClose={handleCloseAddDialog}
                update={reloadTable}
            />
        </>

    );
}