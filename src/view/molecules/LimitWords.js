import { useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Condition from "../../view/atoms/Condition";
import MultiLines from "../../view/molecules/MultiLines";

export default function LimitWords({ lines, wordLimit }) {
  let mandatoryLines = [],
    optionalLines = [];
  let wordCount = 0;
  for (let line of lines) {
    const words = line.split(" ");
    if (wordCount < wordLimit) {
      mandatoryLines.push(line);
    } else {
      optionalLines.push(line);
    }
    wordCount += words.length;
  }

  const [show, setShow] = useState(false);

  const onClickShowMore = function () {
    setShow(true);
  };

  const onClickShowLess = function () {
    setShow(false);
  };

  return (
    <Box>
      <MultiLines lines={mandatoryLines} />
      <Condition condition={!show && optionalLines.length > 0}>
        <IconButton onClick={onClickShowMore} sx={{ color: "lightgray" }}>
          <ExpandMoreIcon />
          <Typography variant="caption">Read more</Typography>
        </IconButton>
      </Condition>

      <Condition condition={show && mandatoryLines.length > 0}>
        <MultiLines lines={optionalLines} />
        <IconButton onClick={onClickShowLess} sx={{ color: "lightgray" }}>
          <ExpandLessIcon />
          <Typography variant="caption">Read less</Typography>
        </IconButton>
      </Condition>
    </Box>
  );
}
