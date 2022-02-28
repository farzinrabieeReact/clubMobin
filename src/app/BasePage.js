import React, { Suspense, lazy, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute, Layout } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
// import { DashboardPage } from "./pages/DashboardPage";
// import { AuthPage } from "./modules/Auth";
import { AuthPageNew } from "./modules/Auth";

import Faq from "./pages/about/faq";
import Branch from "./pages/about/branchPage";
import Goverments from "./pages/about/Goverments";
// import JobOpportunities from "./pages/about/jobOpportunities";
import Accounts from "./pages/static/Accounts";
import Creadit from "./pages/static/creadit";
import Education from "./pages/static/education";
import About from "./pages/about/about";
import Competitions from "./pages/education/competitions";
import Posts from "./pages/Posts";
import Treemap from "./pages/treemap";
import MarketView from "./pages/market/marketView";
import Courses from "./pages/education/courses";
import Feedback from "./pages/about/feedback";
import Notifications from "./pages/notification/notifications";
import Gift from "./pages/gift";
import Stock from "./pages/market/stock";
import SignUpHelp from "./pages/static/SignUpHelp";
import Home from "./pages/home";
import SymbolInformation from "./pages/market/symbolInfo";
import Ipo from "./pages/market/ipo";
import HocIsLogin from "./common/components/HosIsLogin";
import HocIsCustomer from "./common/components/HosIsCustomer";
import AuthCustomer from "./pages/authCustomer";
// import HadafHafez from "./modules/posts/hadafHafez";
import Tornover from "./pages/market/Turnover/index";
import brochuresCourses from './pages/static/brochure';
import tradesCredit from './pages/tradesCredit';
import Dps from './pages/static/bourse_info/DPS';
import RaisingCapital from './pages/static/bourse_info/RaisingCapital';
import Bourse from './pages/Bourse'
import statusBourse from "./pages/Bourse/statusBourse";
import MerchantileNew from "./pages/Bourse/MerchantileNew";


import PayOuts from "./pages/market/payOut/index";
import TelegramLinks from "./pages/static/telegramLinks/index";

const UserProfilepage = lazy(() =>
  import("./pages/UserProfile/UserProfilePage")
);
const GiftIsLogin = HocIsLogin(Gift);
const FeedbackIsLogin = HocIsLogin(Feedback);
const NotificationsIsLogin = HocIsLogin(Notifications);
const UserProfilepageIsLogin = HocIsLogin(UserProfilepage);
// const HadafHafezPageIsLogin = HocIsLogin(HadafHafez);
const tradesCreditPageIsLogin = HocIsLogin(tradesCredit);
const PayOut = HocIsLogin(PayOuts);

const StockIsCustomer = HocIsCustomer(Stock);
const IpoCustomer = HocIsCustomer(Ipo);

export default function BasePage() {
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname === "/") {
      history.push("/home");
    }
  }, [history.location.pathname]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Route path="/auth">
          {/* <AuthPage /> */}
          <AuthPageNew />
        </Route>
        <Route path="/AuthCustomer">
          <AuthCustomer />
        </Route>
        <Layout>
          {
            // /* Redirect from root URL to /dashboard. */
            // <Redirect from="/" to="/ipo" />
          }
          {/*<Redirect exact from="/education" to="/education/education" />*/}

          {/* Redirect from root URL to /dashboard. */}
          {/* // <Redirect exact from="/" to="/home" /> */}
          {/* // <Redirect exact from="/" to="/user-profile/profile-overview" /> */}

          <ContentRoute path="/stock" component={StockIsCustomer} />
          <ContentRoute path="/gift" component={Gift} />
          {/* <ContentRoute path="/gift/request" component={GiftIsLogin} /> */}
          <ContentRoute path="/ipo" component={IpoCustomer} />
          <ContentRoute
            path="/symbolnformation"
            component={SymbolInformation}
          />
          <Route path="/notifications" component={NotificationsIsLogin} />
          {/* <Route exact path="/notifications/detailes" component={NotificationSelectDetails} /> */}
          <ContentRoute path="/help" component={SignUpHelp} />
          <ContentRoute path="/Turnover" component={Tornover} />
          <ContentRoute path="/myGift" component={GiftIsLogin} />
          <ContentRoute path="/bonus" component={GiftIsLogin} />
          <ContentRoute path="/feedback" component={FeedbackIsLogin} />
          <Route path="/posts" component={Posts} />
          <Route path="/treemap" component={Treemap} />
          <Route path="/MarketView" component={MarketView} />
          <Route path="/competitions" component={Competitions} />
          <Route path="/forum" component={Posts} />
          <Route path="/softWare" component={Education} />
          <ContentRoute path="/about" component={About} />
          <Route path="/courses" component={Courses} />
          <ContentRoute path="/creadit" component={Creadit} />
          <ContentRoute path="/accounts" component={Accounts} />
          {/* <ContentRoute path="/jobOpportunities" component={JobOpportunities} /> */}
          {/* <Route path="/hafez" component={HadafHafezPageIsLogin} /> */}
          <ContentRoute path="/branchPage" component={Branch} />
          <ContentRoute path="/goverments" component={Goverments} />
          <ContentRoute exact path="/home" component={Home} />
          <ContentRoute path="/builder" component={BuilderPage} />
          <ContentRoute path="/my-page" component={MyPage} />
          <Route path="/user-profile" component={UserProfilepageIsLogin} />
          <ContentRoute path="/faq" component={Faq} />
          <ContentRoute path="/brochuresCourses" component={brochuresCourses} />
          <ContentRoute
            path="/tradesCredit"
            component={tradesCreditPageIsLogin}
          />
          <ContentRoute path="/RaisingCapital" component={RaisingCapital} />
          <ContentRoute path="/Dps" component={Dps} />
          <ContentRoute path="/payOut" component={PayOut} />
          <ContentRoute path="/telegramLinks" component={TelegramLinks} />
          <ContentRoute exact path="/bourseKala" component={Bourse} />
          <ContentRoute exact path="/statusBourse" component={statusBourse} />
          <ContentRoute exact path="/MerchantileNew" component={MerchantileNew} />

          {/* <Redirect to="error/error-v1" /> */}
        </Layout>
      </Switch>
    </Suspense>
  );
}
