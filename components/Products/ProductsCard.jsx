import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useCallback, useEffect, useState} from "react";
import {Box, CircularProgress, Grid, Pagination, Select, Stack, Typography} from "@mui/material";
import {servicesServices} from "../../Routes/api/services";
import LinearProgress from "@mui/material/LinearProgress";
import {servicesProducts} from "../../Routes/api/products";
import {Heading} from "lucide-react";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export function ProductCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
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
            {products.length===0?(
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
            ):(
                <Box>
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={6} lg={3} key={product.id}>
                                <Card sx={{ maxWidth: 295, minWidth: 295, marginX:2,marginY:2 , borderRadius: "20px" }}>
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
                                        title={`${product.name} منتج `}
                                        subheader={product.created_at}
                                    />
                                    <CardContent sx={{ direction: "rtl" }}>
                                        <Typography variant="body1" color="text.primary">
                                            {`السعر: ${product.price}`}
                                        </Typography>
                                        <Typography variant="body1" color="text.primary">
                                            {`الكمية : ${product.quantity}`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="edit">
                                            <FavoriteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>

                            </Grid>
                        ))}

                    </Grid>
                    <Pagination count={10} hidePrevButton hideNextButton />
                </Box>
            )}
        </>
    );
}
