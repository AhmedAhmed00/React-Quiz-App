import React from "react";

export default function NextButton({ dispatch, answer, index, numOfQues }) {
  if (answer === null) return null;
  if (index < numOfQues - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextQues" });
        }}
      >
        Next
      </button>
    );
  if (index === numOfQues - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "finished" });
        }}
      >
        Next
      </button>
    );
  }
}
