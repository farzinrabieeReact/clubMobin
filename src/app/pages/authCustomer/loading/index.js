import { Backdrop, CircularProgress, withStyles } from '@material-ui/core';
import React from 'react';

const BackdropBlack = withStyles({
    root: {
      color: '#ef6d22',
      zIndex:1000000,
      backgroundColor:'#00000088 !important'
     
    },
    
  })((props) => <Backdrop color="default" {...props} />);




const Loading = ({flag}) => {
    return ( 
        <>
         <BackdropBlack
            className="target"
            open={flag}
            // onClick={handleClose}
          >
            <CircularProgress color="orange" size={50}/>
          </BackdropBlack>
        </>
     );
}
 
export default Loading;