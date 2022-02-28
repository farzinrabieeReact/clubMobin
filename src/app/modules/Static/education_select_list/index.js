import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from './card';
import { actionTypes } from '../../../../redux/static/education/education_select_list';
import { distinctMethod } from '../../../common/method/distinctMethod';


export default function Index() {

    const dispatch = useDispatch()
    const education = useSelector(state => state.reducer_education_select_list)

    const [state, setstate] = useState([])

    useEffect(() => {
        dispatch({ type: actionTypes.educationAsync })
    }, []) //eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if (education.data.length > 0) {
            setstate(education.data)
        }
    }, [education])


    return (
        <div>
            {
                state.map((item) => {
                    let Content = JSON.parse(item.body.content)
                    let categorys = distinctMethod(Content, ['category'])
                    return (
                        categorys.map((category, ind) => {
                            return (
                                <div className="bg-white rounded-lg p-10 shadow m-5" key={ind} >
                                    <div>
                                        <h3>{category}</h3>
                                    </div>
                                    <hr />
                                    {
                                        Content
                                        .filter(content => content.category === category)
                                        .map((content, _ind) => {
                                            return (
                                                <Card key={_ind} data={content} />
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    )
                })
            }
        </div>
    )
}
