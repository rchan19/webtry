import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

type Props = {
  user_id: number;
  playlist_id: number;
  location: string;
  timestamp: string;
  icon?: React.ReactNode;
};

const formatLocation = (loc: string) => {
  return loc
    .split(",")
    .map((coord) => coord.trim().substring(0, 6))
    .join(", ");
};

const UserPlayListCardHeader = ({
  user_id,
  playlist_id,
  location,
  timestamp,
  icon,
}: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h3" mb="-0.1rem" color={palette.primary[100]}>
            User: {user_id}
          </Typography>
          <Typography variant="h4" color={palette.primary[300]}>
            Playlist Id: {playlist_id}
          </Typography>
          <Typography variant="h4" color={palette.primary[300]}>
            Location: {formatLocation(location)}
          </Typography>
          <Typography variant="h4" color={palette.primary[300]}>
            Timestamp: {timestamp}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default UserPlayListCardHeader;
