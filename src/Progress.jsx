import React, { memo } from "react";

const Progress = memo(function Progress({ index, numOfQues, points, maxPoints }) {
  return (
    <header className="progress">
      <progress max={numOfQues} value={index} />
      <p>
        Qeustion <strong>{index + 1}</strong> / {numOfQues}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
})



export default Progress
