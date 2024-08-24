import React from "react";

const StartScreen = ({ numQuestions, dispatch, isRestart }) => {
  return (
    <div className="start">
      <h2>{isRestart? "You Ready For Restarting Quiz?" : "Welcome to React Quiz"}</h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button className="btn btn-ui" onClick={()=>dispatch({type:"activation"})}>Start Quiz</button>
    </div>
  );
};

export default StartScreen;
