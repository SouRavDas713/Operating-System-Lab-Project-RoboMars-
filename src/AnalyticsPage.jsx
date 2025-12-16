import {
  calculateWaitingTime,
  calculateTurnaroundTime,
  calculateAverageWaitingTime,
  calculateAverageTurnaroundTime,
} from "./cpuanalysis";

const AnalyticsPage = ({ tasks, onClose }) => {
  const avgWT = calculateAverageWaitingTime(tasks);
  const avgTAT = calculateAverageTurnaroundTime(tasks);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 
                      w-11/12 md:w-4/5 lg:w-3/4 
                      rounded-2xl shadow-2xl border border-gray-700 p-6 text-white">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">
              📊 CPU Analytics
            </h2>
            <p className="text-sm text-gray-400">
              Raw OS-level scheduling metrics
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-1.5 rounded-lg text-sm"
          >
            ✕ Close
          </button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-950 border border-gray-700 rounded-xl p-4">
            <div className="text-xs uppercase text-gray-400">
              Average Turnaround Time
            </div>
            <div className="text-3xl font-bold text-indigo-300 mt-1">
              {avgTAT === -1 ? "-" : avgTAT.toFixed(2)}
              <span className="text-sm text-gray-400 ml-1">sec</span>
            </div>
          </div>

          <div className="bg-gray-950 border border-gray-700 rounded-xl p-4">
            <div className="text-xs uppercase text-gray-400">
              Average Waiting Time
            </div>
            <div className="text-3xl font-bold text-emerald-300 mt-1">
              {avgWT === -1 ? "-" : avgWT.toFixed(2)}
              <span className="text-sm text-gray-400 ml-1">sec</span>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Task</th>
                <th className="px-4 py-2">Arrival</th>
                <th className="px-4 py-2">Burst</th>
                <th className="px-4 py-2">Turnaround</th>
                <th className="px-4 py-2">Waiting</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((t, i) => (
                <tr
                  key={i}
                  className={`border-t border-gray-700 
                    ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-950"}
                    hover:bg-gray-800 transition`}
                >
                  <td className="px-4 py-2 font-medium text-left">
                    {t.taskName}
                  </td>
                  <td className="px-4 py-2">{t.arrivalTime}</td>
                  <td className="px-4 py-2">{t.burstTime}</td>
                  <td className="px-4 py-2 text-indigo-300 font-semibold">
                    {calculateTurnaroundTime(t)}
                  </td>
                  <td className="px-4 py-2 text-emerald-300 font-semibold">
                    {calculateWaitingTime(t)}
                  </td>
                </tr>
              ))}

              {tasks.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-gray-400 italic"
                  >
                    No tasks completed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER NOTE */}
        <p className="mt-4 text-xs text-gray-400">
          * Turnaround Time = Completion − Arrival  
          | Waiting Time = Turnaround − Burst
        </p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
