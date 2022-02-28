import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTypesSelect } from "../../../../../redux/market/payOut/payOut_select";
import { handleNumber } from './../../../../common/method/displayData'
import { makeStyles } from "@material-ui/core/styles";
import FilterItem from './filter';
import Tables from './table';
import { LinearProgress } from "@material-ui/core";


const useStyle = makeStyles(theme => ({
  gridBenefit: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      '& > button': {
        width: '100%',
      },
      '& > p': {
        width: '90%',
        margin: 'auto',
        marginTop: 10,
        textAlign: 'center'
      }
    },
  },
  LinearProgress: {
    borderRadius: 5,
    width: '99.6%%',
    margin: 'auto',
    marginTop: 5,
    position: "relative",
    top: "4px",
  }

}));

const TableStock = () => {

  const classes = useStyle();
  const dispatch = useDispatch();

  const [state, setState] = useState([]);
  const [selectMultiRow, setSelectMultiRow] = useState({});
  const [stateFilter, setstateFilter] = useState('')
  const [flagAllCheckBox, setflagAllCheckBox] = useState(false)
  const [pagnation, setPagnation] = useState({ number: 1, count: 2 });
  const [benefit, setBenefit] = useState('به‌منظور محاسبه مجموع سود نقدی، ابتدا موارد اضافی را حذف نموده و سپس روی گزینه "محاسبه سود کل" کلیک کنید.')

  const stateReducer = useSelector(state => state.reducer_payOut_select);


  const changePagnation = page => {
    setPagnation((prev) => ({ ...prev, number: page }))
  };


  useEffect(() => {
    dispatch({
      type: actionTypesSelect.payOutSelectAsync,
      payload: { size: 6, from: 0 }
    });
  }, []);// eslint-disable-next-line react-hooks/exhaustive-deps


  useEffect(() => {
    if (stateReducer.data) {
      let _data = [...stateReducer.data]
      setState(_data);
      setPagnation((prev) => ({
        ...prev,
        count: Math.ceil(_data.length / stateReducer.size),
      }));
    }
  }, [stateReducer.data]); //eslint-disable-line react-hooks/exhaustive-deps



  const handleChangeCheckboxBody = (id) => {
    if (selectMultiRow[id]) {
      let dataPrev = selectMultiRow;
      delete dataPrev[id];
      setSelectMultiRow(() => ({ ...dataPrev }));
    } else {
      setSelectMultiRow((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleAllCheckBoxBody = () => {

    if (!flagAllCheckBox) {

      let obj = {}

      for (let index = 0; index < stateReducer.data.length; index++) {
        obj[stateReducer.data[index].id] = true
      }

      setSelectMultiRow(obj)

    } else {

      setSelectMultiRow({})

    }
    setflagAllCheckBox(prev => !prev)
  }

  const apiRemoveItems = (obj) => {

    if (!obj) return

    let res = stateReducer.data
      .filter((item) => {
        if (obj.hasOwnProperty(item.id)) {
          let dataPrev = selectMultiRow;
          delete dataPrev[item.id];
          setSelectMultiRow(() => ({ ...dataPrev }));
          return null
        }
        return item
      })


    if (!res.length) {
      setSelectMultiRow({})
      setflagAllCheckBox(false)
    }

    let data = {
      results: res,
      total: res.length
    }

    dispatch({ type: actionTypesSelect.payOutRemove, payload: data })

  }

  const apiSubmitBenefit = () => {

    if (Object.keys(selectMultiRow).length) {
      let amount = 0

      stateReducer.data
        .forEach((item) => {
          if (selectMultiRow.hasOwnProperty(item.id)) {
            amount += item.body.dividend_value
          }
        })

      setBenefit(amount)

    } else {
      let amount = 0

      stateReducer.data
        .forEach((item) => {
          amount += item.body.dividend_value
        })

      setBenefit(amount)
    }
  }

  return (
    <>
      {
        stateReducer.loading && (
          <LinearProgress className={classes['LinearProgress']} />
        )
      }
      <div className={
        'w-100 bg-white shadow rounded-lg py-5'
      }>

        <FilterItem
          selectMultiRow={selectMultiRow}
          apiRemoveItems={apiRemoveItems}
          setFilter={setstateFilter}
          Filter={stateFilter}
        />

        <Tables
          state={state}
          stateFilter={stateFilter}
          pagnation={pagnation}
          stateReducer={stateReducer}
          selectMultiRow={selectMultiRow}
          flagAllCheckBox={flagAllCheckBox}
          changePagnation={changePagnation}
          handleAllCheckBoxBody={handleAllCheckBoxBody}
          handleChangeCheckboxBody={handleChangeCheckboxBody}
        />



        <div className={classes['gridBenefit']}>
          <button
            type="button"
            className="btn btn-primary mx-5"
            onClick={() => apiSubmitBenefit()}>محاسبه سود کل</button>
          <p style={{ marginTop: 6 }}>
            {handleNumber(benefit)}
          </p>
        </div>
      </div >

    </>
  );
};




export default TableStock;
