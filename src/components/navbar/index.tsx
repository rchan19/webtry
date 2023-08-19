import { useSelector } from "react-redux";
import PixIcon from "@mui/icons-material/Pix";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../FlexBetween";
import NavbarRight from "./navbarRight";
import { RootState } from "@/RootState";

const Navbar = () => {
  // refactored right side of navbar into separate component
  const { palette } = useTheme();
  const isAuth = Boolean(useSelector((state: RootState) => state.auth.token));

  return (
    // call exported setting FlexBetween, set colour to grey via palette.grey[300]
    <FlexBetween
      mb="0.25rem"
      p="0.5rem 0rem 1rem 0rem"
      color={palette.grey[300]}
    >
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        {/* ICON HERE, fontSize = set icon size */}
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="18px" color={palette.primary[500]}>
          Spotify Playlistener
        </Typography>
      </FlexBetween>
      {/* RIGHT SIDE */}
      {isAuth && <NavbarRight />}
    </FlexBetween>
  );
};

export default Navbar;
