import React, { useState, useEffect } from "react";
import "./App.css";
import { useColorMode, Button } from "@chakra-ui/react";
import TetrisLoader from "./screens/loading/TetrisLoader";
import FoodCard from "./components/FoodCard";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4500);
  }, []);

  if (isLoading) {
    return <TetrisLoader />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontWeight: "bold",
        flexDirection: "column",
      }}
    >
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <FoodCard />
    </div>
  );
}

export default App;
