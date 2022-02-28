import React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { dateConvertMiladiToShamsi } from '../../../../common/method/date';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

let useStyles = makeStyles({
    content: {
        width: '50%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        height: 50
    }
})


export default function Index({ data }) {


    // console.log("data",data);

    let classes = useStyles();
    let { push } = useHistory()

    const handelRout = () => {
        push({
            pathname: '/notifications/detailes',
            state: {
                data: data
            }
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
        <div className={'border-top pt-8'}>
            <div className={'d-flex justify-content-between align-items-center mb-5'}>
                <div>
                    <p className={'font-weight-bold'}>
                        {data.body.name}
                    </p>
                </div>
                <div className={'d-flex justify-content-between align-items'}>
                    <div className={'d-flex align-items mr-5'} >
                        <span className={'mr-2'}><PersonIcon /></span>
                        <span> {findRoll(data.body.source)}</span>
                    </div>
                    <div className={'d-flex align-items mr-5'}>
                        <span className={'mr-2'}><EventNoteIcon /></span>
                        <span>
                            {dateConvertMiladiToShamsi(data.body.start_time.split(' ')[0])}
                        </span>
                    </div>
                </div>
            </div>
            <div className={'d-flex justify-content-between align-items-center '}>
                <div className={classes['content']}>
                    <div dangerouslySetInnerHTML={{ __html: data.body.content }} className={classes['content']}></div>
                </div>
                <div>
                    <p className={'text-primary cursor-pointer'} onClick={() => handelRout()} >مشاهده بیشتر</p>
                </div>
            </div>
        </div>
    )
}
