import React, { useState, useEffect } from "react";
import { useRef } from "react";
import AnalyticsPage from "./AnalyticsPage";
const colors = [
  "bg-indigo-400",
  "bg-pink-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-orange-400",
];

const SimulationPage = ({ tasks, algorithm, onBack }) => {
  const [time, setTime] = useState(0);
  const lastExecutedTime = useRef(-1);
  const [taskList, setTaskList] = useState(
    tasks.map((t) => ({
      ...t,
      remaining: Number(t.burstTime),
      status: "Pending",
      startTime: null,
      completionTime: null,
      arrivalTime: Number(t.arrivalTime),
      priority: Number(t.priority),
    }))
  );
  const [currentTask, setCurrentTask] = useState(null);
  const [ganttData, setGanttData] = useState([]);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  // Map taskName to consistent color
  const colorMap = {};
  let colorIndex = 0;
  taskList.forEach((t) => {
    if (!colorMap[t.taskName]) {
      colorMap[t.taskName] = colors[colorIndex % colors.length];
      colorIndex++;
    }
  });

  // Increment simulation time
  useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Scheduling logic (Priority or SRTF based on algorithm)
  useEffect(() => {
    if (lastExecutedTime.current === time) return;
    lastExecutedTime.current = time;
    let readyTasks = taskList.filter(
      (t) => t.remaining > 0 && t.arrivalTime <= time
    );

    if (readyTasks.length === 0) {
      setCurrentTask(null);
      return;
    }

    // If algorithm string contains "SRTF" → shortest remaining time first
    if (algorithm && algorithm.toLowerCase().includes("srtf")) {
      readyTasks.sort(
        (a, b) => a.remaining - b.remaining || a.arrivalTime - b.arrivalTime
      );
    } else {
      // Default: Preemptive Priority Scheduling (higher priority value first)
      readyTasks.sort(
        (a, b) => b.priority - a.priority || a.arrivalTime - b.arrivalTime
      );
    }

    const task = readyTasks[0]; // Pick task based on selected algorithm

    setTaskList((prev) =>
      prev.map((t) => {
        if (t.taskName === task.taskName && t.remaining > 0) {
          const startTime = t.startTime === null ? time : t.startTime;
          const remaining = t.remaining - 1;
          const completionTime = remaining === 0 ? time + 1 : t.completionTime;
          return {
            ...t,
            remaining,
            status: remaining === 0 ? "Done" : "Running",
            startTime,
            completionTime,
          };
        } else if (t.remaining > 0 && t.arrivalTime <= time) {
          return { ...t, status: "Pending" }; // Reset other tasks
        }
        return t;
      })
    );

    setCurrentTask(task.taskName);
    setGanttData((prev) => [...prev, task.taskName]);
  }, [time, algorithm]); // ✅ keep as you had (no taskList here)

  const toggleAnalytics = () => setAnalyticsOpen((prev) => !prev);

  // const getWaitingTime = (t) => {
  //   if (t.completionTime === null) return "-";
  //   return t.completionTime - t.arrivalTime - t.burstTime;
  // };

  // const getTurnaroundTime = (t) => {
  //   if (t.completionTime === null) return "-";
  //   return t.completionTime - t.arrivalTime;
  // };

  // // ✅ NEW: averages (logic only, no behavior change)
  // const getAverageWaitingTime = () => {
  //   const finished = taskList.filter((t) => t.completionTime !== null);
  //   if (finished.length === 0) return "-";

  //   const total = finished.reduce(
  //     (sum, t) => sum + (t.completionTime - t.arrivalTime - t.burstTime),
  //     0
  //   );

  //   return (total / finished.length).toFixed(2);
  // };

  // const getAverageTurnaroundTime = () => {
  //   const finished = taskList.filter((t) => t.completionTime !== null);
  //   if (finished.length === 0) return "-";
  //   const total = finished.reduce(
  //     (sum, t) => sum + (t.completionTime - t.arrivalTime),
  //     0
  //   );
  //   return (total / finished.length).toFixed(2);
  // };

  // //const avgWaiting = getAverageWaitingTime();
  // //const avgTurnaround = getAverageTurnaroundTime();

  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
      {/* Top heading with algorithm name */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition shadow-md"
        >
          ← Back
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-white text-2xl font-bold">🛰 CPU Simulation</h1>
          <p className="text-sm text-gray-300 mt-1">
            Algorithm:{" "}
            <span className="font-semibold text-indigo-300">
              {algorithm || "Preemptive Priority Scheduling"}
            </span>
          </p>
        </div>
        <div className="w-24" /> {/* spacer to balance layout */}
      </div>

      <div className="flex flex-1 space-x-4 mb-4">
        {/* Left Panel */}
        <div className="bg-gray-900 p-4 rounded-2xl w-1/5 flex flex-col items-center space-y-4 shadow-lg border border-gray-700">
          <h2 className="text-white font-bold text-xl">⏱ Time</h2>
          <div className="text-3xl font-mono text-indigo-300">
            {time}
            <span className="text-sm text-gray-400 ml-1">s</span>
          </div>
          <p className="text-xs text-gray-400 text-center px-2">
            Watch how the scheduler selects tasks every second.
          </p>
          <button
            onClick={toggleAnalytics}
            className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition shadow-md text-sm font-semibold"
          >
            View Analytics
          </button>
        </div>

        {/* Middle Panel */}
        <div className="bg-gray-950 p-4 rounded-2xl flex-1 flex flex-col items-center justify-center shadow-lg border border-gray-800">
          <div className="w-40 mb-4 animate-bounce">
            <img
              src="https://e7.pngegg.com/pngimages/191/617/png-clipart-mars-exploration-rover-mars-science-laboratory-mars-rover-curiosity-mars-miscellaneous-nasa-thumbnail.png"
              alt="Mars Rover"
              className="w-full drop-shadow-[0_0_20px_rgba(129,140,248,0.8)]"
            />
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl w-3/4 text-center text-white text-xl shadow-md border border-gray-700">
            {currentTask ? (
              <>
                <div className="text-xs text-gray-400 mb-1 uppercase tracking-widest">
                  Now Executing
                </div>
                <span className="text-2xl text-indigo-300 font-bold">
                  {currentTask}
                </span>
              </>
            ) : (
              <span className="text-gray-400 text-base">
                CPU Idle... waiting for tasks to be ready.
              </span>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-gray-900 p-4 rounded-2xl w-2/5 shadow-lg overflow-y-auto max-h-full border border-gray-800">
          <h2 className="text-white font-bold text-xl mb-2 flex items-center justify-between">
            <span>📋 Tasks</span>
            <span className="text-xs text-gray-400">
              Total:{" "}
              <span className="text-indigo-300 font-semibold">
                {taskList.length}
              </span>
            </span>
          </h2>
          <table className="min-w-full text-white text-center text-xs border border-gray-700 rounded-xl overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-2 px-2 border-b border-gray-700">#</th>
                <th className="py-2 px-2 border-b border-gray-700">
                  Task Name
                </th>
                <th className="py-2 px-2 border-b border-gray-700">Arrival</th>
                <th className="py-2 px-2 border-b border-gray-700">Burst</th>
                <th className="py-2 px-2 border-b border-gray-700">Priority</th>
                <th className="py-2 px-2 border-b border-gray-700">
                  Remaining
                </th>
                <th className="py-2 px-2 border-b border-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {taskList.map((t, i) => (
                <tr
                  key={i}
                  className={`hover:bg-gray-800 transition ${
                    t.status === "Done" ? "bg-green-700 text-white" : ""
                  } ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-950"}`}
                >
                  <td className="py-1 px-2 border-b border-gray-800">
                    {i + 1}
                  </td>
                  <td className="py-1 px-2 border-b border-gray-800 text-left">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          colorMap[t.taskName]
                        }`}
                      />
                      <span className="truncate max-w-[120px]">
                        {t.taskName}
                      </span>
                    </span>
                  </td>
                  <td className="py-1 px-2 border-b border-gray-800">
                    {t.arrivalTime}
                  </td>
                  <td className="py-1 px-2 border-b border-gray-800">
                    {t.burstTime}
                  </td>
                  <td className="py-1 px-2 border-b border-gray-800">
                    {t.priority}
                  </td>
                  <td className="py-1 px-2 border-b border-gray-800">
                    {t.remaining}
                  </td>
                  <td className="py-1 px-2 border-b border-gray-800">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        t.status === "Running"
                          ? "bg-indigo-500 text-white"
                          : t.status === "Done"
                          ? "bg-green-500 text-white"
                          : "bg-gray-700 text-gray-200"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
              {taskList.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-3 text-gray-400 text-xs italic">
                    No tasks added.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Gantt Chart */}
      <div className="bg-gray-950 p-4 rounded-2xl shadow-lg h-24 overflow-x-auto flex flex-col border border-gray-800">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-white text-sm font-semibold">📈 Gantt Chart</h3>
          <span className="text-[10px] text-gray-400">
            Each block = 1 second
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {ganttData.length === 0 ? (
            <span className="text-xs text-gray-500 italic">
              Timeline will appear as the simulation runs...
            </span>
          ) : (
            ganttData.map((task, i) => (
              <div
                key={i}
                className={`text-[10px] px-1.5 py-1 rounded ${colorMap[task]} shadow-sm`}
              >
                {task}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Analytics Modal */}
      {analyticsOpen && (
        <AnalyticsPage tasks={taskList} onClose={toggleAnalytics} />
      )}
    </div>
  );
};

export default SimulationPage;
