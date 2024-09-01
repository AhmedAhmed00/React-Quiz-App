import { useEffect } from "react";
import { useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Startscreen from "./Startscreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";

const initState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  remainingSeconds: null,
};

export default function App() {
  function reducer(currentState, action) {
    switch (action.type) {
      case "success":
        return {
          ...currentState,
          questions: action.payload,
          status: "ready",
          points: 0,
        };
      case "Error":
        return { ...currentState, status: "Error" };
      case "start":
        return {
          ...currentState,
          status: "active",
          remainingSeconds: currentState.questions.length * 20,
        };
      case "newAnswer":
        const question = currentState.questions.at(currentState.index);
        return {
          ...currentState,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? currentState.points + question.points
              : currentState.points,
        };
      case "nextQues":
        return { ...currentState, index: currentState.index + 1, answer: null };
      case "finished": {
        return { ...currentState, status: "finished" };
      }
      case "restart":
        return {
          ...currentState,
          questions: currentState.questions,
          status: "ready",
          index: 0,
          answer: null,
          points: 0,
        };
      case "tick":
        return {
          ...currentState,
          remainingSeconds: currentState.remainingSeconds--,
        };
      default:
        return currentState;
    }
  }

  const [state, dispatch] = useReducer(reducer, initState);

  const { questions, status, index, answer, points, remainingSeconds } = state;
  const numOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/AhmedAhmed00/questionsApi/questions"
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "success", payload: data });
      })
      .catch((err) => dispatch({ type: "Error" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <Startscreen dispatch={dispatch} numOfQuestions={numOfQuestions} />
        )}

        {status === "active" && (
          <>
            <Progress
              maxPoints={maxPoints}
              points={points}
              index={index}
              numOfQues={numOfQuestions}
            />
            <Question
              answer={answer}
              dispatch={dispatch}
              question={questions[index]}
            />
            <NextButton
              answer={answer}
              dispatch={dispatch}
              index={index}
              numOfQues={numOfQuestions}
            />
            <Timer remainingSeconds={remainingSeconds} dispatch={dispatch} />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <div>{children}</div>;
}
