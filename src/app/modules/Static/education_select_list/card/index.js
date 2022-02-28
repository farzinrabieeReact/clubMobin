import React from 'react'

export default function Index({ data }) {

    return (
        <div className={'mt-8'}>
            <a href={data.link} target="_blank"  className={'text-secondary'} rel="noopener noreferrer" >
                <h6>{data.title}</h6>
            </a>
        </div>
    )
}
