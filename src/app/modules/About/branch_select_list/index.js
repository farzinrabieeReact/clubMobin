import React, { useEffect, useState } from 'react'
import Address from './address';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../../../../redux/about/branchPage/branch_select_list';


import Search from './Search';
import Pagination from './pagination';
import Table from './table';
import { distinctMethod } from './../../../common/method/distinctMethod';
import OutlinedCard from '../../../common/components/cardNoData';

export default function Index() {

    const dispatch = useDispatch()
    const branch = useSelector(state => state.reducer_branch_select_list)

    const [stateSreach, setstateSreach] = useState('')
    const [Pagnation, setPagnation] = useState(1) // 1 2 3 4 5 6  page


    const branch_Select = (from, size) => {

        let pagination = {
            from: from ? from : 0,
            size: size ? size : 10
        }

        if (!stateSreach) {
            dispatch({ type: actionTypes.branchPageAsync, pagination })
            dispatch({ type: actionTypes.branchPageAsyncallData })

        }

    }

    const handelfilter = () => {

        let data = {
            Address: stateSreach
        }
        let pagination = handelFromSize()
        dispatch({ type: actionTypes.branchPageAsync, pagination, data })
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

        dispatch({ type: actionTypes.branchPageAsyncallData, data })

        return pagination
    }

    useEffect(() => {
        if (Pagnation) {
            if (!stateSreach) {
                if (Pagnation === 1) {
                    branch_Select(0, 10)
                } else {
                    branch_Select((Pagnation * 10) - 10, 10)
                }
            } else {
                handelfilter()
            }
        }
    }, [Pagnation]) //eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div>
            <Address />
            <hr />
            <Box className={'mt-5'}>
                <Search setPagnation={setPagnation} setstateSreach={setstateSreach} stateSreach={stateSreach} branch_Select={branch_Select} handelfilter={handelfilter} />
            </Box>
            <hr />
            <Box >
                {
                    branch.data.length !== 0 && (
                        <Table data={branch.data} ProvinceName={distinctMethod(branch.data, ['body', "ProvinceName"])} />
                    )
                }
                {
                    branch.data.length === 0 && (<OutlinedCard />)
                }
            </Box>
            {
                branch.data.length !== 0 && (
                    <Box className={'mt-5'}>
                        <Pagination data={branch} setPagnation={setPagnation} Pagnation={Pagnation} />
                    </Box>
                )
            }
        </div>
    )
}
