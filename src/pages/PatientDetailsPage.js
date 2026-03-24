import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePatients } from "../context/PatientContext";
import PatientCard from "../components/PatientCard";

export default function PatientDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    patients,
    filteredPatients,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    selectedPatient,
    setSelectedPatient,
  } = usePatients();

  useEffect(() => {
    if (id) {
      const p = patients.find((p) => p.id === parseInt(id));
      if (p) setSelectedPatient(p);
    }
  }, [id]);

  if (id && selectedPatient && selectedPatient.id === parseInt(id)) {
    return (
      <PatientProfile
        patient={selectedPatient}
        onBack={() => navigate("/patients")}
      />
    );
  }

  const styles = {
    page: { padding: "24px", maxWidth: "1200px", margin: "0 auto" },
    topBar: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "20px",
      alignItems: "center",
    },
    searchInput: {
      flex: 1,
      minWidth: "200px",
      padding: "10px 16px",
      borderRadius: "8px",
      border: "2px solid #e2e8f0",
      fontSize: "14px",
      outline: "none",
    },
    filterBtn: (active) => ({
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "13px",
      background: active ? "#3182ce" : "#edf2f7",
      color: active ? "white" : "#4a5568",
      transition: "all 0.2s",
    }),
    toggleBtn: (active) => ({
      padding: "8px 12px",
      borderRadius: "8px",
      border: "2px solid #e2e8f0",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: "16px",
      background: active ? "#3182ce" : "white",
      color: active ? "white" : "#4a5568",
      transition: "all 0.2s",
    }),
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "16px",
    },
  };

  return (
    <div style={styles.page} className="fade-in">
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "4px" }}>
          🏥 Patient Management
        </h1>
        <p style={{ color: "#718096" }}>
          {filteredPatients.length} patient
          {filteredPatients.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div style={styles.topBar}>
        <input
          style={styles.searchInput}
          placeholder="🔍 Search by name, condition, or doctor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div style={{ display: "flex", gap: "6px" }}>
          {["All", "Stable", "Critical", "Recovering"].map((s) => (
            <button
              key={s}
              style={styles.filterBtn(filterStatus === s)}
              onClick={() => setFilterStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "4px", marginLeft: "auto" }}>
          <button
            style={styles.toggleBtn(viewMode === "grid")}
            onClick={() => setViewMode("grid")}
            title="Grid View"
          >
            ⊞
          </button>
          <button
            style={styles.toggleBtn(viewMode === "list")}
            onClick={() => setViewMode("list")}
            title="List View"
          >
            ☰
          </button>
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#718096" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
          <p style={{ fontSize: "16px" }}>
            No patients found matching your criteria.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div style={styles.gridContainer}>
          {filteredPatients.map((p) => (
            <PatientCard key={p.id} patient={p} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div>
          {filteredPatients.map((p) => (
            <PatientCard key={p.id} patient={p} viewMode="list" />
          ))}
        </div>
      )}
    </div>
  );
}

function PatientProfile({ patient, onBack }) {
  const statusClass =
    patient.status === "Stable"
      ? "status-stable"
      : patient.status === "Critical"
        ? "status-critical"
        : "status-recovering";
  const vitals = [
    { label: "Blood Pressure", value: "120/80 mmHg", icon: "❤️" },
    { label: "Heart Rate", value: "78 bpm", icon: "💓" },
    { label: "Temperature", value: "98.6°F", icon: "🌡️" },
    { label: "SpO2", value: "98%", icon: "🫁" },
  ];

  return (
    <div
      style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}
      className="fade-in"
    >
      <button
        className="btn btn-outline"
        onClick={onBack}
        style={{ marginBottom: "20px" }}
      >
        ← Back to Patients
      </button>

      <div
        className="card"
        style={{
          marginBottom: "20px",
          background: "linear-gradient(135deg, #1a365d, #2b6cb0)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            {patient.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <h1
              style={{ fontSize: "24px", fontWeight: 800, marginBottom: "6px" }}
            >
              {patient.name}
            </h1>
            <p style={{ opacity: 0.85 }}>
              Age: {patient.age} • {patient.gender} • Blood Group:{" "}
              {patient.bloodGroup}
            </p>
            <p style={{ opacity: 0.75, fontSize: "13px", marginTop: "4px" }}>
              📞 {patient.phone}
            </p>
          </div>
          <span
            className={`status-badge ${statusClass}`}
            style={{ fontSize: "14px", padding: "6px 16px" }}
          >
            {patient.status}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div className="card">
          <h3
            style={{ fontWeight: 700, marginBottom: "14px", fontSize: "16px" }}
          >
            🩺 Medical Info
          </h3>
          {[
            ["Condition", patient.condition],
            ["Attending Doctor", patient.doctor],
            ["Last Visit", patient.lastVisit],
            ["Patient ID", `HC-00${patient.id}`],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #f0f4f8",
              }}
            >
              <span style={{ color: "#718096", fontSize: "13px" }}>{k}</span>
              <span style={{ fontWeight: 600, fontSize: "13px" }}>{v}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <h3
            style={{ fontWeight: 700, marginBottom: "14px", fontSize: "16px" }}
          >
            📊 Current Vitals
          </h3>
          {vitals.map((v) => (
            <div
              key={v.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #f0f4f8",
              }}
            >
              <span style={{ color: "#718096", fontSize: "13px" }}>
                {v.icon} {v.label}
              </span>
              <span style={{ fontWeight: 600, fontSize: "13px" }}>
                {v.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontWeight: 700, marginBottom: "14px", fontSize: "16px" }}>
          📋 Treatment Notes
        </h3>
        <p style={{ color: "#4a5568", lineHeight: "1.7", fontSize: "14px" }}>
          Patient {patient.name} is currently under treatment for{" "}
          {patient.condition}. Regular monitoring is in progress. Prescribed
          medication is being administered as per Dr.{" "}
          {patient.doctor.replace("Dr. ", "")}'s protocol. Next follow-up is
          scheduled in 7 days. Patient is responding{" "}
          {patient.status === "Stable"
            ? "well"
            : patient.status === "Recovering"
              ? "adequately"
              : "with concerns"}{" "}
          to the current treatment plan.
        </p>
      </div>
    </div>
  );
}
