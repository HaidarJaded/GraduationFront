import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {notificationsServices} from "../../Routes/api/notices";
import {Box, Chip, MenuItem, Select, Stack} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import NotificationAddRoundedIcon from '@mui/icons-material/NotificationAddRounded';
import IconButton from "@mui/material/IconButton";
import {SendNotification} from "./SendNotification";


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}
        {...props}
    />
))(({theme}) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function AccordionNotices() {
    const [expanded, setExpanded] = React.useState('panel1');
    const [pagination, setPagination] = useState({});
    const [rowCount, setRowCount] = useState(pagination?.total)
    const [pageSize, setPageSize] = useState(pagination?.per_page)
    const [currentPage, setCurrentPage] = useState(pagination?.current_page);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [notifications, setNotifications] = useState([]);

    const fetchAndSetNotifications = useCallback(async () => {
        setLoading(true);
        setError(null);
        const params = {
            'dir': 'desc',
            'orderBy': 'created_at',
            'page': currentPage,
            'per_page': pageSize,
        };
        const response = await notificationsServices.getAll(params);
        const data = await response?.data;
        const status = await response?.status;
        data ? setNotifications(data?.body) : setNotifications([]);
        setPagination(data?.pagination);
        if (status !== 200) {
            setError(data?.message);
        }
        setLoading(false);
    }, [pageSize, currentPage]);

    useEffect(() => {
        fetchAndSetNotifications();
    }, [fetchAndSetNotifications, pageSize, currentPage]);

    useEffect(() => {
        setRowCount(pagination?.total)
        setPageSize(pagination?.per_page)
        setCurrentPage(pagination?.current_page)

    }, [pagination])
    const handleClose = () => {
        setOpen(false);
    };
    const reloadTable = async update => {
        fetchAndSetNotifications()
    };
    function CustomPagination() {
        const handlePageSizeChange = (event) => {
            setPageSize(Number(event.target.value));
            setCurrentPage(1)
        };
        const pageCount = Math.ceil(rowCount / pageSize);


        const firstItemIndex = (currentPage - 1) * pageSize + 1;
        const lastItemIndex = Math.min(currentPage * pageSize, rowCount);


        const startPages = range(1, Math.min(pageCount, 2));
        const endPages = range(Math.max(pageCount - 1, 2), pageCount);
        const middlePages = currentPage > 1 && currentPage < pageCount - 2
            ? [currentPage, currentPage + 1, currentPage + 2]
            : [2, 3];
        const paginationRanges = [...new Set([...startPages, ...middlePages, ...endPages])].sort((a, b) => a - b);
        const validPaginationRanges = paginationRanges.filter(page => page <= pageCount);

        return (
            <Stack direction="row" sx={{width: 1, px: 1, marginTop: 3, bgcolor: "#b9a9a985"}} alignItems="center"
                   spacing={2}>
                <Box sx={{
                    flexGrow:
                        '1',
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                }}>
                    <Select sx={{
                        paddingTop: '0',
                        paddingBottom: '0',
                        height: '30px',
                        borderRadius: '10px',
                    }} value={pageSize || 50} onChange={handlePageSizeChange} displayEmpty
                            inputProps={{'aria-label': 'Page size'}}>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                    <Typography sx={{
                        color:
                            '#8A9099'

                    }}>
                        {isAllSelected
                            ? `Showing ${rowCount} of ${rowCount}`
                            : `Showing ${firstItemIndex} - ${lastItemIndex} of ${rowCount}`}
                    </Typography>
                </Box>


                {validPaginationRanges.map((page, index) => (
                    <Button
                        sx={{
                            background:
                                'rgba(243,243,243,0)',
                            maxWidth: '25px',
                            minWidth: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: ' 25px',
                            borderRadius: '50%',
                            color: '#475467',

                            "&:hover": {

                                background: 'rgba(255,255,255,0.56)',
                            }, "&.Mui-disabled": {
                                color: "#182230",
                                opacity: "1",
                                background: '#f3f3f3',
                            },
                        }}
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        disabled={page === currentPage}
                        variant={'text'}
                    >
                        {paginationRanges[index + 1] < page ? `...` : page}
                    </Button>
                ))}
            </Stack>
        );
    }

    const isAllSelected = pageSize >= rowCount;

    function range(start, end) {

        return Array.from({length: end - start + 2}, (_, i) => start + i);
    }

    return (
        <>
        <Box sx={{
            m: 2,
            display: 'flex',
            gap: 2,
            justifyContent: 'end',
            alignItems: 'center',
        }}>
            <Box>

                <IconButton aria-label="delete" sx={{borderRadius:6}}
                            onClick={() => {
                                setOpen(true);
                            }}>
                <Stack direction="row" spacing={2}>
                    <Chip icon={<NotificationAddRoundedIcon/>} label="إرسال إشعار"
                          sx={{
                              fontSize: '18px',
                              padding:2.5,
                              backgroundColor: 'rgba(47,33,86,0.6)',
                              color: '#fff',
                              '& .MuiChip-icon': {
                                  color: '#fff',
                                  fontSize: '24px'
                              }
                          }} />
                </Stack>

                </IconButton>
            </Box>
        </Box>
            {loading ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    width: '100%',
                }}>
                    <Typography variant="h5" sx={{marginBottom: 2, color: "#1b0986eb", fontWeight: "bold"}}>
                        Loading...
                    </Typography>
                    <Box sx={{width: '50%'}}>
                        <LinearProgress/>
                    </Box>
                </Box>
            ) : error ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    width: '100%',
                }}>
                    <Typography variant="h5" sx={{color: "red", fontWeight: "bold"}}>
                        {error}
                    </Typography>
                </Box>
            ) : notifications?.length === 0 ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    width: '100%',
                }}>
                    <Typography variant="h5" sx={{color: "red", fontWeight: "bold"}}>
                        No Data
                    </Typography>
                </Box>
            ) : (
                <Box>

                    {notifications?.map((notification, index) => (
                        <Accordion
                            sx={{direction: 'rtl'}}
                            key={notification.id}
                            expanded={expanded === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}
                        >
                            <AccordionSummary
                                aria-controls={`panel${index}d-content`}
                                id={`panel${index}d-header`}
                            >
                                <Typography sx={{
                                    fontSize: 20,
                                    margin: 1,
                                    color: "#1b0986eb",
                                }}>{notification?.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {`مستلم الإشعار : ${notification?.notifiable_name}`}
                                <br/>
                                {`دور المستلم : ${notification?.notifiable_type}`}
                                <Typography>
                                    {notification?.body?.map((line, idx) => (
                                        <p key={idx}>{line}</p>
                                    ))}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    <CustomPagination/>
                </Box>
            )}
            <SendNotification
                open={open}
                onCloseDialog={handleClose}
                update={reloadTable}
            />
        </>
    );
}
