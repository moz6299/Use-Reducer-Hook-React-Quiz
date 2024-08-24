import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "../assets/Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import Progress from "./Progress";
import NextQuestion from "./NextQuestion";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const secondPerQuestion = 30;

const initialState = {
  questions: [],

  //loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  isRestart: false,
  remainSeconds: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "activation":
      return {
        ...state,
        status: "active",
        remainSeconds: state.questions.length * secondPerQuestion,
      };
    case "inAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions[state.index].correctOption
            ? state.points + state.questions[state.index].points
            : state.points,
      };
    case "NextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "Finishing":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "Restarting":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
        isRestart: true,
      };

    case "tick":
      return {
        ...state,
        status: state.remainSeconds === 0 ? "finished" : state.status,
        remainSeconds: state.remainSeconds - 1,highScore:
        state.points > state.highScore ? state.points : state.highScore
      };

    default:
      throw new Error("Unknown Action");
  }
};

const App = () => {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      isRestart,
      remainSeconds,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const sumPoints = questions.reduce((acc, cur) => {
    return acc + cur.points;
  }, 0);

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            isRestart={isRestart}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              answer={answer}
              points={points}
              sumPoints={sumPoints}
            />

            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              {answer !== null && (
                <NextQuestion
                  dispatch={dispatch}
                  numQuestions={numQuestions}
                  index={index}
                />
              )}

              <Timer remainSeconds={remainSeconds} dispatch={dispatch} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            sumPoints={sumPoints}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
