import React from 'react';
import { useLocation } from 'react-router-dom';
import Card from "./Card";
import ProcessLevel2 from './ProcessLevel2';


export default function Process({ stateReducer }) {
    const location = useLocation()

    return (
        <div>
            {
                stateReducer
                    .filter(item => item.body.parent_post_id === location.state.id)
                    .map((item, ind) => (
                        <div key={ind}>
                            <Card data={item} />
                            <ProcessLevel2 stateReducer={stateReducer} data={item}  />
                        </div>
                    ))

            }


           
        </div>
    )
}
