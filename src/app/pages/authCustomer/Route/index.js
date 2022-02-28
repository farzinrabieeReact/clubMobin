

import React from 'react';




const Route = ({children,step}) => {
    return ( 
        <>
        <div className="w-100 h-100">
            {children[step-1]}
        </div>
        </>
     );
}
 
export default Route;