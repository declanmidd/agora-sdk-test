import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appToken =
  "007eJxTYJDS1Uz87co9L1H8kC5nFiOX+Z2oiRsXqBxkmc659nxlTYkCg6FBWkqSRXJasolZkomZoZmFQZKZhaGJUVKKcUqaiZGZit2f5IZARoajfWWMjAwQCOKzMyRnJOblpeYwMAAAhwIdbA==";

const appId = "10fdb8cfc46b461680b68142bd3df426";

export const config = {
  mode: "rtc",
  codec: "vp8",
  appId: appId,
  token: appToken,
};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "channel";
