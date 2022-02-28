/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/user-profile", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/user-profile">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
              />
            </span>
            <span className="menu-text">پروفایل</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/faq", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/faq">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
              />
            </span>
            <span className="menu-text">سوالات متداول</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
