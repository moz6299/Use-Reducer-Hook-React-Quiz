import React from "react";

const Progress = ({ index, numQuestions, answer, points,sumPoints }) => {
  return (
    <div className="progress">
        <progress max={numQuestions} value={answer!==null ? index+1 : index} />
      <p>
        Question <strong>{answer!==null ? index+1 : index } /</strong> <strong>{numQuestions}</strong>{" "}
      </p>
      <p><strong> {points} / </strong>{sumPoints}<strong></strong> </p>
    </div>
  );
};

export default Progress;
