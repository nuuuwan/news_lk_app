import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import HighlightEnts from "../../view/atoms/HighlightEnts";

export default function MultiLines({ lines, entsList, color }) {
  return (
    <Box>
      {lines.map(function (line, iLine) {
        const ents = entsList ? entsList[iLine] : null;
        return (
          <Typography
            key={"body-line-mandatory" + iLine}
            variant="body1"
            sx={{
              marginBottom: 2,
              marginTop: 1,
              color: color,
              textAlign: "justify",
              textJustify: "inter-character",
            }}
          >
            <HighlightEnts text={line} ents={ents} />
          </Typography>
        );
      })}
    </Box>
  );
}
