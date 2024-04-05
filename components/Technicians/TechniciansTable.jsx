import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { users } from "../../Routes";


const columns = [

    { field: 'rowNumber', headerName: '#', width: 0.1, },
    { field: 'name', headerName: 'الاسم', width: 130 },
    { field: 'last_name', headerName: 'الكنية', width: 130 },
    { field: 'email', headerName: 'البريد الالكتروني', width: 170 },
    { field: 'phone', headerName: 'رقم الهاتف', width: 170 },
    { field: 'created_at', headerName: 'تاريخ التسجيل', width: 160 },
    { field: 'address', headerName: 'العنوان', width: 170 },
];


export function TechniciansTable() {

    //get users from Api

    const [allTechnicians, setTechnicians] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const params = {
                'rule*name': 'فني',
            }
            const data = await users.getAll(params);
            data ? setTechnicians(data) : setTechnicians([]);
        };
        getUsers()
    }, [])

    const techniciansWithNumbers = allTechnicians.map((user, index) => ({
        id: user.id,
        rowNumber: index + 1,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        created_at: user.created_at,
        address: user.address,
    }));

    const rows = techniciansWithNumbers;


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