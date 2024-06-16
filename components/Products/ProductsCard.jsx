import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Box, Grid, MenuItem, Pagination, Select, Stack, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {servicesProducts} from "../../Routes/api/products";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {Notify} from "../../utils";
import {EditProduct} from "./EditProduct";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {AddProduct} from "./AddProduct";

// const ExpandMore = styled((props) => {
//     const {expand, ...other} = props;
//     return <IconButton {...other} />;
// })(({theme, expand}) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));
const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'rgba(250,220,70,0.89)',
    borderColor: 'rgb(248,241,106)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#f3db84',
        borderColor: '#f3db84',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#f3db84',
        borderColor: '#f3db84',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

export function ProductCard() {
    // const [expanded, setExpanded] = React.useState(false);
    //
    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };
    const [rowIdAddProduct, setRowIdAddProduct] = React.useState(false);
    const [openAddProduct, setOpenAddProduct] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [rowId, setRowId] = React.useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [pagination, setPagination] = useState({});
    const [rowCount, setRowCount] = useState(pagination?.total)
    const [pageSize, setPageSize] = useState(pagination?.per_page)
    const [currentPage, setCurrentPage] = useState(pagination?.current_page)
    const handleCloseAddProduct = () => {
        setOpenAddProduct(false);
        setRowIdAddProduct(null)
    };
    const handleEditClick = (id) => () => {
        setOpen(true)
        setRowId(id)
    };
    const handleClose = () => {
        setOpen(false);
        setRowId(null)
    };
    const handleDeleteClick = (id) => async () => {
        setDeletingId(id);
        if (await servicesProducts.deleteProduct(id)) {
            Notify("colored",
                "تم الحذف بنجاح", "success");
        }
        setDeletingId(null);
        reloadTable("update")
    };
    const reloadTable = async update => {
        fetchAndSetProducts()
    };

    const [products, setProducts] = useState([]);
    const fetchAndSetProducts = useCallback(async () => {
        const params = {
            "dir": "[asc,desc]",
            'page': currentPage,
            'per_page': pageSize,
        };
        const data = await servicesProducts.getAllProducts(params);
        setPagination(data?.pagination);
        data ? setProducts(data?.body) : setProducts([]);
    }, [pageSize, currentPage]);


    useEffect(() => {
        fetchAndSetProducts();
        console.log(products)
    }, [fetchAndSetProducts,pageSize, currentPage]);

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
            {products.length === 0 ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100%',
                }}>
                    <Typography variant="h5" sx={{marginBottom: 2, color: "#1b0986eb", fontWeight: "bold"}}>
                        Loading...
                    </Typography>
                    <Box sx={{width: '50%'}}>
                        <LinearProgress/>
                    </Box>
                </Box>
            ) : (
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <BootstrapButton sx={{marginX: 6, marginTop: 2, direction: "rtl"}} variant="contained" disableRipple
                                     endIcon={<AddIcon sx={{marginRight: 2}}/>}
                                     onClick={() => {
                                         setRowIdAddProduct(1)
                                         setOpenAddProduct(true);
                                     }}>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            إضافة منتج
                        </Typography>
                    </BootstrapButton>
                    <Grid sx={{display: 'flex', flexDirection: ' row-reverse', alignItems: 'flex-end'}} container>
                        {products.map((product) => (
                            <Grid item key={product.id} sx={{marginY: 3, marginX: '3px'}}>
                                <Card xs={12} sm={6} md={12} lg={3} sx={{
                                    maxWidth: 300, minWidth: 300, marginX: {
                                        xs: 0,
                                        sm: 0,
                                        md: 1,
                                        lg: 0,
                                    }, borderRadius: "20px"
                                }}>
                                    <CardMedia
                                        sx={{marginY: 2, borderRadius: "20px"}}
                                        component="img"
                                        height="225"
                                        image="/assets/images/svg/logo-black.svg"
                                        alt="Service Image"
                                    />
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{bgcolor: '#50439ccc', padding: 3}} aria-label="recipe">
                                                MYP
                                            </Avatar>
                                        }
                                        title={<Typography variant="h6">
                                            {`منتج ${product.name}`}
                                        </Typography>}
                                        subheader={product.created_at}
                                    />
                                    <CardContent sx={{direction: "rtl"}}>
                                        <Typography variant="body1" color="text.primary">
                                            {`السعر: ${product.price}`}
                                        </Typography>
                                        <Typography variant="body1" color="text.primary">
                                            {`الكمية : ${product.quantity}`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="edit" sx={{color: "#ec6060"}}>
                                            <FavoriteIcon
                                                onClick={handleEditClick(product.id)}/>
                                        </IconButton>
                                        <IconButton aria-label="edit">
                                            <DeleteIcon
                                                onClick={handleDeleteClick(product.id)}
                                                disabled={deletingId === product.id}/>
                                        </IconButton>
                                    </CardActions>
                                </Card>

                            </Grid>
                        ))}

                    </Grid>
                    <CustomPagination/>
                    {rowId && (
                        <EditProduct
                            open={open}
                            onCloseDialog={handleClose}
                            id={rowId}
                            update={reloadTable}
                        />
                    )}
                    {rowIdAddProduct && (
                        <AddProduct
                            open={openAddProduct}
                            onClose={handleCloseAddProduct}
                            update={reloadTable}
                        />
                    )}
                </Box>
            )}
        </>
    );
}
