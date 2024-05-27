import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {Box} from "@mui/material";

export function BasicBars({ data }) {
    
    const clientsWithDevicesCount = data?.clients_with_devices_count;
    return (
        <Box sx={{
            backgroundColor: 'White',
            borderRadius: "10px",
            boxShadow: "0 45px 50% black",
            display: "flex",
            alignItems: "center",
            height: "300px",

        }}>
            <BarChart sx={{ backgroundColor: 'red'}} width={600} height={300} data={clientsWithDevicesCount}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar width={500} dataKey="first_week" fill="#8884d8" name="الاسبوع الأول" />
                <Bar width={500} dataKey="second_week" fill="#483D8B" name="الاسبوع الثاني" />
                <Bar width={500} dataKey="third_week" fill="#ffc658" name="الاسبوع الثالث" />
                <Bar width={500} dataKey="fourth_week" fill="#8B008B" name="الاسبوع الرابع" />
            </BarChart>
        </Box>
    );
}
