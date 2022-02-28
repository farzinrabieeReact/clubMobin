import { Box } from '@material-ui/core'
import React from 'react';
import Card from "./Card";


export default function ProcessLevel2({stateReducer , data}) {
    return (
        <div>
            <Box width="90%" className="mx-auto">
                {
                    stateReducer.filter(item => data.id === item.body.parent_post_id)
                        .map((item, ind) => (
                            <Card
                                subComment={true}
                                parentID={data.id}
                                data={item}
                                key={ind}
                            />
                        ))
                }
            </Box>
        </div>
    )
}
