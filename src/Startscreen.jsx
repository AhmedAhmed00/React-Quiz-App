import React from "react";

export default function Startscreen({ numOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome To Our React Quiz</h2>
      <h3>{numOfQuestions} questions to test your React mastery </h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Let's Start
      </button>
    </div>
  );
}
