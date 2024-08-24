import React, { useEffect } from "react";

const Timer = ({ remainSeconds, dispatch }) => {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  const mins = Math.floor(remainSeconds / 60);
  const secs = remainSeconds % 60;

  return (
    <div>
      <p className="timer">
        {" "}
        {mins < 10 && "0"}{mins}:{secs < 10 && "0"}
        {secs}{" "}
      </p>
    </div>
  );
};

export default Timer;
