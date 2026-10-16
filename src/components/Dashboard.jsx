import StatCard from "./StatCard";
import RecentReports from "./RecentReports";
import ComparisonBar from "./ComparisonBar";
function Dashboard({
  stats,
  coursesLoading,
  onGenerate,
  recentReports,
}) {
  return (
    <section className="page-content">
      <div className="welcome-section">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h2>Google Classroom Reports</h2>
          <p>
            Monitor courses and generate assignment reports
            from one place.
          </p>
        </div>

        <button className="primary-button" onClick={onGenerate}>
          + Generate Report
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          icon="▤"
          label="Courses Tracked"
          value={coursesLoading ? "..." : stats.totalCourses}
          note="Courses returned by the API"
          color="blue"
        />

        <StatCard
          icon="◉"
          label="Weeks Available"
          value={coursesLoading ? "..." : stats.totalWeeks}
          note="Available reporting weeks"
          color="purple"
        />

        <StatCard
          icon="B1"
          label="B1 Courses"
          value={coursesLoading ? "..." : stats.b1Courses}
          note="Course names starting with B1"
          color="teal"
        />

        <StatCard
          icon="B2"
          label="B2 Courses"
          value={coursesLoading ? "..." : stats.b2Courses}
          note="Course names starting with B2"
          color="orange"
        />
      </div>

      <section className="panel comparison-panel">
        <div className="section-heading">
          <div>
            <h3>B1 vs B2 Overview</h3>
            <p>Compare the number of courses in each group.</p>
          </div>
          <span className="subtle-tag">Course count</span>
        </div>

        {coursesLoading ? (
          <p className="muted-text">Loading course data...</p>
        ) : (
          <div className="comparison-list">
            <ComparisonBar
              label="B1"
              count={stats.b1Courses}
              total={stats.totalCourses}
              color="b1"
            />
            <ComparisonBar
              label="B2"
              count={stats.b2Courses}
              total={stats.totalCourses}
              color="b2"
            />
          </div>
        )}
      </section>

      <div className="bottom-grid">
        <section className="panel quick-panel">
          <div className="section-heading">
            <div>
              <h3>Quick Actions</h3>
              <p>Start your next reporting task.</p>
            </div>
          </div>

          <button className="quick-action" onClick={onGenerate}>
            <div className="quick-icon">▤</div>
            <div>
              <strong>Generate a report</strong>
              <p>Select a course and week to view results.</p>
            </div>
            <span className="arrow">→</span>
          </button>
        </section>

        <RecentReports
          reports={recentReports}
          onGenerate={onGenerate}
        />
      </div>
    </section>
  );
}

export default Dashboard;