import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {users} from "../../Routes";
import {Notify} from "../../utils";

const columns = [
// address
// created_at
// email
// // email_verified_at
// phone
// // rule_id
// updated_at

    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'First name', width: 130},
    {field: 'last_name', headerName: 'Last name', width: 130},
    {field: 'email', headerName: 'Email', width: 130},
    {field: 'phone', headerName: 'phone', width: 130},
    {field: 'updated_at', headerName: 'updated_at', width: 130},
    {field: 'created_at', headerName: 'created_at', width: 130},
    {field: 'address', headerName: 'address', width: 130},

    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    // },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },

];

const rows = [
    // {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
    // {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
    // {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    // {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
    // {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    // {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
    // {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    // {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
    // {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},

];

export function DataTable() {

  //get users from Api

    const [devices, setDevices] = useState([]);
    useEffect(() => {
        const getDevices = async () => {
            const data = await users.getAll();
            console.log(data);
        };

        getDevices()
    }, [])

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
            />
        </div>
    );
}