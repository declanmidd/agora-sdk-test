import { useState } from "react";
import { useClient } from "./settings";
import Button from "./components/Button/Button";

export default function Controls(props) {
  const client = useClient();
  const { tracks, setInCall, setStart } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  async function leaveChannel(channel) {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  }

  async function mute(type) {
    if (type == "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type == "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  }

  return (
    <>
      <Button text={"mute"} onClick={() => mute("video")} />
      <Button text={"mute"} onClick={() => mute("audio")} />
      <Button text={"Leave"} onClick={() => leaveChannel()} />
    </>
  );
}
