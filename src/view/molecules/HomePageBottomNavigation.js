import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function HomePageBottomNavigation({ onClickRefresh }) {
  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Refresh"
          icon={<RefreshIcon />}
          onClick={onClickRefresh}
        />
      </BottomNavigation>
    </Box>
  );
}
