import React, { useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { t } from "../../nonview/base/I18N";

import AlignRight from "../../view/atoms/AlignRight";

export default function ProgressiveList({
  list,
  nItemIncrement,
  renderListItem,
}) {
  const [nDisplay, setNDisplay] = useState(nItemIncrement);

  const onClickShowMore = function () {
    setNDisplay(nDisplay + nItemIncrement);
  };

  return (
    <Box>
      {list.slice(0, nDisplay).map(function (listItem, iListItem) {
        return renderListItem(listItem, iListItem);
      })}
      <AlignRight>
        <IconButton onClick={onClickShowMore} sx={{ color: "lightgray" }}>
          <ExpandMoreIcon />
          <Typography variant="caption">{t("Read more articles")}</Typography>
        </IconButton>
      </AlignRight>
    </Box>
  );
}
