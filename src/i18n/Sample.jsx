import React, { useState } from 'react';

import LanguageSelector from "./components/ui/LanguageSelector";
import {Trans, useTranslation} from "react-i18next";

const Sample= () => {

  const {t} = useTranslation();
  const {line1, line2} = t("description", {channel: "RoadsideCoder"});

  return (
    <>
     <div className="container">
      <LanguageSelector />
      <h1>{t("greeting")}</h1>
      <span>
        <Trans
          // i18nKey={"description.line1"}
          i18nKey={line1}
          values={{
            channel: "RoadsideCoder",
          }}
          components={{1: <b />}}
        ></Trans>
      </span>
      <span>{line2}</span>
      {/* <span>{t("greeting.key", "can't load")}</span> */}
    </div>

      {/* <DefaultLayout>
        <p>hello word</p>
      </DefaultLayout> */}
    </>
  );
};

export default Sample;


