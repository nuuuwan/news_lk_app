import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import I18N, { t, LANG_IDX, BASE_LANG } from "../../nonview/base/I18N";

import Condition from "../../view/atoms/Condition";
import DotSeparator from "../../view/molecules/DotSeparator";
import LimitWords from "../../view/molecules/LimitWords";

export default function ArticleViewMolecule({
  articleSummary,
  article,
  translatedArticle,
}) {
  const sourceLang = I18N.getLang();

  let title = articleSummary.title;
  let bodyLines = [];
  let originalLang = BASE_LANG;
  if (translatedArticle?.originalLang) {
    originalLang = translatedArticle?.originalLang;
  }

  if (
    translatedArticle &&
    originalLang !== sourceLang &&
    translatedArticle.translate[sourceLang]
  ) {
    const translation = translatedArticle.translate[sourceLang];
    title = translation.title;
    bodyLines = translation.bodyLines;
  } else if (article) {
    title = article.title;
    bodyLines = article.bodyLines;
  } else {
    title = articleSummary.title;
    bodyLines = [];
  }

  return (
    <Box>
      <Link
        href={articleSummary.url}
        target="_blank"
        sx={{ textDecoration: "none" }}
      >
        <DotSeparator sx={{ color: "secondary" }}>
          <Typography variant="caption" color="#080">
            {articleSummary.urlShort}
          </Typography>

          <Typography variant="caption" color="#080">
            {articleSummary.timeStrHumanized}
          </Typography>
          <Typography variant="caption" color="#080">
            {articleSummary.timeStr}
          </Typography>
        </DotSeparator>

        <Typography variant="h6" color="primary">
          {title}
        </Typography>

        <DotSeparator sx={{ color: "secondary" }}>
          <Typography variant="caption" color="secondary">
            {t(
              "Published in the 000 Language",
              t(LANG_IDX[originalLang].labelEn)
            )}
          </Typography>
          <Typography variant="caption" color="secondary">
            {t("Reading time is 000 minutes", article.readingTimeMinutes)}
          </Typography>
        </DotSeparator>
      </Link>

      <LimitWords lines={bodyLines} wordLimit={50} />

      <Condition condition={!translatedArticle}>
        <Alert severity="warning">
          {t("This article is yet to be translated. Try again later.")}
        </Alert>
      </Condition>
    </Box>
  );
}
