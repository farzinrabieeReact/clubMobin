import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import objectPath from "object-path";
import { toAbsoluteUrl } from "../../../_helpers";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { Topbar } from "./Topbar";
import { HeaderMenuWrapper } from "./header-menu/HeaderMenuWrapper";
import { SearchDropdown } from "../extras/dropdowns/search/SearchDropdown";
import { shallowEqual, useSelector } from "react-redux";

export function Header() {
  const uiService = useHtmlClassService();
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual
  );

  const layoutProps = useMemo(() => {
    return {
      headerClasses: uiService.getClasses("header", true),
      headerAttributes: uiService.getAttributes("header"),
      headerContainerClasses: uiService.getClasses("header_container", true),
      menuHeaderDisplay: objectPath.get(
        uiService.config,
        "header.menu.self.display"
      ),
    };
  }, [uiService]);

  return (
    <>
      {/*begin::Header*/}
      <div
        className={`header ${layoutProps.headerClasses} container-fluid bg-white`}
        id="kt_header"
        {...layoutProps.headerAttributes}
        style={{ boxShadow: " 0px 3px 6px 0px rgba(0,0,0,0.16)" }}
      >
        {/*begin::Container*/}
        <div
          className={`d-flex align-items-stretch  justify-content-center justify-content-md-between boxLayout`}
        >
          {/* begin::Left */}
          <div className="d-flex align-items-stretch mr-3 ">
            {/* begin::Header Logo */}
            <div className="header-logo">
              <Link to="/home">
                <img
                  className="logo-default max-h-40px"
                  alt="Logo"
                  src={toAbsoluteUrl("/media/logos/logo-letter-1.png")}
                />
                <img
                  className="logo-sticky max-h-40px"
                  alt="Logo"
                  src={toAbsoluteUrl("/media/logos/logo-letter-1.png")}
                />
              </Link>
            </div>
            {/* end::Header Logo */}
            {layoutProps.menuHeaderDisplay && <HeaderMenuWrapper />}
          </div>
          {/* end::Left */}

          {/*begin::Topbar*/}
          <div className="d-none d-lg-flex align-items-center">
          {!user && <SearchDropdown />}
           <Topbar />
          </div>
          {/*end::Topbar*/}
        </div>
        {/*end::Container*/}
      </div>
      {/*end::Header*/}
    </>
  );
}
