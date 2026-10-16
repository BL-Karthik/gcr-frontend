
import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/TopBar";
import Dashboard from "./components/Dashboard";
import ReportGeneration from "./components/ReportGeneration";
import BreakZone from "./components/BreakZone";

import { getReports } from "./services/api";

function App() {
  const [page, setPage] = useState("dashboard");

  const [batch, setBatch] = useState("");
  const [startWeek, setStartWeek] = useState("");
  const [endWeek, setEndWeek] = useState("");

  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [recentReports, setRecentReports] = useState([]);

  const dashboardStats = {
    totalCourses: 80,
    totalWeeks: 12,
    b1Courses: 40,
    b2Courses: 40,
  };

  const handleGenerate = async () => {
    if (!batch || !startWeek || !endWeek) {
      setError("Please select a batch, start week, and end week.");
      return;
    }

    if (Number(endWeek) < Number(startWeek)) {
      setError("End week cannot be earlier than start week.");
      return;
    }

    // Reset the previous report and errors.
    setReport(null);
    setError("");

    // Open Break Zone immediately.
    // The timer and games appear while the API is working.
    setPage("break");
    setLoading(true);

    try {
      const data = await getReports(batch, startWeek, endWeek);

      setReport(data);

      setRecentReports((previous) => [
        {
          id: `${Date.now()}-${batch}`,
          course: batch,
          week: `Weeks ${startWeek}-${endWeek}`,
          generatedAt: new Date().toLocaleTimeString(),
        },
        ...previous,
      ].slice(0, 5));
    } catch (err) {
      console.error("Unable to generate report:", err);
      setError(
        err.message || "Unable to generate report. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const openReportGeneration = () => {
    setError("");
    setPage("reports");
  };

  return (
    <div className="gcr-layout">
      <Sidebar page={page} setPage={setPage} />

      <main className="main-content">
        <Topbar page={page} />

        {page === "dashboard" && (
          <Dashboard
            stats={dashboardStats}
            coursesLoading={false}
            onGenerate={openReportGeneration}
            recentReports={recentReports}
          />
        )}

        {page === "reports" && (
          <ReportGeneration
            batch={batch}
            setBatch={setBatch}
            startWeek={startWeek}
            setStartWeek={setStartWeek}
            endWeek={endWeek}
            setEndWeek={setEndWeek}
            coursesLoading={false}
            loading={loading}
            error={error}
            report={report}
            onGenerate={handleGenerate}
          />
        )}

        {page === "break" && (
          <BreakZone
            loading={loading}
            report={report}
            error={error}
          />
        )}
      </main>
    </div>
  );
}

export default App;
