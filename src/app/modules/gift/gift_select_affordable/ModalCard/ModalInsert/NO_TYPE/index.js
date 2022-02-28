import React from 'react'


export default function Index({setopen}) {

    return (
        <div >
           <h3 className={'shadow p-5'}>جایزه ای برای مقدار ورودی نمی باشد</h3>
            <div className={'d-flex justify-content-center align-items-center mt-5'}>
                <button type="button" className="btn btn-outline-danger m-5"  onClick={() => setopen(prev => !prev)}>انصراف</button>
                {/* <button type="submit" className="btn btn-success" disabled={isSubmitting || !isValid} >ثبت </button> */}
            </div>
        </div>
    )
}
