import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import I18N, { t, LANG_IDX } from "../../nonview/base/I18N";

import Condition from "../../view/atoms/Condition";
import DotSeparator from "../../view/molecules/DotSeparator";
import LimitWords from "../../view/molecules/LimitWords";

export default function ArticleViewMolecule({
  articleSummary,
  article,
  translatedArticle,
}) {
  const currentLang = I18N.getLang();

  let title = articleSummary.title;
  let bodyLines = [];
  let originalLang = article.originalLang;

  if (
    translatedArticle &&
    originalLang !== currentLang &&
    translatedArticle.translate[currentLang]
  ) {
    const translation = translatedArticle.translate[currentLang];
    title = translation.title;
    bodyLines = translation.bodyLines;
  } else if (article) {
    title = article.title;
    bodyLines = article.bodyLines;
  } else {
    title = articleSummary.title;
    bodyLines = [];
  }

  const isInOriginalLang = originalLang === currentLang;
  const originalLangObj = LANG_IDX[originalLang];
  return (
    <Box>
      <Link
        href={articleSummary.url}
        target="_blank"
        sx={{ textDecoration: "none" }}
      >
        <Typography variant="h5" color={originalLangObj.color}>
          {title}
        </Typography>

        <DotSeparator sx={{ color: "secondary" }}>
          <Typography variant="caption" color="secondary">
            {articleSummary.urlShort}
          </Typography>

          <Typography variant="caption" color="secondary">
            {articleSummary.timeStrHumanized}
          </Typography>
        </DotSeparator>

        <Condition condition={!isInOriginalLang}>
          <Typography
            variant="caption"
            color={originalLangObj.color}
            sx={{ opacity: 0.33 }}
          >
            {t("Originally published in the 000 Language", t(originalLangObj.labelEn))}
          </Typography>
        </Condition>
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
