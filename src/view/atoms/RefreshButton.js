import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";

import TimeXFuture from "../../nonview/base/TimeXFuture";

export default function RefreshButton({ onClick, timeLatestRefresh }) {
  const timeLatestRefreshStr =
    "Last refreshed " + TimeXFuture.localeString(timeLatestRefresh);
  return (
    <Grid container direcion="row" justifyContent="flex-end">
      <IconButton onClick={onClick}>
        <Typography variant="caption" sx={{ color: "#ccc", marginLeft: 1 }}>
          {timeLatestRefreshStr}
        </Typography>
        <RefreshIcon />
      </IconButton>
    </Grid>
  );
}
