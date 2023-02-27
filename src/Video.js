import { AgoraVideoPlayer } from "agora-rtc-react";

export default function Video(props) {
  const { users, tracks } = props;

  return (
    <>
      <div className="video">
        <div>
          <AgoraVideoPlayer videoTrack={tracks[1]} />
        </div>
        <div>
          {users.length > 0 &&
            users.map((user) => {
              if (user.videoTrack) {
                <div>
                  <AgoraVideoPlayer
                    videoTrack={user.videoTrack}
                    key={user.uid}
                  />
                </div>;
              } else {
                return null;
              }
            })}
        </div>
      </div>
    </>
  );
}
