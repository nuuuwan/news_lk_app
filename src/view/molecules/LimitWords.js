import { useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Condition from "../../view/atoms/Condition";
import MultiLines from "../../view/molecules/MultiLines";

export default function LimitWords({ lines, wordLimit }) {
  let mandatoryLines = [],
    optionalLines = [];
  let wordCount = 0;
  for (let line of lines) {
    const words = line.split(" ");
    wordCount += words.length;
    if (wordCount < wordLimit) {
      mandatoryLines.push(line);
    } else {
      optionalLines.push(line);
    }
  }

  const [show, setShow] = useState(false);

  const onClickShowMore = function () {
    setShow(true);
  };

  return (
    <Box>
      <MultiLines lines={mandatoryLines} />
      <Condition condition={show}>
        <MultiLines lines={optionalLines} />
      </Condition>
      <Condition condition={!show}>
        <IconButton onClick={onClickShowMore}>
          <MoreHorizIcon />
        </IconButton>
      </Condition>
    </Box>
  );
}
