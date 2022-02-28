import React from "react";
import Course from "./course";
import DetailsCourse from "./detailsCourse";

import { Switch, Route } from "react-router-dom";

export default function Index() {
  return (
    <Switch>
      <Route path="/courses/detailsCourse">
        <DetailsCourse />
      </Route>
      <Route path="/courses">
        <div>
          <Course />
        </div>
      </Route>
    </Switch>
  );
}
