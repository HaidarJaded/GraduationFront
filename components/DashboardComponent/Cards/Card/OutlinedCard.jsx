import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
    return (
        <React.Fragment>
            <CardContent sx={{direction:"rtl", backgroundColor:"white",px:2,pt:2.5,pb:0,minWidth: 260,maxWidth:600,minHeight:100,maxHeight:100}}>
                <Typography sx={{mx:2, mb:0.4,fontSize: 14 }} color="text.primary">
                    {name}
                </Typography>

                <Typography sx={{fontSize: 19,fontWeight: 'bold'}} variant="body2">
                <IconButton aria-label="icon" >
                    <Icon sx={{fontSize: '0.5rem',height: '3em',width: '4em',color:'#694096'}}>{children}</Icon>
                </IconButton>
                    {number}
                </Typography>
            </CardContent>
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
