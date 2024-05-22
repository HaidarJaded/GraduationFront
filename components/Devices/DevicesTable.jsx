import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    GridToolbarContainer
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import {deviceServices} from "../../Routes";
import {useRouter} from "next/router";
import {EditDevice} from "./EditDevice";
import {Box, CircularProgress, Grid, MenuItem, Select, Stack, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import Switch from "@mui/material/Switch";

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

function EditToolbar(props) {
    const {setRows, setRowModesModel} = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, {id, name: '', age: '', isNew: true}]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: {mode: GridRowModes.Edit, fieldToFocus: 'name'},
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

export function Devices() {
   // const [rowModesModel, setRowModesModel] = React.useState({});
    const [rows, setRows] = React.useState([]);

//=============================================================
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    // for edit
    const [open, setOpen] = React.useState(false);
    const [rowId, setRowId] = React.useState(null);


    const handleClose = () => {
        setOpen(false);
        setRowId(null)
    };
    const handleEditClick = (id) => () => {
        setOpen(true)
        setRowId(id)
    };

    // const handleSaveClick = (id) => () => {
    //     setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    // };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    // const handleCancelClick = (id) => () => {
    //     setRowModesModel({
    //         ...rowModesModel,
    //         [id]: {mode: GridRowModes.View, ignoreModifications: true},
    //     });
    //
    //     const editedRow = rows.find((row) => row.id === id);
    //     if (editedRow.isNew) {
    //         setRows(rows.filter((row) => row.id !== id));
    //     }
    // };

//=============================================================
    const columns = [

        // {field: 'rowNumber', headerName: '#', width: 70},
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'model', headerName: 'Model', width: 130},
        {field: 'imei', headerName: 'Imei', width: 170},
        {field: 'code', headerName: 'Code', width: 170},
        {field: 'clientName', headerName: 'اسم العميل', width: 170},
        {field: 'userName', headerName: 'اسم فني الصيانة', width: 200},
        {field: 'status', headerName: 'حالة الجهاز', width: 160},
        {field: 'date_receipt', headerName: 'تاريخ الاستلام', width: 160},
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            getActions: ({id}) => {
                // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                // if (isInEditMode) {
                //     return [
                //         <GridActionsCellItem
                //             icon={<SaveIcon/>}
                //             label="Save"
                //             sx={{
                //                 color: 'primary.main',
                //             }}
                //             onClick={handleSaveClick(id)}
                //         />,
                //         <GridActionsCellItem
                //             icon={<CancelIcon/>}
                //             label="Cancel"
                //             className="textPrimary"
                //             onClick={handleCancelClick(id)}
                //             color="inherit"
                //         />,
                //     ];
                // }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },

    ];

    //get devices from Api
    const [devices, setDevices] = useState([]);
    const [pagination, setPagination] = useState({});
    const [rowCount, setRowCount] = useState(pagination?.total)
    const [pageSize, setPageSize] = useState(pagination?.per_page)
    const [currentPage, setCurrentPage] = useState(pagination?.current_page)
    const route = useRouter()

//fetch data and pagination process
    async function fetchAndSetDevices() {
        const params = {
            'repaired_in_center': 1,
            'with': 'client,user',
            'orderBy': 'date_receipt',
            'dir': 'desc',
            'deliver_to_client': 0,
            'page': currentPage,
            'per_page': pageSize,

        };
        const data = await deviceServices.getAll(params);
        setPagination(data?.pagination);
        setDevices(data?.body);
    }

    useEffect(() => {
        fetchAndSetDevices();
    }, [route, pageSize, currentPage]);


    const reloadTable = async update => {
        fetchAndSetDevices()
    };
    useEffect(() => {
        setRowCount(pagination?.total)
        setPageSize(pagination?.per_page)
        setCurrentPage(pagination?.current_page)

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
            clientName: device?.client?.name,
            userName: device?.user?.name,
            status: device?.status,
            date_receipt: device?.date_receipt,
        }));

        setRows(rowsDevices); // Now `rowsDevices` is derived directly from the updated `devices`
    }, [devices]); // This effect depends on `devices` and runs whenever `devices` changes
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

    function range(start, end) {

        return Array.from({length: end - start + 2}, (_, i) => start + i);
    }

    return (
        <>
            {devices ? (<Box sx={{flexGrow: 1, width: 1}}>

                <DataGrid
                    sx={{
                        '&.MuiDataGrid-root': {
                            minHeight: 'calc(100vh - 130px)',
                            height: '100%',
                            maxWidth: "calc(100vw - 100px)",
                        },
                        '& .MuiDataGrid-main': {
                            maxHeight: 'calc(100vh - 180px)'
                        }
                    }}
                    rows={rows}
                    columns={columns}
                    loading={rows.length === 0}
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
                {rowId && (
                    <EditDevice
                        open={open}
                        onCloseDialog={handleClose}
                        id={rowId}
                        update={reloadTable}
                    />
                )}
            </Box>)
                :( <Grid container maxWidth="lg" justifyContent={'center'} spacing={1}>
                <Grid item xs={12} sm={6}>
                    <CircularProgress/>
                </Grid>
            </Grid>)}
        </>

    );
}