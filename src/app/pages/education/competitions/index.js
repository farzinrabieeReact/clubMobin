import React from "react";
import { Route, Switch } from "react-router-dom";
import CompetitionsSelectActiveCompetitions from "../../../modules/education/competitions_select_activeCompetitions";
import CompetitionsSelectParticipations from "../../../modules/education/competitions_select_participations";
import CompetitionsArchive from "../../../modules/education/competitions_select_archive_competitions";

export default function Competitions() {
  return (
    <div>
      <Switch>
        {/*<Redirect*/}
        {/*  from="/competitions"*/}
        {/*  exact={true}*/}
        {/*  to="education/competitions"*/}
        {/*/>*/}
        <Route exact path="/competitions">
          <CompetitionsSelectActiveCompetitions />
        </Route>

        <Route path="/competitions/ICompetitions">
          <CompetitionsSelectParticipations />
        </Route>
        {/*<Route path="/competitions/ICompetitions">*/}
        {/*  <CompetitionsSelectParticipations />*/}
        {/*</Route>*/}
        <Route path="/competitions/archive">
          <CompetitionsArchive />
        </Route>
      </Switch>
    </div>
  );
}
