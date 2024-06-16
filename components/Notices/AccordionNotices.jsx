import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {notificationsServices} from "../../Routes/api/notices";
import {Box, MenuItem, Select, Stack} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";

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
    const [currentPage, setCurrentPage] = useState(pagination?.current_page)
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [notifications, setNotifications] = useState([]);

    const fetchAndSetNotifications = useCallback(async () => {
        const params = {
            'dir': 'desc',
            'page':currentPage,
            'per_page': pageSize,
        };
        const data = await notificationsServices.getAll(params);
        setPagination(data?.pagination);
        setNotifications(data?.body);
        console.log(data?.body)
    }, [pageSize, currentPage]);

    useEffect(() => {
        fetchAndSetNotifications();
    }, [fetchAndSetNotifications,pageSize, currentPage]);

    useEffect(() => {
        setRowCount(pagination?.total)
        setPageSize(pagination?.per_page)
        setCurrentPage(pagination?.current_page)

    }, [pagination])
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
            <Stack direction="row" sx={{width: 1, px: 1,marginTop:3,bgcolor:"#b9a9a985"}} alignItems="center" spacing={2}>
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
        <Box>
            {notifications?.length === 0 ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100%',
                }}>
                    <Typography variant="h5" sx={{ marginBottom: 2, color: "#1b0986eb", fontWeight: "bold" }}>
                        Loading...
                    </Typography>
                    <Box sx={{ width: '50%' }}>
                        <LinearProgress />
                    </Box>
                </Box>
            ) : (
              <Box>

                  {notifications?.map((notification, index) => (
                  <Accordion
                      sx={{direction:'rtl'}}
                      key={notification.id}
                      expanded={expanded === `panel${index}`}
                      onChange={handleChange(`panel${index}`)}
                  >
                      <AccordionSummary
                          aria-controls={`panel${index}d-content`}
                          id={`panel${index}d-header`}
                      >
                          <Typography sx={{ fontSize: 20, margin: 1,color: "#1b0986eb", }}>{notification.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                          <Typography>
                              {notification.body.map((line, idx) => (
                                  <p key={idx}>{line}</p>
                              ))}
                          </Typography>
                      </AccordionDetails>
                  </Accordion>
                  ))}
                  <CustomPagination/>
              </Box>
            )}
        </Box>
    );
}
