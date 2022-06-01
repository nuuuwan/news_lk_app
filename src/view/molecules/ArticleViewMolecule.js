import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import DotSeparator from "../../view/molecules/DotSeparator";
import LimitWords from "../../view/molecules/LimitWords";

export default function ArticleViewMolecule({ article }) {
  const theme = useTheme();
  const colorTitle = theme.palette.primary.main;
  const colorDate = theme.palette.secondary.main;
  const colorNewspaper = theme.palette.success.main;

  return (
    <Box>
      <Link href={article.url} target="_blank" sx={{ textDecoration: "none" }}>
        <Typography
          variant="caption"
          component="div"
          sx={{ color: colorNewspaper }}
        >
          {article.urlShort}
        </Typography>
      </Link>
      <DotSeparator sx={{ color: colorDate }}>
        <Typography variant="caption">
          {article.readingTimeMinutes + " minute read"}
        </Typography>
        <Typography variant="caption">{article.timeStrHumanized}</Typography>
      </DotSeparator>
      <Typography variant="h6" sx={{ color: colorTitle }}>
        {article.title}
      </Typography>
      <LimitWords lines={article.bodyLines} wordLimit={50} />
    </Box>
  );
}
