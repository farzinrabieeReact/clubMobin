import React, { useState, useEffect, useRef } from 'react'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../../../../redux/gift/gift_select_activeGift'
import Card from './card';


export default function Index({ subCategory, category, flagClose, SetIndexAccordion, index, indexAccordion }) {


    let AcoordinRef = useRef()
    let dispatch = useDispatch();

    const [flagApi, setflagApi] = useState(false)
    const [state, setstate] = useState([])


    let reducerGiftActive = useSelector(state => state.reducergiftSelectActiveList)


    useEffect(() => {
        if (reducerGiftActive.data) {
            setstate(reducerGiftActive.data)
        }
    }, [reducerGiftActive])


    useEffect(() => {

        let data = {
            gift_category: category.gift_category,
            gift_sub_category: subCategory.body.gift_sub_category,
        }
        // console.log("data",data)
        if (flagClose)
            dispatch({ type: actionTypes.giftSelectActiveListAsync, payload: data })

    }, [flagApi, subCategory, category, indexAccordion])//eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if (!flagClose) {
            let elem = AcoordinRef.current;
            let panel = elem.nextElementSibling;
            panel.style.maxHeight = null;
            panel.style.paddingBottom = null;
            dispatch({type : actionTypes.giftRemoveState})
        }
    }, [flagClose]) //eslint-disable-line react-hooks/exhaustive-deps

    
    useEffect(() => {
        let elem = AcoordinRef.current;
        let panel = elem.nextElementSibling;
        panel.style.maxHeight = null;
        panel.style.paddingBottom = null;
    }, [category])


    const handelClick = () => {

        setflagApi(prev => !prev)
        SetIndexAccordion(index)

        let elem = AcoordinRef.current;
        elem.classList.toggle("active")
        let panel = elem.nextElementSibling;

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.paddingBottom = null;

        } else {
            panel.style.overflow = 'auto'
            panel.style.maxHeight = 420 + "px";
            panel.style.paddingBottom = 10 + "px";
        }

    }


    return (
        <div className={'crad_Accordion'} >
            <button className="accordion_Gift" ref={AcoordinRef} onClick={() => handelClick()}>
                <div className={'w-100'}>
                    {subCategory.body.gift_sub_category}
                </div>
                <div>
                    <svg className={'icon'}>
                        <use xlinkHref='/sprite.svg#arrow-down'></use>
                    </svg>
                </div>
            </button>
            <div className="panel_faq heightInAccordion">
                {
                    state.map((item, index) => {
                        return (
                            <Card key={index} data={item} />
                        )
                    })
                }
                <div style={{ whiteSpace: 'normal' }} dangerouslySetInnerHTML={{ __html: subCategory.body.answer }}></div>
            </div>

         
        </div>
    )
}
