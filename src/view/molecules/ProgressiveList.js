import Box from "@mui/material/Box";

export default function ProgressiveList({
  list,
  nItemIncrement,
  renderListItem,
}) {
  return (
    <Box>
      {list.slice(0, nItemIncrement).map(function (listItem, iListItem) {
        return renderListItem(listItem, iListItem);
      })}
    </Box>
  );
}
