import React from 'react';

const Item1 = ({itm,background}) => {
    return (
        <>
            <div className={`d-flex flex-column  rounded-sm w-100`} >
                <div
                    style={{ height: "45px" ,borderRadius:"0 8px 8px 0"}}
                    className={`d-flex justify-content-center align-items-center
             ${background} w-100`}
                >
                    {itm.text}
                </div>
            </div>

        </>
    );
};

export default Item1;
