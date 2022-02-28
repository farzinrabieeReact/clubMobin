import React from "react";
import TelegramLinks from "../../../modules/Static/telegramLinks/telegramLink_Select/TelegramLink";
import { useSubheader } from "../../../../_metronic/layout";

const Index = () => {
  const suhbeader = useSubheader();

  suhbeader.setTitle("لینک های رسانه‌های اجتماعی");
  return (
    <>
      <div className="bg-white rounded-lg p-10">
        <TelegramLinks />
      </div>
    </>
  );
};

export default Index;
