import { RootState } from "@/RootState";
import { createSelector } from "reselect";
import { UserHistoryData } from "./types";
import { api } from "./api";

// RTK Query's auto-generated selectors
const selectUserHistoryData = api.endpoints.fetchUserHistoryData.select();
const selectUserFeedbackData = api.endpoints.fetchFeedbackData.select();
const selectUserProfileData = api.endpoints.fetchAllUsers.select();

// look into why the raw selector is needed
// Input selector for the raw user history data
const rawUserHistorySelector = (state: RootState) =>
  selectUserHistoryData(state).data;

// Memoized selector to transform this data into the `coordinates` format
export const selectFullUserHistoryData = createSelector(
  [rawUserHistorySelector],
  (userHistoryData) => userHistoryData || []
);

// Memoized selector for user data
export const selectUserData = createSelector(
  [rawUserHistorySelector],
  (userData) => userData || []
);

// Input selector for the raw feedback data
const rawFeedbackSelector = (state: RootState) =>
  selectUserFeedbackData(state).data;

// Memoized selector for user feedback
export const selectUserFeedback = createSelector(
  [rawFeedbackSelector],
  (feedback) => feedback || []
);

const rawUserProfileSelector = (state: RootState) =>
  selectUserProfileData(state).data;

export const selectUserProfiles = createSelector(
  [rawUserProfileSelector],
  (userProfile) => userProfile || []
);

// TO-DO: CHANGE ALL REFERENCES TO PLAYLIST.ID TO PLAYLIST.USER_ID
// AFTER JAVA API SIDE UPDATES

export const selectUserStats = createSelector([selectUserData], (userData) => {
  const userStatsMap: Record<string, number> = {};

  userData.forEach((playlist: UserHistoryData) => {
    const userId = playlist.userId.toString();
    if (!userStatsMap[userId]) {
      userStatsMap[userId] = 0;
    }
    userStatsMap[userId]++;
  });

  const userStats = Object.keys(userStatsMap).map((userId) => ({
    userId,
    playlistCount: userStatsMap[userId],
  }));

  return userStats;
});

export const selectTargetUserPlaylists = createSelector(
  [selectUserData, (_, userIdInput) => userIdInput],
  (userData, userIdInput) => {
    if (!userIdInput) {
      return userData; // return all data if no userId is input
    }

    const targetUserId = parseInt(userIdInput, 10);
    return userData.filter(
      (playlist: UserHistoryData) => playlist.userId === targetUserId
    );
  }
);

export const selectPlaylistGeneratedInLastYear = createSelector(
  [selectUserData],
  (userData) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return userData.filter((playlist: UserHistoryData) => {
      const playlistDate = new Date(playlist.timestamp);
      return playlistDate > oneYearAgo;
    });
  }
);

export const selectPlaylistTimestamps = createSelector(
  [selectUserData],
  (userData) => {
    return userData.map((playlist: UserHistoryData) => playlist.timestamp);
  }
);

// As you've noted, with RTK Query, you'd typically also have query hooks
// available for use directly in your components.
