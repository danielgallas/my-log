import React from "react";
import "./pages.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>My log:</h1>
      <div className="dashboard-item">Date</div>
      <div className="dashboard-item">Subject</div>
    </div>
  );
}

export default Dashboard;
