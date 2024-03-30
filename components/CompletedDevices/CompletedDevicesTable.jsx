import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { completedDevices } from "../../Routes/api/completedDevices";


const columns = [

    { field: 'rowNumber', headerName: '#', width: 70 },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'imei', headerName: 'Imei', width: 130 },
    { field: 'code', headerName: 'Code', width: 170 },
    { field: 'client_name', headerName: 'اسم العميل', width: 170 },
    { field: 'user_name', headerName: 'اسم فني الصيانة', width: 160 },
    { field: 'cost_to_client', headerName: 'الكلفة', width: 160 },
    { field: 'status', headerName: 'حالة الجهاز', width: 160 },
    { field: 'date_receipt', headerName: 'تاريخ الاستلام', width: 160 },
    { field: 'date_delivery', headerName: 'تاريخ التسليم', width: 160 },
];
export function CompletedDevices() {
    const [completed_devices, setCompletedDevices] = useState([]);
    useEffect(() => {
        const getDevices = async () => {
            const params = {
                'repaired_in_center': 1,
                'orderBy': 'date_delivery',
                'dir': 'desc',
            }
            const data = await completedDevices.getAll(params);
            // setCompletedDevices(data)
            data ? setCompletedDevices(data) : setCompletedDevices([]);
        };
        getDevices();
    }, [])
    const rowsWithNumbers = completed_devices.map((row, index) => ({
        id: row.id,
        rowNumber: index + 1,
        model: row.model,
        imei: row.imei,
        code: row.code,
        client_name: row.client_name,
        user_name: row.user_name,
        cost_to_client: row.cost_to_client,
        status: row.status,
        date_receipt: row.date_receipt,
        date_delivery: row.date_delivery,
    }));
    const rows = rowsWithNumbers;

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