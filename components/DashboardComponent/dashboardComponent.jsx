import {Title} from "../Title";
import {Cards} from "./Cards";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import {GridChart} from "./GridChart";
import {BasicBars, BasicPie} from "./Charts";
import {useEffect, useState} from "react";
import {completedDevices} from "../../Routes/api/completedDevices";
import {DashboardInfo} from "../../Routes/api/dashboardInfo";

export function DashboardComponent(){

    const [dashboardInfo, setDashboardInfo] = useState({});

    useEffect(() => {
        const getDashboardInfo = async () => {
            const data = await DashboardInfo.getDashboardInfo();
            setDashboardInfo(data);
        };
        getDashboardInfo();
    }, [])
    return (
        <>
            <div className="Devices">
                <Title title="الأجهزة" />
                <Cards data={dashboardInfo}/>
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <GridChart title="الموارد البشرية">
                        <BasicBars data={dashboardInfo}/>
                    </GridChart>

                    <GridChart title="الموارد">
                        <BasicPie data={dashboardInfo} />
                    </GridChart>
                </Grid>
            </Box>
        </>
    );
}