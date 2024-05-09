import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { clients } from '../../Routes/api/clients';

const columns = [

    { field: 'rowNumber', headerName: '#', width: 0.1, },
    { field: 'name', headerName: 'الاسم', width: 130 },
    { field: 'last_name', headerName: 'الكنية', width: 130 },
    { field: 'email', headerName: 'البريد الالكتروني', width: 130 },
    { field: 'national_id', headerName: 'الرقم الوطني', width: 170 },
    { field: 'phone', headerName: 'رقم الهاتف', width: 170 },
    { field: 'created_at', headerName: 'تاريخ التسجيل', width: 160 },
    { field: 'address', headerName: 'العنوان', width: 170 },
    { field: 'center_name', headerName: 'اسم المركز', width: 170 },
    { field: 'devices_count', headerName: 'عدد الاجهزة', width: 170 },
];


export function ClientsTable() {

    //get users from Api

    const [allClients, setClients] = useState([]);
    useEffect(() => {
        const getClients = async () => {
            const params = {
            }
            const data = await clients.getAll(params);
            // setClients(data);
            data ? setClients(data) : setClients([]);
        };
        getClients()
    }, [])

    const clientsWithNumbers = allClients.map((client, index) => ({
        id: client.id,
        rowNumber: index + 1,
        name: client.name,
        last_name: client.last_name,
        email: client.email,
        national_id: client.national_id,
        phone: client.phone,
        created_at: client.created_at,
        address: client.address,
        center_name: client.center_name,
        devices_count: client.devices_count,
    }));

    const rows = clientsWithNumbers;


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows
                }
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