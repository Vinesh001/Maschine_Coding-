import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(true);

  function handleOnChange(e, type) {
    const value = e.target.value;
    if (isNaN(value)) {
      alert("You Idiot dont you know that time should be in number!!!");
      return;
    }
    if (value > 60 || value < 0) return;

    if (type === "H") {
      setHour(value);
      console.log(value);
    } else if (type === "M") {
      setMinute(value);
      console.log(value);
    } else if (type === "S") {
      setSecond(value);
      console.log(value);
    }
  }


  function handleOnClick(e, type) {
    if (type === "start") {
      setPause(false);
      setStart(true);
    }
    if(type==="pause"){
      setPause(!pause);
    }
    if(type==="restart"){
      setHour();
      setMinute();
      setSecond();
      setStart(false);
    }
  }


  useEffect(() => {

    if (!start||pause) return;
    if (hour === 0 && minute === 0 && second === 0) {
      setPause(true);
      return;
    }

    const interval = setInterval(() => {
      setSecond((prevSecond) => {
        if (prevSecond > 0) return prevSecond - 1;

        if (minute > 0) {
          setMinute(minute-1);
          return 59;
        }

        if (hour > 0) {
          setHour(hour-1);
          setMinute(59);
          return 59;
        }
        setStart(false);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start, pause]);


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-20">
        <h1 className="font-bold text-[3rem] text-zinc-500">
          Count Down Timer
        </h1>
        {!start && (
          <div className="flex gap-5">
            <input
              type="text"
              value={hour}
              placeholder="HH"
              className="outline-none bg-zinc-200 rounded-md p-2"
              onChange={(e) => handleOnChange(e, "H")}
            />
            <input
              type="text"
              value={minute}
              placeholder="MM"
              className="outline-none bg-zinc-200 rounded-md p-2"
              onChange={(e) => handleOnChange(e, "M")}
            />
            <input
              type="text"
              value={second}
              placeholder="SS"
              className="outline-none bg-zinc-200 rounded-md p-2"
              onChange={(e) => handleOnChange(e, "S")}
            />
          </div>
        )}
        {!start && (
          <button
            className="bg-zinc-200 rounded-md px-10 py-1 text-[2rem] text-zinc-700 hover:bg-zinc-700 hover:text-white cursor-pointer"
            onClick={(e) => handleOnClick(e, "start")}
          >
            Start
          </button>
        )}
        {start && (
          <div className="flex gap-2 text-[2rem] font-bold text-zinc-600">
            <span>{hour != undefined ? hour : "00"}</span>
            <span>:</span>
            <span>{minute != undefined ? minute : "00"}</span>
            <span>:</span>
            <span>{second!=undefined?second:"00"}</span>
          </div>
        )}
        {start && (
          <div className="flex gap-6">
            <button
              className="bg-zinc-200 rounded-md px-10 py-1 text-[2rem] text-zinc-700 hover:bg-zinc-700 hover:text-white cursor-pointer"
              onClick={(e) => handleOnClick(e, "pause")}
            >
              {pause===true?"Play":"Pause"}
            </button>
            <button
              className="bg-zinc-200 rounded-md px-10 py-1 text-[2rem] text-zinc-700 hover:bg-zinc-700 hover:text-white cursor-pointer"
              onClick={(e) => handleOnClick(e, "restart")}
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
