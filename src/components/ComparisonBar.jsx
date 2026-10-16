function ComparisonBar({ label, count, total, color }) {
  const percentage =
    total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="comparison-row">
      <div className="comparison-label">
        <strong>{label}</strong>
        <span>{count} courses</span>
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="comparison-percentage">
        {percentage}%
      </span>
    </div>
  );
}

export default ComparisonBar;