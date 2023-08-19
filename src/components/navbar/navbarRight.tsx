import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, useTheme } from "@mui/material";
import FlexBetween from "../FlexBetween";
import { setLogout } from "@/scenes/state/authSlice";

const NavbarRight = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  const handleLogout = () => {
    dispatch(setLogout());
    setSelected("logout");
    navigate("/login");
  };

  return (
    <FlexBetween gap="2rem">
      <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
        <Link
          to="/dashboard"
          onClick={() => setSelected("dashboard")}
          style={{
            color: selected === "dashboard" ? "inherit" : palette.grey[700],
            textDecoration: "inherit",
          }}
        >
          dashboard
        </Link>
      </Box>
      {/* map segment for the navbar */}
      <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
        <Link
          to="/viewmap"
          onClick={() => setSelected("map")}
          style={{
            color: selected === "map" ? "inherit" : palette.grey[700],
            textDecoration: "inherit",
          }}
        >
          map
        </Link>
      </Box>
      {/* playlist data segment for the navbar */}
      <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
        <Link
          to="/viewplaylist"
          onClick={() => setSelected("playlist data")}
          style={{
            color: selected === "playlist data" ? "inherit" : palette.grey[700],
            textDecoration: "inherit",
          }}
        >
          playlist data
        </Link>
      </Box>
      <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
        {/* Using a <div> here instead of a <Link> since the logout process doesn't necessarily need to navigate */}
        <div
          onClick={handleLogout}
          style={{
            cursor: "pointer",
            color: selected === "logout" ? "inherit" : palette.grey[700],
            textDecoration: "inherit",
          }}
        >
          logout
        </div>
      </Box>
    </FlexBetween>
  );
};

export default NavbarRight;
