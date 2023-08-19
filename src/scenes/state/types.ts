// defining types

// response type for Api response
// UPDATE after user_id comes in
export interface UserHistoryData {
  id: number;
  playlistName: string;
  spotifyPlaylistId: string;
  timestamp: string;
  longitude: number;
  latitude: number;
  seedTracks: string;
  targetAcousticness: number;
  targetDanceability: number;
  targetEnergy: number;
  targetInstrumentalness: number;
  targetKey: number;
  targetLiveness: number;
  targetLoudness: number;
  targetMode: number;
  targetSpeechiness: number;
  targetTempo: number;
  targetTimeSignature: number;
  targetValence: number;
  type: string; // Use a more specific type if you know the structure of playlistSongs
  userId: number;
}

export interface UserHistoryPlaylistData extends Array<UserHistoryData> {}

// Feedback data type
export interface FeedbackData {
  feedback_id: number;
  user_id: number; // Foreign Key
  feedback_text: string;
  fb_timestamp: string; // Assuming fb_timestamp is a string
}

// Map of user id to their feedbacks
export interface UserFeedbackData extends Array<FeedbackData> {}

export interface ApiState {
  data?: UserHistoryPlaylistData;
  feedbackData?: UserFeedbackData;
  userData?: UserData;
  loading: boolean;
}

export interface User {
  userId: number;
  spotifyUserId: string;
  userMarket: string;
  userEmail: string;
}

export interface UserData extends Array<User> {}

export type RootState = {
  api: ApiState;
};
