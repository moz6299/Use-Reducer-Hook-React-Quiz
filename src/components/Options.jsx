import React from "react";

const Options = ({ question, dispatch, answer }) => {
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              answer !== null && index !== question.correctOption && "wrong"
            } ${ answer !== null &&  index === question.correctOption && "correct"}`}
            key={option}
            onClick={() => dispatch({ type: "inAnswer", payload: index })}
            disabled = {answer !== null}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
