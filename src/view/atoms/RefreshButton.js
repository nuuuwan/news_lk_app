import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function RefreshButton({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      style={{ position: "fixed", top: "2%", right: "5%" }}
    >
      <RefreshIcon />
    </IconButton>
  );
}
