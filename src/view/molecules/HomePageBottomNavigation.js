import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";

import I18N, { LANG_LIST } from "../../nonview/base/I18N";
import URLContext from "../../nonview/base/URLContext";
import { ENT_ALL } from "../../nonview/core/Ent";

const STYLE_PAPER = { position: "fixed", bottom: 0, left: 0, right: 0}

const STYLE= { background: "black" }
const STYLE_ACTION = {color: "white"}

export default function HomePageBottomNavigation({
  timeLatestRefresh,
  onSelectLanguage,
}) {
  const onClickRefresh = function () {
    let context = URLContext.getContext();
    context.ent = ENT_ALL;
    URLContext.setContext(context);
    window.location.reload(true);
  };

  return (
    <Paper
      sx={STYLE_PAPER}
      elevation={3}
    >
      <BottomNavigation showLabels sx={STYLE}>
        {LANG_LIST.map(function (lang) {
          const onClickInner = function () {
            onSelectLanguage(lang.lang);
          };
          const color = lang.lang === I18N.getLang() ? lang.color : "lightgray";

          return (
            <BottomNavigationAction
              key={"button-lang-" + lang.lang}
              label={
                <Typography variant="h6" color={color}>
                  {lang.shortLabel}
                </Typography>
              }
              onClick={onClickInner}
              sx={STYLE_ACTION}
            />
          );
        })}
        <BottomNavigationAction
          icon={<RefreshIcon />}
          onClick={onClickRefresh}
          sx={STYLE_ACTION}
        />
      </BottomNavigation>
    </Paper>
  );
}
