import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import { useEffect } from "react";
import {
  useFetchAllUsersQuery,
  useFetchFeedbackDataQuery,
  useFetchUserHistoryDataQuery,
} from "../state/api";

// manually set "grid" representing rows for layout (non-responsive)
const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b c"
  "e d d"
  "e d d"
  "e d d"
  "e d d"
  "e d d"
  "e d d"
`;

// responsive layout
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "d"
  "d"
  "e"
  "e"
  "e"
  "e"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  // Use the generated API hooks for fetching user data and feedback data
  const {
    isSuccess: feedbackSuccess,
    isLoading: feedbackLoading,
    isError: feedbackError,
    error: feedbackErr,
  } = useFetchFeedbackDataQuery();

  const {
    isSuccess: userSuccess,
    isLoading: userLoading,
    isError: userError,
    error: userErr,
  } = useFetchUserHistoryDataQuery();

  const {
    isSuccess: userProfileSuccess,
    isLoading: userProfileLoading,
    isError: userProfileError,
    error: userProfileErr,
  } = useFetchAllUsersQuery();

  // You can simply handle logging or other side effects here, but no need to dispatch the data
  useEffect(() => {
    if (userSuccess) {
      console.log("User data fetch was successful");
    } else if (userLoading) {
      console.log("User data fetch is loading");
    } else if (userError) {
      console.error("User data fetch failed with error: ", userErr);
    }
  }, [userSuccess, userLoading, userError, userErr]);

  useEffect(() => {
    if (feedbackSuccess) {
      console.log("Feedback data fetch was successful");
    } else if (feedbackLoading) {
      console.log("Feedback data fetch is loading");
    } else if (feedbackError) {
      console.error("Feedback data fetch failed with error: ", feedbackErr);
    }
  }, [feedbackSuccess, feedbackLoading, feedbackError, feedbackErr]);

  useEffect(() => {
    if (userProfileSuccess) {
      console.log("User profile fetch was successful");
    } else if (userProfileLoading) {
      console.log("User profile fetch is loading");
    } else if (userProfileError) {
      console.error("User profile fetch failed with error: ", userProfileErr);
    }
  }, [
    userProfileSuccess,
    userProfileLoading,
    userProfileError,
    userProfileErr,
  ]);

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      {/* refactored into Row1/Row2 in /dashboard */}
      <Row1 />
      <Row2 />
    </Box>
  );
};

export default Dashboard;
