import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccordionsAccounts from "../../../common/components/AccordionsAccounts";
import { actionTypes } from "../../../../redux/static/accounts/accounts_select_list";

import { distinctMethod } from "./../../../common/method/distinctMethod";
import { LinearProgress } from "@material-ui/core";

export default function Index() {
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.reducer_accounts_select_list);

  const [state, setstate] = useState([]);

  useEffect(() => {
    dispatch({ type: actionTypes.accountsAsync });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (accounts.data.length > 0) {
      setstate(JSON.parse(accounts.data[0]?.body?.content));
    }
  }, [accounts]);

  return (
    <div>
      {/*{*/}
      {/*    state.map((item) => {*/}
      {/*        const data = JSON.parse(item.body.content)*/}
      {/*        let categorys = distinctMethod(data, ['Group'])*/}
      {/*        return (*/}
      {/*            categorys.map((category, ind) => {*/}
      {/*                return (*/}
      {/*                 */}

      {/*                )*/}
      {/*            })*/}
      {/*        )*/}
      {/*    })*/}
      {/*}*/}
      {accounts.loading && <LinearProgress />}
      <AccordionsAccounts state={state} />
    </div>
  );
}
