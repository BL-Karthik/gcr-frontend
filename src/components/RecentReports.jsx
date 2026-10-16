function RecentReports({ reports, onGenerate }) {
  return (
    <section className="panel recent-panel">
      <div className="section-heading">
        <div>
          <h3>Recent Reports</h3>
          <p>Reports generated in this session.</p>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">▤</div>
          <strong>No reports generated yet</strong>
          <p>Your recent reports will appear here.</p>

          <button className="text-button" onClick={onGenerate}>
            Generate your first report →
          </button>
        </div>
      ) : (
        <div className="recent-list">
          {reports.map((item) => (
            <div className="recent-item" key={item.id}>
              <div className="recent-file-icon">▤</div>

              <div className="recent-details">
                <strong>{item.course}</strong>
                <p>
                  {item.week} · {item.generatedAt}
                </p>
              </div>

              <span className="success-tag">Success</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentReports;