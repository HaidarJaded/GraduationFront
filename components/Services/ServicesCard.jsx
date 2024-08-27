import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {useCallback, useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {Box, Chip, Grid, MenuItem, Select, Stack, Typography} from "@mui/material";
import {servicesServices} from "../../Routes/api/services";
import LinearProgress from "@mui/material/LinearProgress";
import {EditService} from "./EditService";
import {Notify} from "../../utils";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {AddService} from "./AddService";
import {styled} from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";


export function RecipeReviewCard() {

    const [open, setOpen] = React.useState(false);
    const [rowId, setRowId] = React.useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [openAddService, setOpenAddService] = React.useState(false);
    const [pagination, setPagination] = useState({});
    const [rowCount, setRowCount] = useState(pagination?.total)
    const [pageSize, setPageSize] = useState(pagination?.per_page)
    const [currentPage, setCurrentPage] = useState(pagination?.current_page)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleDeleteClick = (id) => async () => {
        setDeletingId(id);
        if (await servicesServices.deleteService(id)) {
            Notify("colored",
                "تم الحذف بنجاح", "success");
        }
        setDeletingId(null);
        reloadTable("update")
    };
    const handleCloseAddService = () => {
        setOpenAddService(false);
    };
    const handleClose = () => {
        setOpen(false);
        setRowId(null)
    };
    const handleEditClick = (id) => () => {
        setOpen(true)
        setRowId(id)
    };
    const reloadTable = async update => {
        fetchAndSetServices()
    };
    const [services, setServices] = useState([]);
    const fetchAndSetServices = useCallback(async () => {
        setLoading(true);
        setError(null);
        const params = {
            "dir": "[asc,desc]",
            'page': currentPage,
            'per_page': pageSize,
        };
        const response = await servicesServices.getAllServices(params);
        const data = await response?.data;
        const status = await response?.status;
        data ? setServices(data?.body) : setServices([]);
        setPagination(data?.pagination);
        if (status !== 200) {
            setError(data?.message);
        }
        setLoading(false);
    }, [pageSize, currentPage]);


    useEffect(() => {
        fetchAndSetServices();
    }, [fetchAndSetServices,pageSize, currentPage]);

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
                    alignItems: "center"
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

                    <IconButton aria-label="delete"
                                sx={{borderRadius:6}}
                                onClick={() => {
                                    setOpenAddService(true);
                                }}>
                        <Stack direction="row" spacing={2}>
                            <Chip icon={<AddIcon/>} label=" إضافة خدمة"  sx={{
                                fontSize: '18px',
                                padding:2.5,
                                backgroundColor: 'rgba(47,33,86,0.6)',
                                color: '#fff',
                                '& .MuiChip-icon': {
                                    color: '#fff',
                                    fontSize: '24px'
                                }
                            }}  />
                        </Stack>

                    </IconButton>

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
            ) : services.length===0?(
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    width: '100%',
                }}>
                    <Typography variant="h5" sx={{color: "red", fontWeight: "bold"}}>
                      No data
                    </Typography>
                </Box>
            ):(
                <Box>
                    <Grid sx={{display: 'flex', flexDirection: ' row-reverse', alignItems: 'flex-end'}} container spacing={2}>
                        {services.map((service) => (
                            <Grid item key={service.id} sx={{marginY: 3, marginX: '3px'}}>
                                <Card xs={12} sm={6} md={12} lg={3} sx={{
                                    maxWidth: 300, minWidth: 300, marginX: {
                                        xs: 0,
                                        sm: 0,
                                        md: 1,
                                        lg: 0,
                                    }, borderRadius: "20px"
                                }}>
                                    <CardMedia
                                        sx={{ marginY: 2, borderRadius: "20px" }}
                                        component="img"
                                        height="225"
                                        image="/assets/images/svg/logo-black.svg"
                                        alt="Service Image"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: '#50439ccc', padding: 3 }} aria-label="recipe">
                                                MYP
                                            </Avatar>
                                        }
                                        title={` خدمة ${service.name}`}
                                        subheader={service.created_at}
                                    />
                                    <CardContent sx={{ direction: "rtl" }}>
                                        <Typography variant="body1" color="text.secondary">
                                            {` نوع الجهاز :  ${service.device_model}`}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {`السعر: ${service.price}`}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {`الوقت: ${service.time_required}`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="edit"  sx={{color: "#3c1b7e"}}>
                                            <EditIcon
                                                onClick={handleEditClick(service.id) }/>
                                        </IconButton>
                                        <IconButton aria-label="delete"
                                                    onClick={handleDeleteClick(service.id)}
                                                    disabled={deletingId === service.id}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </CardActions>
                                </Card>

                            </Grid>
                        ))}

                    </Grid>
                </Box>

            )}
                    {rowId && (
                        <EditService
                            open={open}
                            onCloseDialog={handleClose}
                            id={rowId}
                            update={reloadTable}
                        />
                    )}

                <AddService
                    open={openAddService}
                    onClose={handleCloseAddService}
                    update={reloadTable}
                />

                    <CustomPagination/>


        </>
    );
}
