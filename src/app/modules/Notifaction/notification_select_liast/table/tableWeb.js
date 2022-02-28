import React, { useEffect, useState } from 'react'
import CardNotification from './../card';

export default function TableWeb({data,setStateWeb}) {
    const [state, setstate] = useState([])

    useEffect(() => {
        if(data){
            setstate(data)
        }
    }, [data])


    const handleChangeFilter = ()=>{
        
    }

    return (
        <div>
            {
                state.map((item , index)=>{
                    return(
                        <CardNotification key={index} data={item}  />
                    )
                })
            }
        </div>
    )
}
