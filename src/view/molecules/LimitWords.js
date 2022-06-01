import { useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

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
      <Condition condition={show}>
        <MultiLines lines={optionalLines} />
      </Condition>
      <Condition condition={!show}>
        <IconButton onClick={onClickShowMore}>
          <UnfoldMoreIcon />
        </IconButton>
      </Condition>
      <Condition condition={show}>
        <IconButton onClick={onClickShowLess}>
          <UnfoldLessIcon />
        </IconButton>
      </Condition>
    </Box>
  );
}
