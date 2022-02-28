import React  from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSubheader } from "../../../_metronic/layout";
import { ProfileOverview } from "../../modules/UserProfile/ProfileOverview";
import ChangePassword from "../../modules/UserProfile/ChangePassword";
import Clubmember_select_personaInformation from "../../modules/UserProfile/Clubmember_select_personaInformation";
import Clubmember_select_editprofile from "../../modules/UserProfile/Clubmember_select_editprofile/index";
import { ClubmemberSelectInfo } from "../../modules/UserProfile/Clubmember_select_info";


export default function UserProfilePage() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("پروفایل");


  return (
    <div className="d-flex flex-column flex-lg-row">
      <ClubmemberSelectInfo />
      <div className="flex-row-fluid ml-lg-4">
        <Switch>
          <Redirect
            from="/user-profile"
            exact={true}
            to="/user-profile/profile-overview"
          />
          <Route
            path="/user-profile/profile-overview"
            component={() => <ProfileOverview />}
          />
          <Route
            path="/user-profile/personal-information"
            component={Clubmember_select_personaInformation}
          />
           <Route
            path="/user-profile/personal-edit"
            component={Clubmember_select_editprofile}
          />

          <Route
            path="/user-profile/change-password"
            component={ChangePassword}
          />
        </Switch>
      </div>
    </div>
  );
}