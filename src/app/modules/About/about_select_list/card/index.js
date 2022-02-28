import React from 'react'

export default function Index({ data }) {

    return (
        <div className="bg-white rounded-lg p-10 shadow m-5" >
            <div>
                <h3>{data.Title}</h3>
            </div>
            <hr />
            <div style={{ whiteSpace: 'normal' }} dangerouslySetInnerHTML={{ __html: data.Content }}></div>
        </div>
    )
}
