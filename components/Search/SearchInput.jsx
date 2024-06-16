import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export function CustomizedInputBase() {
    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', m: '14px 13px', display: 'flex', alignItems: 'center', width: 250}}
        >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Search"
                inputProps={{'aria-label': 'search'}}
            />
            <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                <SearchIcon/>
            </IconButton>

        </Paper>
    );
}