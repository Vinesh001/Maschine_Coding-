import { FaSortDown, FaCaretRight } from "react-icons/fa";
import { useState } from "react";

const datas = [
  {
    question: "How many bones does a cat have?",
    answer: "A cat has 230 bones - 6 more than a human",
  },
  {
    question: "How much do cats sleep?",
    answer: "The average cat sleeps 12-16 hours per day",
  },
  {
    question: "How long do cats live",
    answer:
      "Outdoor cats live 5 years on average. Indoor\ncats live 15 years on average.",
  },
];

function App() {
  const [selected, setSelected] = useState([
    ...Array(datas.length)
      .fill(false)
      .map((_, idx) => idx === 0),
  ]);
  const handleOnClick = (idx) => {
    setSelected((prevArray) => {
      const array = [...prevArray];
      array[idx] = !array[idx];
      return array;
    });
  };
  return (
    <div className="">
      <h1 className="text-center text-[3rem] font-bold text-zinc-600">
        Frequently Asked Questions
      </h1>
      <div className="ml-40 mt-10">
        {datas.map((data, idx) => {
          return (
            <div key={idx} className="text-lg font-semibold">
              <div className=" flex gap-2">
                <span onClick={() => handleOnClick(idx)}>
                  {selected[idx] === true ? <FaSortDown /> : <FaCaretRight />}
                </span>
                <span className="text-zinc-600">{data.question}</span>
              </div>
              {selected[idx] && <div className="ml-6 text-zinc-400">{data.answer}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
