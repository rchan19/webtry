import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./form";

const LoginPage = () => {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // horizontally center
        alignItems: "center", // vertically center
        height: "100%", // take full viewport height
        width: "100%", // take full viewport width
      }}
    >
      <Box
        sx={{
          width: isNonMobileScreens ? "40%" : "93%",
          p: "2rem",
          m: "2rem auto",
          borderRadius: "1.5rem",
          backgroundColor: "#2d2d34",
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          sx={{ mb: "0.75rem" }}
        >
          Welcome Admin
        </Typography>
        <Typography
          fontWeight="500"
          variant="h4"
          sx={{ mb: "1.5rem", color: palette.primary[100] }}
        >
          Spotisan: Generating Data-Driven Playlists Since 2023.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
