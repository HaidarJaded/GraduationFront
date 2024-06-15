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
import {Box, Grid, Pagination, Typography} from "@mui/material";
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
            "page": "1",
            "per_page": "10",
        };
        const data = await servicesProducts.getAllProducts(params);
        data ? setProducts(data?.body) : setProducts([]);
    }, []);


    useEffect(() => {
        fetchAndSetProducts();
        console.log(products)
    }, [fetchAndSetProducts]);
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
                    <Pagination count={10} hidePrevButton hideNextButton/>
                </Box>
            )}
        </>
    );
}
