import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { dateConvertMiladiToShamsi } from '../../../../common/method/date';
const useStyle = makeStyles(() => ({
    title: {
        borderBottom: "1px solid #B2B2B2"
    },
    textField: {
        [`& fieldset`]: {
            borderRadius: 10
        }
    }
}));
export default function IpoInfo({stateSelect}) {
    const [state, setState] = useState()
    const classes = useStyle();
    useEffect(() => {
        
        setState(stateSelect)
        
    }, [stateSelect])

    return <>
        <div className="bg-white rounded-lg shadow mb-10 " style={{height:"650px"}}>

            <div className={`${classes["title"]}  p-4 py-8 mb-2`}>
                <h3>اطلاعات عرضه اولیه</h3>
            </div>


            <div className='row p-5'>
                <div className='col'>
                    {items.map((itm, ind) => (

                        <div className='mb-5'>{
                            itm.item
                        }</div>

                    ))}


                </div>
                <div className='col '>
                  <div className='mb-5'>
                      {state?.body.ipo_date?dateConvertMiladiToShamsi(state?.body?.ipo_date):"-"}
                  </div>
                  <div className='mb-5'>
                  {state?.body.start_date?dateConvertMiladiToShamsi(state?.body?.start_date):"-"}
                  </div>
                  <div className='mb-5'>
                  {state?.body.end_date?dateConvertMiladiToShamsi(state?.body?.end_date):"-"}
                  </div>
                  <div className='mb-5'>
                     {state?.body.max_price?state?.body?.max_price:"-"}
                  </div>
                  <div className='mb-5'>
                  {state?.body.max_quantity?state?.body?.max_quantity:"-"}
                  </div>
                

                </div>



            </div>

            <h4 className='p-5' style={{color:"#ff5f00"}}>
            شرایط شرکت در عرضه (داشتن یکی از شرایط زیر الزامیست)

            </h4>
            <p className='py-3 px-6'>
            1- جمع مانده حساب بعلاوه جمع ارزش خالص پورتفوی می بایست حداقل - ریال باشد.

            </p>

            
        </div>


    </>;
}


let items = [
    { item: "تاریخ عرضه", id: 1 },
    { item: "تاریخ شروع ثبت نام", id: 2 },
    { item: "تاریخ پایان ثبت نام", id: 3 },
    { item: "آستانه مجاز قیمت	", id: 4 },
    { item: "حداکثر تعداد سهم قابل درخواست", id: 5 },
]
