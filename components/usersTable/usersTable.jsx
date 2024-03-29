import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { users } from "../../Routes";
import { Notify } from "../../utils";
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';


const columns = [

    { field: 'rowNumber', headerName: '#', width: 0.1, },
    { field: 'name', headerName: 'الاسم', width: 130 },
    { field: 'last_name', headerName: 'الكنية', width: 130 },
    { field: 'email', headerName: 'البريد الالكتروني', width: 170 },
    { field: 'phone', headerName: 'رقم الهاتف', width: 170 },
    { field: 'created_at', headerName: 'تاريخ التسجيل', width: 160 },
    { field: 'address', headerName: 'العنوان', width: 170 },
    { field: 'rule', headerName: 'الدور', width: 170 },
];


export function UsersTable() {

    //get users from Api

    const [allUsers, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const params = {
                'rule*name': 'فني',
                'with':'rule'
            }
            const data = await users.getAll(params);
            console.log(data);
            setUsers(data);
        };
        getUsers()
    }, [])

    const usersWithNumbers = allUsers.map((user, index) => ({
        id: user.id,
        rowNumber: index + 1,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        created_at: user.created_at,
        address: user.address,
        rule: user.rule?.name
    }));

    const rows = usersWithNumbers


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