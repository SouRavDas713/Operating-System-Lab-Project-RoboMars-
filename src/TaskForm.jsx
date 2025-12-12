import React, { useState } from "react";

const TaskForm = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [priority, setPriority] = useState("");
  const [tasks, setTasks] = useState([]);

  const taskBurstMap = {
    "Environment Scan": 6,
    "Soil Sampling": 8,
    "Data Transmission": 10,
    "Photo Capture": 12,
    "Battery Recharge": 15,
    "Defense System": 20,
    "Self Cleaning": 5,
  };

  const taskPriorityMap = {
    "Photo Capture": 1,
    "Self Cleaning": 1,
    "Data Transmission": 2,
    "Environment Scan": 2,
    "Battery Recharge": 3,
    "Defense System": 3,
    "Soil Sampling": 2,
  };

  const handleTaskChange = (e) => {
    const selected = e.target.value;
    setTaskName(selected);
    setBurstTime(taskBurstMap[selected] || "");
    setPriority(taskPriorityMap[selected] || "");
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName || !arrivalTime) return alert("Please fill all fields");

    // count how many same tasks already added
    const count = tasks.filter((t) => t.taskName.startsWith(taskName)).length;
    const finalName = count ? `${taskName} ${count + 1}` : taskName;

    const newTask = { taskName: finalName, arrivalTime, burstTime, priority };
    setTasks([...tasks, newTask]);

    // reset form fields
    setTaskName("");
    setArrivalTime("");
    setBurstTime("");
    setPriority("");
  };

  const handleComplete = () => {
    if (tasks.length === 0) return alert("Add at least one task first!");

    // 👉 Decide algorithm: if all priorities are same → SRTF, else → Priority
    const firstPriority = tasks[0].priority;
    const allSamePriority = tasks.every(
      (t) => String(t.priority) === String(firstPriority)
    );

    const algorithm = allSamePriority
      ? "SRTF (Shortest Remaining Job First)"
      : "Preemptive Priority Scheduling";

    onSubmit(tasks, algorithm);
  };

  // For heading: show which algorithm WILL be used based on current tasks
  let currentAlgorithmText = "Preemptive Priority Scheduling";
  if (tasks.length > 0) {
    const firstPriority = tasks[0].priority;
    const allSamePriority = tasks.every(
      (t) => String(t.priority) === String(firstPriority)
    );
    currentAlgorithmText = allSamePriority
      ? "SRTF (Shortest Remaining Job First) (all priorities same)"
      : "Preemptive Priority Scheduling (priorities differ)";
  }

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      {/* Form Section */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full lg:w-1/3 mb-6 lg:mb-0 lg:mr-6 transition transform hover:scale-[1.02]">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          🚀 Mars Robot Task Scheduler
        </h1>
        {/* 👉 New heading showing algorithm */}
        <p className="text-center text-sm text-gray-600 mb-4">
          Algorithm to be used: <b>{currentAlgorithmText}</b>
        </p>

        <form className="space-y-5">
          {/* Task Name */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Select Task
            </label>
            <select
              value={taskName}
              onChange={handleTaskChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">-- Choose a Task --</option>
              {Object.keys(taskBurstMap).map((task) => (
                <option key={task} value={task}>
                  {task}
                </option>
              ))}
            </select>
          </div>

          {/* Arrival Time */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Arrival Time (sec)
            </label>
            <input
              type="number"
              min="0"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter arrival time"
            />
          </div>

          {/* Burst Time */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Burst Time (auto)
            </label>
            <input
              type="number"
              value={burstTime}
              readOnly
              className="w-full p-3 border border-gray-200 bg-gray-100 rounded-xl"
              placeholder="Auto based on task"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Priority (auto)
            </label>
            <input
              type="number"
              value={priority}
              readOnly
              className="w-full p-3 border border-gray-200 bg-gray-100 rounded-xl"
              placeholder="Auto based on task"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              onClick={handleAddTask}
              type="button"
              className="flex-1 bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition font-semibold"
            >
              ➕ Add Task
            </button>
            <button
              onClick={handleComplete}
              type="button"
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-semibold"
            >
              ✅ Complete
            </button>
          </div>
        </form>
      </div>

      {/* Task List Table */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full lg:w-2/3 overflow-x-auto transition transform hover:scale-[1.01]">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          📋 Added Tasks
        </h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks added yet.</p>
        ) : (
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-indigo-100 text-gray-800">
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Task Name</th>
                <th className="py-2 px-4 border-b">Arrival Time</th>
                <th className="py-2 px-4 border-b">Burst Time</th>
                <th className="py-2 px-4 border-b">Priority</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t, i) => (
                <tr
                  key={i}
                  className="text-center hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2 px-4 border-b">{i + 1}</td>
                  <td className="py-2 px-4 border-b">{t.taskName}</td>
                  <td className="py-2 px-4 border-b">{t.arrivalTime}</td>
                  <td className="py-2 px-4 border-b">{t.burstTime}</td>
                  <td className="py-2 px-4 border-b">{t.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
