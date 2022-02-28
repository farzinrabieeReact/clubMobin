import React from 'react'
import PaymentInsert from './../../../../modules/market/stock/stock_insert_payment';
import PaymentSelectDetial from './../../../../modules/market/stock/stock_select_payment_detail';

function Index() {
    return (
        <div>
          
            <PaymentInsert />
            <hr className={'my-5'} />
            <PaymentSelectDetial />
        </div>
    )
}

export default React.memo(Index )