/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useLayoutEffect, useEffect } from "react";
import objectPath from "object-path";
import { useLocation, useHistory } from "react-router-dom";
// import { QuickActions } from "./components/QuickActions";
// import { BreadCrumbs } from "./components/BreadCrumbs";
import {
  getBreadcrumbsAndTitle,
  useSubheader
} from "../../_core/MetronicSubheader";
import { useHtmlClassService } from "../../_core/MetronicLayout";
// import {
//   typeOrder,
//   typePortfolio
// } from "./../../../../app/pages/market/stock/type";

export function SubHeader() {
  const location = useLocation();
  const subheader = useSubheader();
  const { push } = useHistory();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      config: uiService.config,
      subheaderMobileToggle: objectPath.get(
        uiService.config,
        "subheader.mobile-toggle"
      ),
      subheaderCssClasses: uiService.getClasses("subheader", true),
      subheaderContainerCssClasses: uiService.getClasses(
        "subheader_container",
        true
      )
    };
  }, [uiService]);

  useLayoutEffect(() => {
    const aside = getBreadcrumbsAndTitle("kt_aside_menu", location.pathname);
    const header = getBreadcrumbsAndTitle("kt_header_menu", location.pathname);
    const breadcrumbs =
      aside && aside.breadcrumbs.length > 0
        ? aside.breadcrumbs
        : header.breadcrumbs;
    subheader.setBreadcrumbs(breadcrumbs);
    subheader.setTitle(
      aside && aside.title && aside.title.length > 0
        ? aside.title
        : header.title
    );
    // eslint-disable-next-line
  }, [location.pathname]);

  // Do not remove this useEffect, need from update title/breadcrumbs outside (from the page)
  useEffect(() => { }, [subheader]);

  // const handelRoute = page => {
  //   push({
  //     pathname: "/stock",
  //     state: { tabPanel: page }
  //   });
  // };

  return (
    <div
      id="kt_subheader"
      className={`subheader py-2 py-lg-2 container-fluid ${layoutProps.subheaderCssClasses}`}
    >
      <div
        className={`my-2 boxLayout`}
      >
        {/* Info */}
        <div className="d-flex align-items-center flex-wrap mr-1">
          {/* begin::Mobile Toggle */}
          {layoutProps.subheaderMobileToggle && (
            <button
              className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
              id="kt_subheader_mobile_toggle"
            >
              <span />
            </button>
          )}
          {/* end::Mobile Toggle */}

          {/* begin::Heading */}
          <div className="d-flex flex-column">
            {/* begin::Title */}
            <h2 className="font-weight-bold my-2 mr-5" style={{ color: "#2d2d2d", fontWeight: 700 }}>
              {subheader.title}
            </h2>
            {/* end::Title */}

            {/*<BreadCrumbs items={subheader.breadcrumbs} />*/}
          </div>
          {/* end::Heading */}
        </div>

        {/* Toolbar */}
        {/* <div className="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-white font-weight-bold py-3 px-6"
            onClick={() => handelRoute(typeOrder)}
          >
            ثبت سفارش
          </button>

          <button
            type="button"
            className="btn btn-transparent-white font-weight-bold  py-3 px-6 mr-4 ml-4"
            onClick={() => handelRoute(typePortfolio)}
          >
            پرتفوی
          </button>
          {/* <QuickActions />
        </div> */}
      </div>
    </div>
  );
}
