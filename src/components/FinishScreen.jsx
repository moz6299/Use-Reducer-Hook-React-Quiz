import React from "react";

const FinishScreen = ({ points, sumPoints, dispatch, highScore }) => {
  const percentage = (points / sumPoints) * 100;
  return (
    <div>
      <p className="result">
        <span>You scored</span>
        <strong>{points}</strong> out of {sumPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore" >High score is {highScore} points</p>
      <button className="btn btn-ui" onClick={()=>dispatch({type:"Restarting"})} >Restart Quiz</button>
    </div>
  );
};

export default FinishScreen;
