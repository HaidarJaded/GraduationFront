import { useEffect, useState } from 'react';
import { OutlinedCard } from "./Card";
import TvIcon from '@mui/icons-material/Tv';
import DoneIcon from '@mui/icons-material/Done';
import BuildIcon from '@mui/icons-material/Build';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import HourglassDisabledRoundedIcon from '@mui/icons-material/HourglassDisabledRounded';
import axiosInstance from "../../../utils/auth/axiosInstance"
import { responseErrorHandlers } from "../../../wrappers";
import getConfig from "next/config";

export function Cards() {
    const [dashbardInfo, setDashbardInfo] = useState({});
    useEffect(() => {
        const getDashboardInfo = async () => {
            try {
                const { publicRuntimeConfig } = getConfig();
                const DASHBOARD_INFO_URL = "api/dashboard_info";
                const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

                const responseData = await axiosInstance
                    .get(`${BASE_URL}${DASHBOARD_INFO_URL}`)
                    .then(async (response) => {
                        return response?.data?.body;
                    });

                setDashbardInfo(responseData);
            } catch (error) {
                responseErrorHandlers(error?.response);
            }
        };
        getDashboardInfo();
    }, [])

    return (
        <>
            <div style={{
                display: ' flex',
                alignContent: 'center',
                alignItems: 'baseline',
                flexDirection: 'row-reverse',
                flexWrap: 'wrap',
                justifyContent: ' flex-start'

            }}>
                <OutlinedCard name='عدد الأجهزة الموجودة في المركز' number={dashbardInfo.devices_count}>
                    <TvIcon />
                </OutlinedCard>

                <OutlinedCard name='عدد الجاهز منها' number={dashbardInfo.ready_devices_count}>
                    <DoneIcon />
                </OutlinedCard>
                <OutlinedCard name='عدد الذي يتم العمل عليه' number={dashbardInfo.in_progress_devices_count}>
                    <BuildIcon />
                </OutlinedCard>
                <OutlinedCard name='عدد الاجهزة القابلة للتسليم' number={dashbardInfo.deliverable_devices_count}>
                    <BuildIcon />
                </OutlinedCard>
                <OutlinedCard name=' عدد التي تم تسليمها جاهزة' number={dashbardInfo.ready_completed_devices_count}>
                    <LocalShippingOutlinedIcon />
                </OutlinedCard>
                <OutlinedCard name=' عدد التي تم تسليمها غير جاهزة' number={dashbardInfo.unready_completed_devices_count}>
                    <PieChartRoundedIcon />
                </OutlinedCard>
                <OutlinedCard name='عدد الأجهزة التي تم تسليمها هذا الشهر' number={dashbardInfo.completed_devices_count_in_this_month}>
                    <HourglassDisabledRoundedIcon />
                </OutlinedCard>
            </div>
        </>
    );
}