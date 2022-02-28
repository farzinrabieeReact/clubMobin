/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import BasePage from "./BasePage";
import { Logout } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";

export function Routes() {

    return (
        <Switch>
            <BasePage />

            <Route path="/error" component={ErrorsPage} />
            <Route path="/logout" component={Logout} />

        </Switch>
    );
}
