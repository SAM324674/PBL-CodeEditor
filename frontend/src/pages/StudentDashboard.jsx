import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faBookOpen,
  faFileAlt,
  faCheckCircle,
  faBars,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

// Import sub-components
import DashboardOverview from "../components/DashboardOverview";
import ViewAssignments from "../components/ViewAssignments";
import SubmitAssignment from "../components/SubmitAssignment";
import AssignmentStatus from "../components/AssignmentStatus";

export default function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-r from-[#073b4c] to-[#073b4c] text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#073b4c]">
          <span className="text-2xl font-bold">Student Dashboard</span>
          <button
            className="lg:hidden text-white hover:bg-[#073b4c] p-1 rounded-full"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-[10px] px-4">
          {[
            { name: "Dashboard", icon: faChartBar, id: "dashboard" },
            { name: "View Assignments", icon: faBookOpen, id: "assignments" },
            { name: "Submit Assignment", icon: faFileAlt, id: "submit" },
            { name: "Assignment Status", icon: faCheckCircle, id: "status" },
          ].map((item) => (
            <Link to={`${item.id}`} key={item.id}>
              <button
                className={`w-full flex items-center justify-start p-2 rounded-lg transition-colors duration-150 ${
                  activeTab === item.id
                    ? "bg-[#3a6978]"
                    : "hover:bg-[#29515e]"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-2 h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <button className="lg:hidden text-gray-700" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <h1 className="text-2xl font-semibold">Student Dashboard</h1>
          <div className="relative">
            <button className="text-gray-800 hover:text-gray-900 flex items-center">
              Student Name
              <FontAwesomeIcon
                icon={faChevronDown}
                className="ml-2 h-4 w-4"
              />
            </button>
            {/* Add dropdown if needed */}
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="dashboard" element={<DashboardOverview/>}/>
            <Route path="assignments" element={<ViewAssignments />} />
            <Route path="submit" element={<SubmitAssignment />} />
            <Route path="status" element={<AssignmentStatus />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
