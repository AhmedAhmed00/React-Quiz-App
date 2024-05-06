import React from "react";

export default function FinishedScreen({ points, maxPoints, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> Out of {maxPoints} (
        {Math.ceil(percentage)})%
      </p>
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
}
