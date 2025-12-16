// cpuAnalytics.js
// Pure CPU Scheduling Analytics (OS style)

export function calculateWaitingTime(task) {
  if (task.completionTime === null) return -1;
  return task.completionTime - task.arrivalTime - task.burstTime;
}

export function calculateTurnaroundTime(task) {
  if (task.completionTime === null) return -1;
  return task.completionTime - task.arrivalTime;
}

export function calculateAverageWaitingTime(tasks) {
  let sum = 0;
  let count = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completionTime !== null) {
      sum += calculateWaitingTime(tasks[i]); // ✅ FIX
      count++;
    }
  }

  return count === 0 ? -1 : sum / count;
}

export function calculateAverageTurnaroundTime(tasks) {
  let sum = 0;
  let count = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completionTime !== null) {
      sum += calculateTurnaroundTime(tasks[i]); // ✅ FIX
      count++;
    }
  }

  return count === 0 ? -1 : sum / count;
}
