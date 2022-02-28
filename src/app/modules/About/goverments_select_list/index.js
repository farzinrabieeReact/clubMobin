import React, { useEffect, useState } from 'react'
import Address from './address';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../../../../redux/about/goverments/goverments_select_list';


import Search from './Search';
import Pagination from './pagination';
import Table from './table';
import { distinctMethod } from './../../../common/method/distinctMethod';
import OutlinedCard from '../../../common/components/cardNoData';

export default function Index() {

    const dispatch = useDispatch()
    const goverments = useSelector(state => state.reducer_goverments_select_list)

    const [stateSreach, setstateSreach] = useState('')
    const [Pagnation, setPagnation] = useState(1) // 1 2 3 4 5 6  page

    const goverments_Select = (from, size) => {

        let pagination = {
            from: from ? from : 0,
            size: size ? size : 10
        }

        if (!stateSreach) {
            dispatch({ type: actionTypes.govermentsAsync, pagination })
            dispatch({ type: actionTypes.govermentsAsyncallData })
        }
    }

    const handelfilter = () => {
        let data = {
            Address: stateSreach
        }
        let pagination = handelFromSize()
        dispatch({ type: actionTypes.govermentsAsync, pagination, data })
    }

    const handelFromSize = () => {

        let from = null
        let size = null;

        if (Pagnation === 1) {
            from = 0
            size = 10
        } else {
            from = (Pagnation * 10) - 10
            size = 10
        }

        let pagination = {
            from,
            size
        }

        let data = {
            Address: stateSreach
        }

        dispatch({ type: actionTypes.govermentsAsyncallData, data })

        return pagination
    }

    useEffect(() => {
        if (Pagnation) {
            if (!stateSreach) {
                if (Pagnation === 1) {
                    goverments_Select(0, 10)
                } else {
                    goverments_Select((Pagnation * 10) - 10, 10)
                }
            } else {
                handelfilter()
            }
        }
    }, [Pagnation])//eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div>
            <Address />
            <hr />
            <Box className={'mt-5'}>
                <Search setPagnation={setPagnation} setstateSreach={setstateSreach} stateSreach={stateSreach} goverments_Select={goverments_Select} handelfilter={handelfilter} />
            </Box>
            <hr />
            <Box >
                {
                    goverments.data.length !== 0 && (
                        <Table data={goverments.data} ProvinceName={distinctMethod(goverments.data, ['body', "ProvinceName"])} />
                    )
                }
                                {
                    goverments.data.length === 0 && (<OutlinedCard />)
                }
            </Box>
            <Box className={'mt-5'}>
                {
                    goverments.data.length !== 0 && (
                        <Pagination data={goverments} setPagnation={setPagnation} Pagnation={Pagnation} />
                    )
                }
            </Box>
        </div>
    )
}
