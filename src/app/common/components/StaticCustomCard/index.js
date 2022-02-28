import React from 'react'

export default function Index({ title ,content }) {

    return (
        <div className="bg-white rounded-lg p-10 shadow m-5">
            <div>
                <h3>{title}</h3>
            </div>
            <hr />
            <div style={{ whiteSpace: 'normal' }} dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    )
}
