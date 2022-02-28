import React, { useRef , useEffect } from 'react'
import './index.scss'

export default function Index({ data }) {

    let AcoordinRef = useRef()

    const handelClick = () => {
        let elem = AcoordinRef.current;

        elem.classList.toggle("active")
        let panel = elem.nextElementSibling;


        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.paddingBottom = null;

        } else {
            panel.style.maxHeight = panel.scrollHeight + 10 + "px";
            panel.style.paddingBottom = 10 + "px";
        }

    }

    useEffect(() => {
        let elem = AcoordinRef.current;
        let panel = elem.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.paddingBottom = null;
        } 
    }, [data])

    return (
        <div className={'crad_Accordion'}>
            <button className="accordion" ref= {AcoordinRef} onClick={()=>handelClick()}>

                <div>
                    {data.body.question}
                </div>
                <div>
                    <svg className={'icon'}>
                        <use xlinkHref='/sprite.svg#arrow-down'></use>
                    </svg>
                </div>
            </button>
            <div className="panel">
                <div style={{ whiteSpace: 'normal' }} dangerouslySetInnerHTML={{ __html: data.body.answer }}></div>
            </div>
        </div>
    )
}
