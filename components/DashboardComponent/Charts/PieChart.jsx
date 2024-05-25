import * as React from 'react';
 //import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';
import {Cell, Legend, Pie,PieChart, Tooltip} from "recharts";

function generateColor(index) {
    // const hue = (index * 137) % 360; // Using the golden angle approximation
    // return `hsl(${hue}, 50%, 60%)`;
    const customColors = [
        "rgba(60,57,85,0.85)",
        "#f8d96a",
        "rgba(19,142,168,0.66)",
        "rgba(5,7,112,0.87)",
        "rgba(192,188,188,0.94)",
    ];

    // استخدام فهرس رقم العناصر لاختيار لون من القائمة
    return customColors[index % customColors.length];
  }

// export function BasicPie({data}) {
//     const theme = useTheme();
//     const techniciansWithReadyDevicesCount =data?.technicians_with_ready_devices_count;
//     const dynamicData = techniciansWithReadyDevicesCount?.map((technician, index) => ({
//         id: index,
//         value: technician.completed_devices_count,
//         label: technician.name,
//         color: generateColor(index),
//     }))??[];
//     return (<div style={{
//             backgroundColor:'White',
//             display:"flex",
//             alignItems:"center",
//             height:"300px",
//             padding:"20px"
//         }}>
//             <PieChart
//                 series={[
//                     {
//                         data: dynamicData,
//                     },
//                 ]}
//                 width={500}
//                 height={240}
//
//             />
//         </div>
//     );
// }
export function BasicPie({ data }) {
    const theme = useTheme();
    const techniciansWithReadyDevicesCount = data?.technicians_with_ready_devices_count;
    const dynamicData = techniciansWithReadyDevicesCount?.map((technician, index) => ({
        id: index,
        value: technician?.completed_devices_count,
        name: technician?.name,
        color: generateColor(index),
    })) ?? [];


    return (
        <div style={{
            backgroundColor: 'white',
            display: "flex",
            justifyContent: "center", // Adjust the chart to be centered horizontally
            alignItems: "center",

        }}>
            <PieChart width={500} height={300}>
                <Pie
                    data={dynamicData}
                    cx={250}
                    cy={110}
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {
                        dynamicData?.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}

