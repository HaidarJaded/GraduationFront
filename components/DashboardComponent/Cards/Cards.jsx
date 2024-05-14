import { OutlinedCard } from "./Card";
import TvIcon from '@mui/icons-material/Tv';
import DoneIcon from '@mui/icons-material/Done';
import BuildIcon from '@mui/icons-material/Build';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import HourglassDisabledRoundedIcon from '@mui/icons-material/HourglassDisabledRounded';
import {json} from "react-router-dom";


export function Cards({data}) {
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
                <OutlinedCard name='عدد الأجهزة الموجودة في المركز' number={data?.devices_count}>
                    <TvIcon />
                </OutlinedCard>

                <OutlinedCard name='عدد الجاهز منها' number={data?.ready_devices_count}>
                    <DoneIcon />
                </OutlinedCard>
                <OutlinedCard name='عدد الذي يتم العمل عليه' number={data?.in_progress_devices_count}>
                    <BuildIcon />
                </OutlinedCard>
                <OutlinedCard name='عدد الاجهزة القابلة للتسليم' number={data?.deliverable_devices_count}>
                    <BuildIcon />
                </OutlinedCard>
                <OutlinedCard name=' عدد التي تم تسليمها جاهزة' number={data?.ready_completed_devices_count}>
                    <LocalShippingOutlinedIcon />
                </OutlinedCard>
                <OutlinedCard name=' عدد التي تم تسليمها غير جاهزة' number={data?.unready_completed_devices_count}>
                    <PieChartRoundedIcon />
                </OutlinedCard>
                <OutlinedCard name='عدد الأجهزة التي تم تسليمها هذا الشهر' number={data?.completed_devices_count_in_this_month}>
                    <HourglassDisabledRoundedIcon />
                </OutlinedCard>
            </div>
        </>
    );
}