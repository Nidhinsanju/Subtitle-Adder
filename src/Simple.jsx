import React, { useState } from "react";

function Simple() {
  return (
    <div>
      <video width="640" height="360" controls>
        <source src={video2} type="video/mp4" />
        <track
          kind="captions"
          src={subtitles}
          srcLang="en"
          label="english sub"
        />
      </video>
    </div>
  );
}
export default Simple;
