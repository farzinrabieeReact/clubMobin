import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../../../../redux/about/jobOpportunities/jobOpportunities_select_list';
import { distinctMethod } from '../../../common/method/distinctMethod';

export default function Index() {

    const dispatch = useDispatch()
    const jobOpportunities = useSelector(state => state.reducer_job_opportunities_select_list)

    const [state, setstate] = useState([])

    useEffect(() => {
        dispatch({ type: actionTypes.job_opportunitiesAsync })
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setstate(jobOpportunities.data)
    }, [jobOpportunities])


    return (
        <div>
            {
                state.map((item) => {
                    const data = JSON.parse(item.body.content)
                    let categorys = distinctMethod(data, ['Title'])
                    return (
                        categorys.map((category, ind) => {
                            return (
                                < div className="bg-white rounded-lg  m-5 p-5 shadow" key={ind} >
                                    <div className={'d-flex align-items-center'}>
                                        <h3 className={'p-3'}>{data[0].Title}</h3>
                                    </div>
                                    <hr />
                                    {
                                        data
                                            .filter(content => content.Title === category)
                                            .map((content, _ind) => {
                                                return (
                                                    <div key={_ind} className={'m-5'}>
                                                        <div style={{ whiteSpace: 'normal' }} dangerouslySetInnerHTML={{ __html: content.html }}></div>
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                            )
                        })

                    )
                })
            }

        </div >
    )
}
