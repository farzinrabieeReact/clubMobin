import React from 'react'
import CourseActiveCourse from '../../../../modules/education/course_select_activeCourse';
import CourseRegster from '../../../../modules/education/course_select_regstrationCourse';
import { useSubheader } from "../../../../../_metronic/layout";
import { useSelector } from 'react-redux';
import { getTimeActiveToken, timeExpireToken } from "../../../../common/components/apiConfig";



export default function Index() {
    const suhbeader = useSubheader();
    suhbeader.setTitle("دوره های آموزشی");

    const { user } = useSelector(state => state.auth);



    return (
        <>
            <div>
                <CourseActiveCourse />
                {
                    (user && getTimeActiveToken() < timeExpireToken) && (
                        <CourseRegster />
                    )
                }
            </div>
        </>
    )
}
