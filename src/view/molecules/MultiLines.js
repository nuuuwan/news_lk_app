import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MultiLines({ lines }) {
  return (
    <Box>
      {lines.map(function (line, iLine) {
        return (
          <Typography
            key={"body-line-mandatory" + iLine}
            variant="body1"
            sx={{ marginBottom: 2, marginTop: 1, color: "gray" }}
          >
            {line}
          </Typography>
        );
      })}
    </Box>
  );
}
