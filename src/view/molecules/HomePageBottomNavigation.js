import React from "react";
import Typography from "@mui/material/Typography";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import RefreshIcon from "@mui/icons-material/Refresh";
import { LANG_LIST } from "../../nonview/base/I18N";

export default function HomePageBottomNavigation({
  timeLatestRefresh,
  onClickRefresh,
  onSelectLanguage,
}) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          icon={<RefreshIcon />}
          onClick={onClickRefresh}
        />
        {LANG_LIST.map(function (lang) {
          const onClickInner = function () {
            onSelectLanguage(lang.lang);
          };
          return (
            <BottomNavigationAction
              key={"button-lang-" + lang.lang}
              label={<Typography variant="h6">{lang.shortLabel}</Typography>}
              onClick={onClickInner}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}
