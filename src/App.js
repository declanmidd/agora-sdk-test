import { useState } from "react";
import Button from "./components/Button/Button";

import "./App.css";
import VideoCall from "./VideoCall";

function App() {
  const [inCall, setInCall] = useState(false);

  return (
    <>
      <div className="main">
        {inCall ? (
          <VideoCall setInCall={setInCall} />
        ) : (
          <Button text={"join call"} onClick={() => setInCall(true)} />
        )}
      </div>
    </>
  );
}

export default App;
