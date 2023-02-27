import { useState, useEffect } from "react";
import {
  channelName,
  config,
  useClient,
  useMicrophoneAndCameraTracks,
} from "./settings";

import Controls from "./Controls";
import Video from "./Video";

export default function VideoCall(props) {
  const { setInCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();

  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    var init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        } else if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) {
            user.audioTrack.stop();
          }
          if (mediaType === "video") {
            setUsers((prevUsers) => {
              return prevUsers.filter((User) => User.uid !== user.uid);
            });
          }
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, config.token, null);
      } catch (err) {
        console.error(err);
      }

      if (tracks) await client.publish(tracks[0], tracks[1]);
      setStart(true);
    };
    if (ready && tracks) {
      try {
        init(channelName);
      } catch (err) {
        console.log(err);
      }
    }
  }, [channelName, client, ready, tracks]);

  return (
    <>
      <div className="main">
        <div className="controls">
          {ready && tracks && (
            <Controls tracks={tracks} setStart={start} setInCall={setInCall} />
          )}
        </div>
        <div className="video">
          {start && tracks && <Video tracks={tracks} users={users} />}
        </div>
      </div>
    </>
  );
}
