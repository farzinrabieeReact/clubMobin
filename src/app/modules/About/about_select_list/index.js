import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from './card';
import { actionTypes } from '../../../../redux/about/about/about_select_list';

export default function Index() {

    const dispatch = useDispatch()
    const about = useSelector(state => state.reducer_about_select_list)

    const [state, setstate] = useState([])


    useEffect(() => {
        dispatch({ type: actionTypes.aboutAsync })
    }, []) //eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if (about.data.length > 0) {
            setstate(about.data)
        }
    }, [about])


    return (
        <div>
            {
                state.map((item) => {
                    let Content = JSON.parse(item.body.content)
                    return Content.map((content , ind) => {
                        return (
                            <Card key={ind}  data={content} />
                        )
                    })
                })
            }
        </div>
    )
}
