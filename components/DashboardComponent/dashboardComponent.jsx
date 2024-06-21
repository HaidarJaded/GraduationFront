import {Title} from "../Title";
import {Cards} from "./Cards";
import Box from "@mui/material/Box";
import {Grid, Icon} from "@mui/material";
import {GridChart} from "./GridChart";
import {BasicBars, BasicPie} from "./Charts";
import {useCallback, useEffect, useState} from "react";
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import NoMeetingRoomRoundedIcon from '@mui/icons-material/NoMeetingRoomRounded';
import {DashboardInfo} from "../../Routes/api/dashboardInfo";
import {OutlinedCard} from "./Cards/Card";
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import {useRouter} from "next/router";
import {EditCenterCard} from "../Center";

export function DashboardComponent() {
    const [editCenterOpen, setEditCenterOpen] = useState(false);
    const [dashboardInfo, setDashboardInfo] = useState({});

    useEffect(() => {
        const getDashboardInfo = async () => {

        };
        getDashboardInfo();
    }, [])

    const [centerInfo, setCenterInfo] = useState({});

    const fetchAndSetDashboardInfo = useCallback(async () => {

        const data = await DashboardInfo.getDashboardInfo();
        data ? setDashboardInfo(data) : setDashboardInfo([]);
    }, []);

    useEffect(() => {
        fetchAndSetDashboardInfo();
    }, [fetchAndSetDashboardInfo]);

    const fetchAndSetCenterInfo = useCallback(async () => {

        const data = await DashboardInfo.getCenterInfo();
        data ? setCenterInfo(data) : setCenterInfo([]);
    }, []);

    const route = useRouter()

    useEffect(() => {
        fetchAndSetCenterInfo();
    }, [fetchAndSetCenterInfo]);
    const reloadTable = async update => {
        fetchAndSetCenterInfo();
        fetchAndSetDashboardInfo();
    };
    const handleClose = () => {
        setEditCenterOpen(false);
    };
    return (
        <>
            <Box className="Devices">
                <Title title="معلومات المركز"/>

                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'end',
                    marginRight:2
                }}>
                    <Typography sx={{fontSize: 22,fontWeight: 'bold'}} variant="body2">
                        <IconButton aria-label="icon" >
                            <Icon sx={{fontSize: '0.5rem',height: '3em',width: '4em',color:'#694096'}}><EditIcon
                                onClick={()=>{
                                    setEditCenterOpen(true);
                                }}
                            /></Icon>
                        </IconButton>
                        تعديل معلومات المركز
                    </Typography>
                </Box>

                <Box sx={{
                    display: ' flex',
                    alignContent: 'center',
                    alignItems: 'baseline',
                    flexDirection: 'row-reverse',
                    flexWrap: 'wrap',
                    justifyContent: ' flex-start'

                }}>

                    <OutlinedCard name='اسم المركز' number={centerInfo[0]?.name}>
                        <StoreRoundedIcon />
                    </OutlinedCard>
                    <OutlinedCard name='عنوان المركز' number={centerInfo[0]?.address}>
                        <BadgeRoundedIcon />
                    </OutlinedCard>
                    <OutlinedCard name='حالة المركز' number={centerInfo[0]?.status}>
                        {
                            centerInfo[0]?.status === 'مفتوح' ? (
                                <MeetingRoomRoundedIcon />
                            ) : (
                                <NoMeetingRoomRoundedIcon />
                            )
                        }
                    </OutlinedCard>
                    <OutlinedCard name='ساعات بدء العمل' number={centerInfo[0]?.start_work}>
                        <QueryBuilderRoundedIcon/>
                    </OutlinedCard>
                    <OutlinedCard name='ساعات انتهاء العمل' number={centerInfo[0]?.end_work}>
                        <QueryBuilderRoundedIcon/>
                    </OutlinedCard>
                </Box>

            </Box>
            <Box className="Devices">
                <Title title="الأجهزة"/>
                <Cards data={dashboardInfo}/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={1}>
                    <GridChart title="أكثر أربعة عملاء تعاملا على مدار الشهر">
                        <BasicBars data={dashboardInfo}/>
                    </GridChart>

                    <GridChart title="أفضل 5 فنيين ">
                        <BasicPie data={dashboardInfo}/>
                    </GridChart>
                </Grid>
            </Box>
            <EditCenterCard
                open={editCenterOpen}
                id={centerInfo[0]?.id}
                onCloseDialog={handleClose}
                update={reloadTable}
            />
        </>
    );
}