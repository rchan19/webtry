import { useSelector } from "react-redux";
import { selectTargetUserPlaylists } from "../state/apiSlice";
import { Box, useMediaQuery } from "@mui/material";
import UserPlayListCard from "@/components/UserPlaylistCard";
import { UserHistoryData } from "../state/types";
import { useFetchUserHistoryDataQuery } from "../state/api";
import { useState } from "react";
import SearchBar from "@/components/Searchbar";

const ViewUserPlaylist = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  if (isAboveMediumScreens) {
    console.log("is above MediumScreens");
  }

  const [userIdInput, setUserIdInput] = useState("");

  // Use the generated hook from RTK Query
  useFetchUserHistoryDataQuery();

  // search input
  const targetUser = useSelector((state) =>
    selectTargetUserPlaylists(state, userIdInput)
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserIdInput(event.target.value);
  };

  return (
    <>
      <SearchBar value={userIdInput} onChange={handleInputChange} />
      <Box
        width="100%"
        height="100%"
        display="grid"
        gap="1.5rem"
        sx={
          isAboveMediumScreens
            ? {
                gridTemplateColumns: "repeat(4, minmax(370px, 1fr))",
                gridAutoRows: "minmax(420px, 1fr)",
                // gridTemplateAreas: gridTemplateLargeScreens,
              }
            : {
                gridAutoColumns: "1fr",
                gridAutoRows: "minmax(auto, 1fr)",
                // gridTemplateAreas: gridTemplateSmallScreens,
              }
        }
      >
        {/* forloop code inside here */}
        {targetUser &&
          targetUser.map((playlistData: UserHistoryData) => (
            <UserPlayListCard
              key={playlistData.id}
              // TO-DO: CHANGE THIS LATER
              user_id={playlistData.userId}
              playlist_id={playlistData.id}
              latitude_created={playlistData.latitude}
              longitude_created={playlistData.longitude}
              timestamp_created={playlistData.timestamp}
              target_acousticness={playlistData.targetAcousticness}
              target_danceability={playlistData.targetDanceability}
              target_energy={playlistData.targetEnergy}
              target_liveness={playlistData.targetLiveness}
              target_loudness={playlistData.targetLoudness}
              target_speechiness={playlistData.targetSpeechiness}
              target_tempo={playlistData.targetTempo}
              target_valence={playlistData.targetValence}
            />
          ))}
      </Box>
    </>
  );
};

export default ViewUserPlaylist;
