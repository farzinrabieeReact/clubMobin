import React, { useEffect, useState } from 'react'
import { dateConvertMiladiToShamsi } from './../../../common/method/date'
import { useLocation } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { useHistory } from 'react-router-dom'

export default function Index() {

    let location = useLocation();
    let {push} = useHistory();

    const [state, setstate] = useState({
        id: '',
        body: {
            name: '',
            source: '',
            start_time: ''
        }
    })

    useEffect(() => {
        if (location.state?.data) {
            setstate(location.state.data)
        } else {
            handelRoute()
        }

    }, [location])//eslint-disable-line react-hooks/exhaustive-deps

    const handelRoute = ()=>{
        push({
            pathname:'/notifications'
        })
    }

    const findRoll = (key) => {
        switch (key) {
            case "ADMIN":
                return 'ادمین'
            case "OPERATOR":
                return 'اپراتور'
            case "MEMBER":
                return 'کاربر عادی'
            default:
                break;
        }
    }


    return (
        <div className={'bg-white rounded-lg shadow p-5'}>
            <div className={'d-flex justify-content-between align-items-center'}>
                <div>
                    <p className={'font-weight-bold mb-0'}>
                        {state.body.name}
                    </p>
                </div>

                <div className={'d-flex justify-content-between align-items-center'}>
                    <div className={'d-flex align-items mr-5'} >
                        <span className={'mr-2'}><PersonIcon /></span>
                        <span> {findRoll(state.body.source)}</span>
                    </div>
                    <div className={'d-flex align-items mr-5'}>
                        <span className={'mr-2'}><EventNoteIcon /></span>
                        <span>
                            {dateConvertMiladiToShamsi(state.body.start_time.split(' ')[0])}
                        </span>
                    </div>
                    <div>
                        <button className={'btn btn-light'} onClick={()=>handelRoute()}>بازگشت</button>
                    </div>
                </div>
            </div>
            <hr />
            <div style={{ minHeight: 200 }}>
                <div dangerouslySetInnerHTML={{ __html: state.body.content }}></div>
            </div>

        </div>
    )
}
