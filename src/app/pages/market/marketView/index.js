import React from 'react'
import { useSubheader } from '../../../../_metronic/layout';
import { MarketViewModule } from '../../../modules/market/marketView'

export default function MarketViewPage() {
    const suhbeader = useSubheader();
    suhbeader.setTitle("نمای بازار");

    return (
        <div>
            <MarketViewModule />
        </div>
    )
}
