import { useTheme } from "@mui/material";
import {
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  RadarChart,
} from "recharts";
import UserPlayListCardHeader from "./UserPlaylistCardHeader";
import DashboardBox from "./DashboardBox";

type Props = {
  user_id: number;
  playlist_id: number;
  latitude_created: number;
  longitude_created: number;
  timestamp_created: string;
  target_acousticness: number;
  target_danceability: number;
  target_energy: number;
  target_liveness: number;
  target_loudness: number;
  target_speechiness: number;
  target_tempo: number;
  target_valence: number;
};

const UserPlayListCard = ({
  user_id,
  playlist_id,
  latitude_created,
  longitude_created,
  timestamp_created,
  target_acousticness,
  target_danceability,
  target_energy,
  target_liveness,
  target_loudness,
  target_speechiness,
  target_tempo,
  target_valence,
}: Props) => {
  const location = `${latitude_created}, ${longitude_created}`;
  const { palette } = useTheme();

  // Create an array of data points for the radar chart
  const data = [
    { track_attribute: "Acousticness", value: target_acousticness },
    { track_attribute: "Danceability", value: target_danceability },
    { track_attribute: "Energy", value: target_energy },
    { track_attribute: "Liveness", value: target_liveness },
    { track_attribute: "Loudness", value: target_loudness },
    { track_attribute: "Speechiness", value: target_speechiness },
    { track_attribute: "Tempo", value: target_tempo },
    { track_attribute: "Valence", value: target_valence },
  ];

  return (
    <DashboardBox
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        maxHeight: "420px",
      }}
    >
      <UserPlayListCardHeader
        user_id={user_id}
        playlist_id={playlist_id}
        location={location}
        timestamp={timestamp_created}
      />
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="85%"
          data={data}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="track_attribute" />
          <PolarRadiusAxis
            domain={[0, 1]}
            angle={45}
            orientation="right"
            tick={{ dy: 5, dx: 10 }}
          />
          <Radar
            name={"User Playlist Chart"}
            dataKey="value"
            stroke={palette.primary[300]}
            fill={palette.primary[300]}
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default UserPlayListCard;
