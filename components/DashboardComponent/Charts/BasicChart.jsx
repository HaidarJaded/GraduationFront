import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {Box} from "@mui/material";

export function BasicBars({ data }) {

    const clientsWithDevicesCount = data?.clients_with_devices_count;

    // Create a default entry for missing data
    const defaultEntry = { name: '', devices_count: 0 };

    // Prepare the data for each week
    const firstWeekData = clientsWithDevicesCount?.first_week || Array(4).fill(defaultEntry);
    const secondWeekData = clientsWithDevicesCount?.second_week || Array(4).fill(defaultEntry);
    const thirdWeekData = clientsWithDevicesCount?.third_week || Array(4).fill(defaultEntry);
    const fourthWeekData = clientsWithDevicesCount?.fourth_week || Array(4).fill(defaultEntry);

    // Combine all weeks into a single array
    const combinedData = firstWeekData.map((item, index) => ({
        name: item.name || `Client ${index + 1}`,
        firstWeek: item?.devices_count,
        secondWeek: secondWeekData[index]?.devices_count || 0,
        thirdWeek: thirdWeekData[index]?.devices_count || 0,
        fourthWeek: fourthWeekData[index]?.devices_count || 0,
    }));

    return (
        <Box sx={{
            backgroundColor: 'White',
            borderRadius: "10px",
            boxShadow: "0 45px 50% black",
            display: "flex",
            alignItems: "center",
            height: "300px",

        }}>
            <BarChart sx={{ backgroundColor: 'red'}} width={600} height={300} data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar width={500} dataKey="firstWeek" fill="#8884d8" name="الاسبوع الأول" />
                <Bar width={500} dataKey="secondWeek" fill="#483D8B" name="الاسبوع الثاني" />
                <Bar width={500} dataKey="thirdWeek" fill="#ffc658" name="الاسبوع الثالث" />
                <Bar width={500} dataKey="fourthWeek" fill="#8B008B" name="الاسبوع الرابع" />
            </BarChart>
        </Box>
    );
}
