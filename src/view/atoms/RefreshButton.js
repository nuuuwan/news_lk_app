import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function RefreshButton() {
  return (
    <IconButton
      onClick={function () {
        localStorage.clear();
        window.location.reload();
      }}
      style={{ position: "fixed", top: "2%", right: "5%" }}
    >
      <RefreshIcon />
    </IconButton>
  );
}
