// Inside Dashboard.js

import React from "react";
import DashboardTable from "../component/DashboardTable"; // Import DashboardTable

const Dashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <DashboardTable /> {/* Render the DashboardTable component */}
    </div>
  );
};

// Make sure you are exporting the Dashboard component as default
export default Dashboard;
