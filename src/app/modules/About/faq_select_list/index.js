import React from 'react'
import { Box } from '@material-ui/core';
import List from './list';


export default function Index() {
    return (
        <Box>
             <Box className={'mb-5'}>
                <h3>سوالات متداول</h3>
            </Box>
            <Box>
                 <List />
            </Box>
        </Box>
    )
}
