# 🚀 RoboMars – Mars Rover Task Simulation

A simulation project demonstrating how a Mars rover’s onboard CPU schedules and executes mission tasks using a **Priority-Based Round Robin** algorithm, with an automatic fallback to **Shortest Job First (SJF)** when all tasks share the same priority.

This system displays CPU task execution, remaining burst time, and performance analytics using a real-time Gantt chart and interactive UI.

---

## 🌌 Project Overview

During a Mars mission, a rover performs tasks like:

- Soil sampling
- Capturing images
- Obstacle avoidance
- Data transmission

Because the rover’s CPU can execute **only one task at a time**, it must choose which task runs next based on:

- **Priority**
- **Arrival time**
- **Remaining burst time**

RoboMars simulates this decision-making process and visualizes the entire execution flow.

---

## 🎯 Objectives

- Implement CPU scheduling using **Priority-Based Round Robin**
- Automatically switch to **Shortest Job First (SJF)** when all tasks have identical priority
- Provide real-time visualization:
  - Gantt chart
  - Remaining burst time updates
- Display:
  - Waiting time
  - Turnaround time
- Create a clean, user-friendly, interactive interface

---

## 🧠 How It Works

### **1. Input Phase**
Users enter:

- Task name  
- Priority  
- Arrival time  
- Burst time  

These tasks are added to the **ready queue**.

---

### **2. Scheduling Algorithm**

### 🔸 Priority-Based Round Robin (Main Algorithm)
- Highest priority tasks run first  
- Tasks with equal priority follow **Round Robin** with a time quantum  
- Preemption occurs if a higher-priority task arrives  
- Tasks whose time slice expires return to the queue  

---

### 📌 Special Rule: When All Priorities Are the Same  
If all tasks share the same priority, RoboMars switches to:

## ➡️ **Shortest Job First (SJF)**  
- Tasks are sorted by **burst time**  
- Shortest job runs first  
- Ensures maximum efficiency when priority doesn't matter  

---

## 🎨 Visualization Features

- Real-time **Gantt Chart**
- Remaining burst time display
- CPU execution order highlighting
- Analytics summary:
  - Average waiting time
  - Average turnaround time

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React.js |
| **Styling** | Tailwind CSS |
| **Logic & Simulation** | JavaScript (useState, useEffect) |
| **Visualization** | Custom Gantt Chart |
| **Deployment** | Netlify / Vercel |

---

## 📁 Suggested Project Structure

```
root/
├── src/
│   ├── components/
│   │   ├── TaskForm.jsx
│   │   ├── GanttChart.jsx
│   │   ├── TaskTable.jsx
│   │   ├── ResultsPanel.jsx
│   ├── utils/
│   │   ├── scheduler.js
│   │   ├── priorityRoundRobin.js
│   ├── App.jsx
│   ├── index.js
├── public/
├── README.md
├── package.json
└── tailwind.config.js
```

---

## ▶️ How to Run the Project

### **1. Clone the repository**
```bash
git clone https://github.com/<your-repo-name>.git
cd <your-repo-name>
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Start the development server**
```bash
npm start
```

### **4. Build for production**
```bash
npm run build
```

---

## 👨‍🚀 Team Members

- **Sourav Das** – C231055  
- **Mohammad Ahnaf Sanjim** – C231069  
- **Md. Tanbir Hossain Shehab** – C231071  
- **Syed Joy Newaj Nabil** – C231075  

---

## 🧪 Future Improvements

- Multi-core task simulation  
- Additional scheduling algorithms (FCFS, Preemptive Priority, etc.)  
- Exportable analytics report  
- Real rover task profile integration  

---

