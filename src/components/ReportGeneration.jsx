
function ReportGeneration({
  batch,
  setBatch,
  startWeek,
  setStartWeek,
  endWeek,
  setEndWeek,
  coursesLoading,
  loading,
  error,
  report,
  onGenerate,
}) {
  const totalWeeks = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ];

  return (
    <section className="page-content">
      <div className="welcome-section">
        <div>
          <p className="eyebrow">REPORTING WORKSPACE</p>
          <h2>Generate Assignment Report</h2>
          <p>Choose a batch and week range to generate your report.</p>
        </div>
      </div>

      <section className="panel filter-panel">
        <div className="section-heading">
          <div>
            <h3>Report Filters</h3>
            <p>Select the reporting criteria below.</p>
          </div>
        </div>

        <div className="filter-grid">
          <div className="filter-item">
            <label htmlFor="course-select">Course / Batch</label>

            <select
              id="course-select"
              value={batch}
              onChange={(event) => setBatch(event.target.value)}
              disabled={coursesLoading || loading}
            >
              <option value="">Select Batch</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="start-week">Start Week</label>

            <select
              id="start-week"
              value={startWeek}
              onChange={(event) => setStartWeek(event.target.value)}
              disabled={loading}
            >
              <option value="">Select Start Week</option>

              {totalWeeks.map((week) => (
                <option key={week} value={week}>
                  Week {week}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="end-week">End Week</label>

            <select
              id="end-week"
              value={endWeek}
              onChange={(event) => setEndWeek(event.target.value)}
              disabled={loading}
            >
              <option value="">Select End Week</option>

              {totalWeeks.map((week) => (
                <option key={week} value={week}>
                  Week {week}
                </option>
              ))}
            </select>
          </div>

          <button
            className="primary-button generate-button"
            onClick={onGenerate}
            disabled={loading || coursesLoading}
          >
            {loading ? "Generating..." : "Generate Report →"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </section>

      {loading && (
        <div className="panel loading-state">
          <div className="spinner" />
          <p>Generating your Google Sheet report...</p>
        </div>
      )}

      {!loading && report && (
        <div className="report-results">
          {report.success_flag ? (
            <div className="panel report-success">
              <div className="results-heading">
                <div>
                  <p className="eyebrow">GENERATED REPORT</p>
                  <h3>{report.message}</h3>
                  <p>
                    {report.batch} · Weeks {report.start_week}–
                    {report.end_week}
                  </p>
                </div>

                <span className="success-tag">Success</span>
              </div>

              <div className="report-stats">
                <div className="report-stat">
                  <p>Total Courses</p>
                  <h2>{report.total_courses}</h2>
                </div>

                <div className="report-stat">
                  <p>Total Students</p>
                  <h2>
                    {Number(report.total_students).toLocaleString()}
                  </h2>
                </div>
              </div>

              <div className="report-details">
                <p>
                  <strong>Report Name:</strong> {report.report_name}
                </p>

                <p>
                  <strong>Sheets Created:</strong>{" "}
                  {report.tabs?.length ?? 0}
                </p>
              </div>

              {report.report_url && (
                <a
                  href={report.report_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button"
                >
                  Open Google Sheet →
                </a>
              )}
            </div>
          ) : (
            <div className="panel">
              <h3>Report generation unsuccessful</h3>
              <p>
                {report.message || "The report could not be generated."}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default ReportGeneration;
