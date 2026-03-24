import { useNavigate } from "react-router-dom";
import { usePatients } from "../context/PatientContext";

const statusClass = (status) => {
  if (status === "Stable") return "status-stable";
  if (status === "Critical") return "status-critical";
  return "status-recovering";
};

export default function PatientCard({ patient, viewMode }) {
  const navigate = useNavigate();
  const { setSelectedPatient } = usePatients();

  const handleClick = () => {
    setSelectedPatient(patient);
    navigate(`/patients/${patient.id}`);
  };

  const avatarColors = [
    "#3182ce",
    "#38a169",
    "#d69e2e",
    "#805ad5",
    "#dd6b20",
    "#e53e3e",
  ];
  const avatarColor = avatarColors[patient.id % avatarColors.length];

  if (viewMode === "list") {
    return (
      <div
        onClick={handleClick}
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          transition: "all 0.2s",
          marginBottom: "8px",
          borderLeft:
            "4px solid " +
            (patient.status === "Critical"
              ? "#e53e3e"
              : patient.status === "Stable"
                ? "#38a169"
                : "#d69e2e"),
        }}
        className="card"
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: avatarColor,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "14px",
            flexShrink: 0,
          }}
        >
          {patient.avatar}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <div style={{ minWidth: "160px" }}>
            <p style={{ fontWeight: 700, fontSize: "15px" }}>{patient.name}</p>
            <p style={{ fontSize: "12px", color: "#718096" }}>
              Age: {patient.age} • {patient.gender}
            </p>
          </div>
          <div style={{ minWidth: "140px" }}>
            <p style={{ fontSize: "13px", color: "#4a5568" }}>
              {patient.condition}
            </p>
            <p style={{ fontSize: "12px", color: "#718096" }}>
              {patient.doctor}
            </p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <span className={`status-badge ${statusClass(patient.status)}`}>
              {patient.status}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="card fade-in"
      style={{ cursor: "pointer" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: avatarColor,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          {patient.avatar}
        </div>
        <span className={`status-badge ${statusClass(patient.status)}`}>
          {patient.status}
        </span>
      </div>
      <h3 style={{ fontWeight: 700, fontSize: "16px", marginBottom: "4px" }}>
        {patient.name}
      </h3>
      <p style={{ color: "#718096", fontSize: "13px", marginBottom: "12px" }}>
        Age: {patient.age} • {patient.gender} • {patient.bloodGroup}
      </p>
      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "12px" }}>
        <p style={{ fontSize: "13px", marginBottom: "4px" }}>
          <span style={{ color: "#718096" }}>Condition: </span>
          <span style={{ fontWeight: 600 }}>{patient.condition}</span>
        </p>
        <p style={{ fontSize: "13px", marginBottom: "4px" }}>
          <span style={{ color: "#718096" }}>Doctor: </span>
          {patient.doctor}
        </p>
        <p style={{ fontSize: "12px", color: "#718096" }}>
          Last visit: {patient.lastVisit}
        </p>
      </div>
    </div>
  );
}
