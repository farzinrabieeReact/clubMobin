/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Card from "./Card";
import {
  typePayment,
  typeChangeBroker,
  typePortfolio
} from "./../../../pages/market/stock/type";
import {
  CastForEducation,
  CompareArrows,
  CreditCard,
  ShoppingCart
} from "@material-ui/icons";

export function HomeOragh() {
  return (
    <div className="row mt-30 mt-md-20 mt-lg-10">
      <div className="col-lg-3 ">
        <Card
          icon={
            <CompareArrows
              style={{ fontSize: 60, marginLeft: 10 }}
              className="text-light"
            />
          }
          backColor="rgba(100,165,25,0.5)"
          title="تغییر کارگزار ناظر"
          link={typeChangeBroker}
          text="انتقال سهام بدون نیاز به فروش"
        />
      </div>
      <div className="col-lg-3">
        <Card
          icon={
            <CreditCard
              style={{ fontSize: 60, marginLeft: 10 }}
              className="text-light"
            />
          }
          backColor="#feb236"
          title="برداشت وجه"
          link={typePayment}
          text="برداشت وجه از حساب معملاتی"
        />
      </div>
      <div className="col-lg-3">
        <Card
          icon={
            <CastForEducation
              style={{ fontSize: 60, marginLeft: 10 }}
              className="text-light"
            />
          }
          backColor="rgba(6,204,241,0.5)"
          title="دوره های آموزشی"
          link={"courses"}
          text="تقویم دوره های آموزشی"
        />
      </div>
      <div className="col-lg-3">
        <Card
          icon={
            <ShoppingCart
              style={{ fontSize: 55, marginLeft: 10 }}
              className="text-light"
            />
          }
          backColor="rgba(246,78,96,50%)"
          title="لیست دارایی"
          link={typePortfolio}
          text="مشاهده سهام پرتفوی"
        />
      </div>
    </div>
  );
}
