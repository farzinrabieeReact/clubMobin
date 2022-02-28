/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink, Link } from "react-router-dom";
// import SVG from "react-inlinesvg";
import {
  // toAbsoluteUrl
  checkIsActive
} from "../../../../_helpers";
import {
  typeOrder,
  typePortfolio,
  typeChangeBroker,
  typePayment
} from "./../../../../../app/pages/market/stock/type";
import { useSelector } from "react-redux";

export function HeaderMenu({ layoutProps }) {
  const loginReducer = useSelector(state => state.auth);
  const [state, setState] = useState();
  const [data, setStateMenu] = useState([]);

  useEffect(() => {
    setStateMenu(dataMenu);
  }, []);

  useEffect(() => {
    if (loginReducer.user && loginReducer?.user?.member_kala_bourse_code !== "null") {
     
      setStateMenu(prevState => {
        return [
          ...prevState,
          {
            label: "بورس کالا",
            route: "bourseKala",
            disable: false,
            children: [
              {
                label: "اطلاعیه عرضه-درخواست خرید",
                route: "bourseKala",
                active: "bourseKala"
              },
              {
                label: "وضعیت خرید درخواست ها",
                route: "statusBourse",
                active: "statusBourse"
              },
              {
                label: "ریز معاملات",
                route: "MerchantileNew",
                active: "MerchantileNew"
              }
              // { label: "اطلاعیه ها - درخواست خرید", route: "stock", active: "oragh" },
              // { label: "گزارش معاملات", route: "ipo", active: "oragh" }
            ]
          }
        ];
      });
    }
  }, [loginReducer]);
  const handleMenuClick = (e, id) => {
    e.stopPropagation();
    setState(id.active);
  };
  //
  const handleNavClick = child => {
    if (!child) {
      setState("");
    }
  };

  const location = useLocation();
  const getMenuItemActive = url => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/*begin::Header Nav*/}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        {data.map((item, ind) => (
          <li
            key={ind}
            data-menu-toggle={"hover"}
            aria-haspopup="true"
            // className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
            //     `/${item.route}`
            // )}`}
            className={
              state === item.route || getMenuItemActive(item.route)
                ? "menu-item menu-item-submenu menu-item-rel menu-item-active"
                : "menu-item menu-item-submenu menu-item-rel"
            }
            onClick={() => handleNavClick(item.children)}
          >
            <NavLink
              className={`menu-link paddingResponsive ${
                item.children ? "menu-toggle" : ""
              } ${item.disable ? "disabledItems" : ""} `}
              to={`/${item.route}`}
            >
              <span
                className={`colorBlack text-nowrap ${
                  item.disable ? "disabledItems" : ""
                }`}
              >
                {item.label}
              </span>
              {item.children && <i className="menu-arrow"></i>}
            </NavLink>
            {item.children && (
              <>
                <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                  <ul className="menu-subnav">
                    {item.children.map((child, index) => {
                      return (
                        <li
                          className={`menu-item menu-item-submenu 
                          ${child.disable ? "disabledItems" : ""} 
                          ${getMenuItemActive(`/${child.active}`)}
                          `}
                          data-menu-toggle="hover"
                          aria-haspopup="true"
                          key={index}
                          onClick={e => handleMenuClick(e, child)}
                        >
                          {!child.children ? (
                            child.external ? (
                              <a
                                className="menu-link"
                                href={`${child.route}`}
                                target="_blank"
                                rel="noopener"
                              >
                                <span
                                  className={`menu-text ${
                                    child.disable ? "disabledItems" : ""
                                  }`}
                                >
                                  {child.label}
                                </span>
                              </a>
                            ) : (
                              <Link
                                className="menu-link"
                                to={{
                                  pathname: `/${child.route}`,
                                  state: child.state
                                    ? { tabPanel: child.state }
                                    : ""
                                }}
                              >
                                <span
                                  className={`menu-text ${
                                    child.disable ? "disabledItems" : ""
                                  }`}
                                >
                                  {child.label}
                                </span>
                              </Link>
                            )
                          ) : (
                            <>
                              <span
                                className="menu-link"
                                // to={{
                                //   pathname: `/${child.route}`,
                                //   state: child.state ? { tabPanel: child.state } : ""}}
                              >
                                <span
                                  className={`menu-text ${
                                    child.disable ? "disabledItems" : ""
                                  }`}
                                >
                                  {child.label}
                                </span>
                                <i className="menu-arrow" />
                              </span>
                              <div className="menu-submenu menu-submenu-classic menu-submenu-right">
                                <ul className="menu-subnav">
                                  {child.children.map((childLevel2, index) => {
                                    return (
                                      <li
                                        className={`menu-item menu-item-submenu 
                                            ${
                                              childLevel2.disable
                                                ? "disabledItems"
                                                : ""
                                            } 
                                             ${getMenuItemActive(
                                               `/${childLevel2.active}`
                                             )}`}
                                        data-menu-toggle="hover"
                                        aria-haspopup="true"
                                        key={index}
                                        onClick={e =>
                                          handleMenuClick(e, childLevel2)
                                        }
                                      >
                                        {childLevel2.external ? (
                                          <a
                                            className="menu-link"
                                            href={`${childLevel2.route}`}
                                            target="_blank"
                                            rel="noopener"
                                          >
                                            <span
                                              className={`menu-text ${
                                                childLevel2.disable
                                                  ? "disabledItems"
                                                  : ""
                                              }`}
                                            >
                                              {childLevel2.label}
                                            </span>
                                          </a>
                                        ) : (
                                          <Link
                                            className="menu-link"
                                            to={{
                                              pathname: `/${childLevel2.route}`,
                                              state: childLevel2.state
                                                ? {
                                                    tabPanel: childLevel2.state
                                                  }
                                                : ""
                                            }}
                                          >
                                            <span
                                              className={`menu-text ${
                                                childLevel2.disable
                                                  ? "disabledItems"
                                                  : ""
                                              }`}
                                            >
                                              {childLevel2.label}
                                            </span>
                                          </Link>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </li>
        ))}
        {/*end::1 Level*/}
      </ul>
      {/*end::Header Nav*/}
    </div>
  );
}

const dataMenu = [
  // {
  //   label: "خانه",
  //   route: "home"
  // },
  {
    label: "سامانه‌های مبین سرمایه",
    route: "system",
    children: [
      {
        label: "سامانه آنلاین اسمارت",
        route: "https://smart.mobinsb.ir",
        active: "system",
        external: true
      },

      {
        label: "سامانه آنلاین پلاس",
        route: "https://online.mobinsb.ir",
        active: "system",
        external: true
      },
      {
        label: "صندوق سرمایه‌گذاری",
        route: "https://fund.mobinsb.ir",
        active: "system",
        external: true
      },
      {
        label: "سامانه آفلاین",
        route: "https://c.mobinsb.ir",
        active: "system",
        external: true
      },
      {
        label: "سامانه سهام عدالت",
        route: "https://sahamedalat.mobinsb.ir",
        active: "system",
        external: true
      },
      {
        label: "سامانه معاملات آتی",
        route: "https://coinonline.mobinsb.ir",
        active: "system",
        external: true
      },
      {
        label: "وب‌سایت کارگزاری مبین سرمایه",
        route: "https://mobinsb.ir",
        active: "system",
        external: true
      }
    ]
  },
  {
    label: "اوراق بهادار",
    route: "oragh",
    active: "oragh",
    children: [
      {
        label: "تغییر کارگزار ناظر",
        route: "stock/1",
        active: "stock/1",
        state: typeChangeBroker
      },
      { label: "عرضه اولیه", route: "ipo", active: "ipo" },
      {
        label: "اعتبار معاملاتی",
        route: "ipo",
        active: "ipo/2",
        disable: true
      },
      {
        label: "ثبت سفارش",
        route: "stock/2",
        active: "stock/2",
        state: typeOrder
      },
      {
        label: "پرتفوی لحظه‌ای",
        route: "stock/5",
        active: "stock/5",
        state: typePortfolio
      },
      {
        label: "سود نقدی سهام",
        route: "PayOut",
        active: "PayOut",
        disable: false
      },
      {
        label: "صورت معاملات",
        route: "Turnover",
        active: "Turnover",
        disable: false
      },
      {
        label: "درخواست وجه",
        route: "stock/8",
        active: "stock/8",
        state: typePayment
      }
    ]
  },


  {
    label: "نمای بازار",
    route: "treemap",
    children: [
      { label: "نمای بازار", route: "MarketView", active: "MarketView", },
      { label: "نقشه بازار", route: "treemap", active: "treemap" }
    ]
  },
  {
    label: "تحلیل و محتوا",
    route: "oragh",
    children: [
      { label: "تالار گفتگو", route: "posts", active: "posts" },
      // { label: "اشتراک ویژه تحلیل", route: "hafez", active: "hafez" }
    ]
  },
  {
    label: "آموزش",
    route: "education",
    children: [
      { label: "دوره‌های آموزشی", route: "courses", active: "courses" },
      {
        label: "بروشورهای آموزشی",
        route: "brochuresCourses",
        active: "brochuresCourses",
        disable: false
      },
      {
        label: "ویدئوهای آموزشی",
        route: "https://www.aparat.com/Mobinsb",
        active: "system",
        external: true
      },
      {
        label: "اطلاعات بورسی",
        route: "ipo",
        active: "oragh",
        children: [
          {
            label: "افزایش سرمایه",
            route: "RaisingCapital",
            active: "RaisingCapital",
            disable: false
          },
          {
            label: "مجمع شرکت‌ها",
            route: "Dps",
            active: "Dps",
            disable: false
          }
        ]
      }
    ]
  },
  {
    label: "مسابقات",
    route: "competitions"
  },
  {
    label: "جوایز",
    route: "gift",
    active: "gift",
    // children: [
      // { label: "جوایز قابل انتخاب من", route: "myGift", active: "myGift" }
    // ]
  },
  {
    label: "ارتباط با ما",
    route: "contactUs",
    children: [
      { label: "سوالات متداول", route: "faq", active: "faq" },
      {
        label: "اطلاعات شعب",
        route: "branchPage",
        active: "branchPage"
      },
      {
        label: "دفاتر پیشخوان",
        route: "goverments",
        active: "goverments"
      },
      { label: "شماره حساب‌ها", route: "accounts", active: "accounts" },
      {
        label: "صدای مشتری",
        route: "feedback",
        active: "feedback"
      },
      // {
      //   label: "فرصت‌های شغلی",
      //   route: "jobOpportunities",
      //   active: "jobOpportunities"
      // },
      {
        label: "رسانه‌های اجتماعی",
        route: "telegramLinks",
        active: "telegramLinks",
        disable: false
      },
      { label: "معرفی باشگاه", route: "about", active: "about" }
    ]
  }
];
