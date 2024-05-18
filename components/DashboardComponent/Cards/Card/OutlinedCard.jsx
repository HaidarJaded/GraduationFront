import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Icon } from '@mui/material';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const CardComponent = ({ name,number,children }) => {
    console.log(number)
    return (
        <React.Fragment>
            <CardContent sx={{direction:"rtl", backgroundColor:"white",px:0,pt:2.5,pb:0,minWidth: 260,maxWidth:260,minHeight:100,maxHeight:100}}>
                <Typography sx={{mx:2, mb:0.4,fontSize: 14 }} color="text.primary">
                    {name}
                </Typography>

                <Typography sx={{fontSize: 26,fontWeight: 'bold'}} variant="body2">

                <IconButton aria-label="icon" >
                    <Icon sx={{fontSize: '0.5rem',height: '3em',width: '4em',color:'#694096'}}>{children}</Icon>
                </IconButton>
                    {number}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" sx={{color:'#6d40dc',height: '1.5em'}}><KeyboardBackspaceIcon sx={{height: '2rem',width: '2em'}}/></Button>
            </CardActions>
        </React.Fragment>
    );
};

export function OutlinedCard({ name,number ,children}) {
    return (
        <Box sx={{ mx:2,my:1 }}>
            <Card variant="outlined" sx={{ borderRadius:"15px",boxShadow:'8px 6px 11px -1px rgba(0,0,0,0.2)'}}>
                <CardComponent name={name} number={number}>
                    {children}
                </CardComponent>
            </Card>
        </Box>
    );
}
