import { useState } from "react";
import reactLogo from "../assets/react.svg";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/applications");
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          className="bg-red-950 hover:bg-orange-400"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <Button onClick={handleButtonClick} type="primary">
          Go to Applications
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Home;
