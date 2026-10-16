function Topbar({ page }) {
  const pageTitle =
    page === "dashboard" ? "Dashboard" : "Report Generation";

  return (
    <header className="topbar">
      <div>
        <p className="breadcrumb">Workspace / GCR</p>
        <h1>{pageTitle}</h1>
      </div>

      <div className="user-profile">
        <div className="avatar">A</div>
        <div>
          <strong>Administrator</strong>
          <p>GCR Workspace</p>
        </div>
      </div>
    </header>
  );
}

export default Topbar;