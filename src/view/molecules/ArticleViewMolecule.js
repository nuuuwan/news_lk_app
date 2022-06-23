import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import I18N, { t, LANG_IDX, BASE_LANG } from "../../nonview/base/I18N";

import Condition from "../../view/atoms/Condition";
import DotSeparator from "../../view/molecules/DotSeparator";
import LimitWords from "../../view/molecules/LimitWords";

export default function ArticleViewMolecule({
  articleSummary,
  translatedArticle,
}) {
  const theme = useTheme();
  const colorTitle = theme.palette.primary.main;
  const colorDate = theme.palette.secondary.main;
  const colorNewspaper = theme.palette.success.main;

  const isArticleNotNull = translatedArticle !== null;

  let title = articleSummary.title;
  let bodyLines = [];
  let originalLang = BASE_LANG;

  if (translatedArticle) {
    originalLang = translatedArticle.originalLang;
    const sourceLang = I18N.getLang();
    if (originalLang === sourceLang) {
      title = translatedArticle.title;
      bodyLines = translatedArticle.bodyLines;
    } else {
      const translation = translatedArticle.translate[sourceLang];
      if (translation) {
        title = translation.title;
        bodyLines = translation.bodyLines;
      }

    }
  }

  let langLabel = "";
  if (originalLang) {
    langLabel = " (" + t(LANG_IDX[originalLang].labelEn) + ")";
  }

  return (
    <Box>
      <Link
        href={articleSummary.url}
        target="_blank"
        sx={{ textDecoration: "none" }}
      >
        <Typography variant="caption" sx={{ color: colorNewspaper }}>
          {articleSummary.urlShort}
        </Typography>
        <Typography variant="caption" sx={{ color: colorNewspaper }}>
          {langLabel}
        </Typography>
      </Link>

      <Typography variant="h6" sx={{ color: colorTitle }}>
        {title}
      </Typography>

      <Condition condition={isArticleNotNull}>
        <DotSeparator sx={{ color: colorDate }}>
          <Typography variant="caption">
            {translatedArticle?.readingTimeMinutes + " " + t("minute read")}
          </Typography>
          <Typography variant="caption">
            {articleSummary.timeStrHumanized}
          </Typography>
        </DotSeparator>
        <LimitWords lines={bodyLines} wordLimit={50} />
      </Condition>

      <Condition condition={!isArticleNotNull}>
        <CircularProgress />
      </Condition>
    </Box>
  );
}
