import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import objectPath from "object-path";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import PersonIcon from "@material-ui/icons/Person";
import { SearchDropdown } from "../extras/dropdowns/search/SearchDropdown";
import { Topbar } from "../header/Topbar";
import { shallowEqual, useSelector } from "react-redux";

export function HeaderMobile() {
  const uiService = useHtmlClassService();
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual
  );

  const layoutProps = useMemo(() => {
    return {
      headerLogo: uiService.getStickyLogo(),
      asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
      headerMenuSelfDisplay:
        objectPath.get(uiService.config, "header.menu.self.display") === true,
      headerMobileCssClasses: uiService.getClasses("header_mobile", true),
      headerMobileAttributes: uiService.getAttributes("header_mobile"),
    };
  }, [uiService]);

  return (
    <>
      {/*begin::Header Mobile*/}
      <div
        id="kt_header_mobile"
        className={`header-mobile ${layoutProps.headerMobileCssClasses}`}
        {...layoutProps.headerMobileAttributes}
      >
        <div className="d-flex align-items-center">
          {layoutProps.asideDisplay && (
            <button
              className="btn p-0 burger-icon burger-icon-left"
              id="kt_aside_mobile_toggle"
            >
              <span />
            </button>
          )}

          {layoutProps.headerMenuSelfDisplay && (
            <button
              className="btn p-0 burger-icon burger-icon-right ml-4"
              id="kt_header_mobile_toggle"
              style={{color:'gray'}}
            >
              <span className="burger-icon-costom" />
            </button>
          )}

          <Link to="/" className="ml-2">
            <img
              alt="Logo"
              className="logo-default max-h-30px"
              src={toAbsoluteUrl("/media/logos/logo-letter-9.png")}
            />
          </Link>
        </div>
        {/* begin::Logo */}
        {/* end::Logo */}

        {/* begin::Toolbar */}
        {/* {layoutProps.asideDisplay && (

        )} */}
        <div
          className="d-flex align-items-center"
          style={{ width: "max-content" }}
        >
          {!user && <SearchDropdown />}
          <Topbar />
          

          {/* {!user && (
            <button
              className="btn btn-icon p-0 ml-3"
              id="kt_header_mobile_topbar_toggle"
              style={{ whiteSpace: "nowrap" }}
            >
              <div>ورود/ ثبت نام</div>
       
            </button>
          )} */}
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header Mobile */} {/*end::Header Mobile*/}
    </>
  );
}
