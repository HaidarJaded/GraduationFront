import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {notificationsServices} from "../../Routes/api/notices";
import {Box} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

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

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [notifications, setNotifications] = useState([]);

    const fetchAndSetNotifications = useCallback(async () => {
        const params = {
            'dir': 'desc'
        };
        const data = await notificationsServices.getAll(params);
        setNotifications(data?.body);
        console.log(data?.body)
    }, []);

    useEffect(() => {
        fetchAndSetNotifications();
    }, [fetchAndSetNotifications]);

    return (
        <Box>
            {notifications.length === 0 ? (
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
                notifications.map((notification, index) => (
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
                ))
            )}
        </Box>
    );
}
