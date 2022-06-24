import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import I18N, { t, LANG_IDX } from "../../nonview/base/I18N";

import Condition from "../../view/atoms/Condition";
import DotSeparator from "../../view/molecules/DotSeparator";
import LimitWords from "../../view/molecules/LimitWords";

export default function ArticleViewMolecule({ article }) {
  console.debug(article);
  const currentLang = I18N.getLang();
  let originalLang = article.originalLang;

  const text = article.textIDX[currentLang];
  const title = text.title;
  const bodyLines = text.bodyLines;
  const isInOriginalLang = originalLang === currentLang;

  const originalLangObj = LANG_IDX[originalLang];
  return (
    <Box>
      <Link
        href={article.url}
        target="_blank"
        sx={{ textDecoration: "none" }}
      >
        <Typography variant="h5" color={originalLangObj.color}>
          {title}
        </Typography>

        <DotSeparator sx={{ color: "secondary" }}>
          <Typography variant="caption" color="secondary">
            {article.urlShort}
          </Typography>

          <Typography variant="caption" color="secondary">
            {article.timeStrHumanized}
          </Typography>
        </DotSeparator>

        <Condition condition={!isInOriginalLang}>
          <Typography
            variant="subtitle1"
            color={originalLangObj.color}
            sx={{ opacity: 0.5 }}
          >
            {t("Translated from the 000 Language", t(originalLangObj.labelEn))}
          </Typography>
        </Condition>
      </Link>

      <LimitWords lines={bodyLines} wordLimit={50} />

      <Condition condition={!article}>
        <Alert severity="warning">
          {t("This article is yet to be translated. Try again later.")}
        </Alert>
      </Condition>
    </Box>
  );
}
