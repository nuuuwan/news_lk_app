import Stack from "@mui/material/Stack";

const DEFAULT_SEPARATOR = " · ";

export default function DotSeparator({ children, separator, sx }) {
  separator = separator ? separator : DEFAULT_SEPARATOR;

  let displayChildren = [];
  for (let iChild in children) {
    const child = children[iChild];
    if (iChild > 0) {
      displayChildren.push(<span>{separator}</span>);
    }
    displayChildren.push(child);
  }

  return (
    <Stack direction="row" spacing={0.5} alignItems="center" sx={sx}>
      {displayChildren.map(function (child, iChild) {
        return <span key={"child-" + iChild}>{child}</span>;
      })}
    </Stack>
  );
}
