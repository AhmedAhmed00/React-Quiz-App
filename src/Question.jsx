import React, { memo } from "react";

const Question = memo(function Question({ question, dispatch, answer }) {
  const hasAnswerd = answer !== null;
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            onClick={() => {
              dispatch({ type: "newAnswer", payload: index });
            }}
            disabled={hasAnswerd}
            key={option}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswerd
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
)




export default Question
