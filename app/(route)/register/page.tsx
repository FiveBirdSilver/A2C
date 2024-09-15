"use client";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [mathScore, setMathScore] = useState(40);
  const prevMathScore = useRef(40);

  useEffect(() => {
    prevMathScore.current = mathScore;
  }, [mathScore]);

  const result = prevMathScore.current < mathScore ? "올랐네요" : "개판이네요";

  return (
    <>
      <button onClick={() => setMathScore(mathScore + 20)}>시험보기</button>
      <span>{`성적이 ${result}! `}</span>
    </>
  );
}
