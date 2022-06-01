import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import Condition from "../../view/atoms/Condition";
import DotSeparator from "../../view/molecules/DotSeparator";
import LimitWords from "../../view/molecules/LimitWords";

export default function ArticleViewMolecule({ articleSummary, article }) {
  const theme = useTheme();
  const colorTitle = theme.palette.primary.main;
  const colorDate = theme.palette.secondary.main;
  const colorNewspaper = theme.palette.success.main;

  const isArticleNotNull = article !== null;

  return (
    <Box>
      <Link
        href={articleSummary.url}
        target="_blank"
        sx={{ textDecoration: "none" }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: colorNewspaper }}
        >
          {articleSummary.urlShort}
        </Typography>
      </Link>

      <Typography variant="h6" sx={{ color: colorTitle }}>
        {articleSummary.title}
      </Typography>

      <Condition condition={isArticleNotNull}>
        <DotSeparator sx={{ color: colorDate }}>
          <Typography variant="caption">
            {article?.readingTimeMinutes + " minute read"}
          </Typography>
          <Typography variant="caption">
            {articleSummary.timeStrHumanized}
          </Typography>
        </DotSeparator>
        <LimitWords lines={article?.bodyLines} wordLimit={50} />
      </Condition>

      <Condition condition={!isArticleNotNull}>
        <CircularProgress />
      </Condition>
    </Box>
  );
}
