import React, { useState, useEffect } from 'react';
// import Accordion from './../../../../../common/components/CardDropDwon';
import Accordions from './../../../../../common/components/Accordions';





export default function Index({ data, defaultSelectItems }) {

    const [state, setstate] = useState([])

    useEffect(() => {
        setstate(data)
    }, [data, defaultSelectItems.category])


    return (
        <div className="w-100">
            {
                state
                    .filter(item => item.body.category === defaultSelectItems.category)
                    .map((item, index) => {
                        return (
                            <Accordions key={index} data={item} />
                        )
                    })

            }

        </div>


    )
}




