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

import {device} from "../../Routes";
import {useRouter} from "next/router";
import {EditDevice} from "./EditDevice";


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
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [rows, setRows] = React.useState([]);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    // for edit
    const [open, setOpen] = React.useState(false);
    const [rowId, setRowId] = React.useState();


    const handleClose = () => {
        setOpen(false);
    };

    const handleEditClick = (id) => () => {
        setOpen(true)
        setRowId(id)
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = {...newRow, isNew: false};
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


    const columns = [

        // {field: 'rowNumber', headerName: '#', width: 70},
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'model', headerName: 'Model', width: 130},
        {field: 'imei', headerName: 'Imei', width: 130},
        {field: 'code', headerName: 'Code', width: 170},
        {field: 'clientName', headerName: 'اسم العميل', width: 170},
        {field: 'userName', headerName: 'اسم فني الصيانة', width: 160},
        {field: 'status', headerName: 'حالة الجهاز', width: 160},
        {field: 'date_receipt', headerName: 'تاريخ الاستلام', width: 160},

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

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
    const [flattenedDevices, setFlattenedDevices] = useState([]);


    const route = useRouter()
    useEffect(() => {
        // Define an async function inside the effect
        async function fetchAndSetDevices() {
            const params = {
                'repaired_in_center': 1,
                'with': 'client,user',
                'orderBy': 'date_receipt',
                'dir': 'desc',
                'deliver_to_client': 0
            };
            const data = await device.getAll(params);
            setDevices(data); // This will trigger a re-render
        }
        // Call the async function
        fetchAndSetDevices();
    }, []); // Empty dependency array means this effect runs once on mount

// Use another useEffect to react to changes in `devices`
    useEffect(() => {
        const rowsDevices = devices.map((device, index) => ({
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
        setFlattenedDevices(rowsDevices);
        setRows(rowsDevices); // Now `rowsDevices` is derived directly from the updated `devices`
    }, [devices]); // This effect depends on `devices` and runs whenever `devices` changes

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5},
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: {setRows, setRowModesModel},
                }}

            />
            <EditDevice
                open={open}
                onCloseDialog={handleClose}
                id={rowId}
            />
        </div>
    );
 }