import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Notify } from "../../utils";
import TableCell from '@mui/material/TableCell';

import { device } from "../../Routes";



const columns = [

    { field: 'rowNumber', headerName: '#', width: 70 },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'imei', headerName: 'Imei', width: 130 },
    { field: 'code', headerName: 'Code', width: 170 },
    { field: 'clientName', headerName: 'اسم العميل', width: 170 },
    { field: 'userName', headerName: 'اسم فني الصيانة', width: 160 },
    { field: 'status', headerName: 'حالة الجهاز', width: 160 },
    { field: 'date_receipt', headerName: 'تاريخ الاستلام', width: 160 },
];



export function Devices() {

    //get devices from Api
    const [devices, setDevices] = useState([]);
    useEffect(() => {
        const getDevices = async () => {
            const params = {
                'repaired_in_center': 1,
                'with': 'client,user',
                'orderBy': 'date_receipt',
                'dir': 'desc',
                'deliver_to_client': 0
            }
            const data = await device.getAll(params);
            // setDevices(data);
            data ? setDevices(data) : setDevices([]);
        };
        getDevices();

    }, [])
    const flattenedDevices = devices.map((device, index) => ({
        id: device.id,
        rowNumber: index + 1,
        model: device.model,
        imei: device.imei,
        code: device.code,
        clientName: device.client?.name,
        userName: device.user?.name,
        status: device.status,
        date_receipt: device.date_receipt
    }));
    const rows = flattenedDevices;
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}