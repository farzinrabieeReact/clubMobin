import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../../../../redux/education/courses/course_select_regsterCourse';
import Swiper from './swiper';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
    rootregster: {
        height: 440,
        overflowY: "auto"
    },
    line: {
        flexGrow: 1,
        marginRight: "10px",
        marginLeft: "10px",
    },
    spinner: {
        display: "inline-block",
        width: "25px"
    }
})


export default function Index() {
    const classes = useStyles()
    const { push } = useHistory()
    const dispatch = useDispatch()
    const regster = useSelector(state => state.reducerRegsterCourse)

    useEffect(() => {
        dispatch({ type: actionTypes.regsterCourseAsync })
    }, []) //eslint-disable-line react-hooks/exhaustive-deps


    const handelClick = (data) => {
        push({
            pathname: "/courses/detailsCourse",
            state: { data: data, status: 'RegsterCourse' }
        })
    }


    return (
        <div className={`mt-5 bg-white rounded-lg p-2 ${classes.rootregster}`}>
            <div className={'d-flex p-3'}>
                <div>
                    <h3 className="d-inline-block">رویدادهای ثبت‌ نام شده</h3>
                    {
                        regster.loading && (
                            <div className={classes.spinner}>
                                <span className="ml-2 spinner"></span>
                            </div>
                        )
                    }
                </div>
                <hr className={classes["line"]} />
            </div>
            <Swiper
                data={regster.data}
                handelClick={handelClick}
                loading={regster.loading}
            />
        </div>
    )
}
