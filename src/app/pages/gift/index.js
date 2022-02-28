import React, { useState } from "react";
import GiftSelectList from "../../modules/gift/gift_select_list";
import { Switch, Route } from "react-router-dom";
import GiftSelectOrder from "../../modules/gift/gift_select_order";
import GiftSelectAffordable from "../../modules/gift/gift_select_affordable";
import { Bonus } from "../../modules/Bonus/bonus_select-list";

export default function Index({ match }) {
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  // const suhbeader = useSubheader();
  // suhbeader.setTitle("جوایز");

  return (
    <div className=" p-1">
      <Switch>
        {/*<Route exact path={"/myGift"}>*/}
        {/*  <GiftSelectAffordable*/}
        {/*    checkedSwitch={checkedSwitch}*/}
        {/*    setCheckedSwitch={setCheckedSwitch}*/}
        {/*  />*/}
        {/*</Route>*/}
        <Route exact path={"/bonus"}>
          <Bonus />
        </Route>

        <Route exact path={"/gift/request"}>
          <GiftSelectOrder />
        </Route>

        <Route exact path={"/gift"}>
          {checkedSwitch ? (
            <GiftSelectAffordable
              checkedSwitch={checkedSwitch}
              setCheckedSwitch={setCheckedSwitch}
            />
          ) : (
            <GiftSelectList
              checkedSwitch={checkedSwitch}
              setCheckedSwitch={setCheckedSwitch}
            />
          )}
          {/*<GiftSelectList checkedSwitch={checkedSwitch} setCheckedSwitch={setCheckedSwitch}/>*/}
        </Route>
      </Switch>
    </div>
  );
}
