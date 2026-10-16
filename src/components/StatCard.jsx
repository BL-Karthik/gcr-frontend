function StatCard({ icon, label, value, note, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>
      <p className="stat-label">{label}</p>
      <h3>{value}</h3>
      <p className="stat-note">{note}</p>
    </div>
  );
}

export default StatCard;