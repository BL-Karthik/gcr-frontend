function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">G</div>
        <div>
          <h2>GCR Reports</h2>
          <p>Classroom Analytics</p>
        </div>
      </div>

      <p className="nav-heading">WORKSPACE</p>

      <nav className="navigation">
        <button
          className={`nav-item ${page === "dashboard" ? "active" : ""}`}
          onClick={() => setPage("dashboard")}
        >
          <span className="nav-icon">▦</span>
          Dashboard
        </button>

        <button
          className={`nav-item ${page === "reports" ? "active" : ""}`}
          onClick={() => setPage("reports")}
        >
          <span className="nav-icon">▤</span>
          Report Generation
        </button>

        <button
          className={`nav-item ${page === "break" ? "active" : ""}`}
          onClick={() => setPage("break")}
        >
          <span className="nav-icon">🎮</span>
          Break Zone
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="status-dot" />
        <div>
          <strong>GCR System</strong>
          <p>Assignment reporting</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;