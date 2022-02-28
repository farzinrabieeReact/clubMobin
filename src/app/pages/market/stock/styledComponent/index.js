import React from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
    root:{

    }
})


export const Div = ({ children }) => {

    let classes = useStyles();

    return (
        <div className={`${classes['root']} bg-white rounded-lg`}> 
            {children}
        </div>
    )
}