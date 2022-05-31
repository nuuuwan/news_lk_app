import Box from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { VERSION } from "../../nonview/constants/Version";

export default function VersionWidget() {
  return (
    <Box sx={{ m: 2, float: "right" }}>
      <Typography variant="caption" component="div">
        Sri Lanka News by @nuuuwan
      </Typography>
      <Typography variant="caption" component="div">
        Last Update {VERSION}
      </Typography>
    </Box>
  );
}
