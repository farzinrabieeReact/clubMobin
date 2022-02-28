import React from 'react'
import ModalCustom from './../../../../common/components/ModalCustom';


export default function Index({ children, open, setOpen, indexChild }) {
    return (
        <div>
            <ModalCustom open={open} setOpen={setOpen} >
                {children[indexChild]}
            </ModalCustom>
        </div>
    )
}
