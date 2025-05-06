import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [advice, setAdvice] = useState("Learn from your mistakes.");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    try {
      const result = await fetch("https://api.adviceslip.com/advice");
      const data = await result.json();
      setAdvice(data.slip.advice);
      setCount((c) => c + 1);
    } catch (error) {
      console.error("Failed to fetch advice:", error);
      setAdvice(
        "Sorry, we couldn't fetch advice at this time. Please try again later."
      );
    }
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="App">
      <div className="adviceSec">
        <h1>{advice}</h1>
        <button onClick={getAdvice}>Get advice</button>
        <Message count={count} />
      </div>
    </div>
  );
}

function Message({ count }) {
  return (
    <p>
      You have read <strong>{count}</strong> pieces of advice
    </p>
  );
}
