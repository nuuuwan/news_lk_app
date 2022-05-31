import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function ArticleViewMolecule({ article }) {
  const theme = useTheme();
  const colorTitle = theme.palette.primary.main;
  const colorDate = theme.palette.secondary.main;
  const colorNewspaper = theme.palette.success.main;

  return (
    <Box sx={{ m: 1, p: 1 }}>
      <Link href={article.url} target="_blank" sx={{ textDecoration: "none" }}>
        <Typography
          variant="caption"
          component="div"
          sx={{ color: colorNewspaper }}
        >
          {article.newspaperID}
        </Typography>
      </Link>
      <Typography variant="caption" component="div" sx={{ color: colorDate }}>
        {article.timeStr}
      </Typography>
      <Typography variant="h5" sx={{ color: colorTitle }}>
        {article.title}
      </Typography>
      {article.bodyLinesLimited.map(function (line, iLine) {
        return (
          <Typography
            key={"body-line-" + iLine}
            variant="body1"
            sx={{ marginBottom: 2, marginTop: 1 }}
          >
            {line}
          </Typography>
        );
      })}
    </Box>
  );
}
