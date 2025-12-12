import React, { useState } from "react";
import TaskForm from "./TaskForm";
import SimulationPage from "./SimulationPage";

function App() {
  const [page, setPage] = useState("form");
  const [allTasks, setAllTasks] = useState([]);
  const [algorithm, setAlgorithm] = useState("");

  // Now receives (tasks, algorithmName)
  const handleFormComplete = (tasks, algorithmName) => {
    setAllTasks(tasks);
    setAlgorithm(algorithmName);
    setPage("simulation");
  };

  const handleBack = () => {
    setPage("form");
  };

  return (
    <>
      {page === "form" ? (
        <TaskForm onSubmit={handleFormComplete} />
      ) : (
        <SimulationPage
          tasks={allTasks}
          algorithm={algorithm}
          onBack={handleBack}
        />
      )}
    </>
  );
}

export default App;
