// Presentational wrapper for one form field: label, the control itself
// (passed as children), and an inline error message. Keeping this here
// lets ContributeForm stay short and keeps the error styling in one place.
const styles = {
  field: { marginBottom: 18 },
  label: {
    display: "block",
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    color: "#8C715A",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: 700,
    margin: "0 0 6px",
  },
  error: {
    margin: "6px 0 0",
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 13,
    color: "#8B4513",
  },
};

export default function ContributeField({ id, label, error, children }) {
  return (
    <div style={styles.field}>
      <label htmlFor={id} style={styles.label}>
        {label}
      </label>
      {children}
      {error ? <p style={styles.error} role="alert">{error}</p> : null}
    </div>
  );
}
