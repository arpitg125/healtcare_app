import { usePatients } from "../context/PatientContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#3182ce",
  "#38a169",
  "#d69e2e",
  "#e53e3e",
  "#805ad5",
  "#dd6b20",
];

export default function AnalyticsPage() {
  const { patients } = usePatients();

  const conditionData = patients.reduce((acc, p) => {
    const existing = acc.find((x) => x.name === p.condition);
    if (existing) existing.count++;
    else acc.push({ name: p.condition, count: 1 });
    return acc;
  }, []);

  const statusData = [
    {
      name: "Stable",
      value: patients.filter((p) => p.status === "Stable").length,
    },
    {
      name: "Critical",
      value: patients.filter((p) => p.status === "Critical").length,
    },
    {
      name: "Recovering",
      value: patients.filter((p) => p.status === "Recovering").length,
    },
  ];

  const genderData = [
    { name: "Male", value: patients.filter((p) => p.gender === "Male").length },
    {
      name: "Female",
      value: patients.filter((p) => p.gender === "Female").length,
    },
  ];

  const ageGroupData = [
    {
      group: "20-30",
      count: patients.filter((p) => p.age >= 20 && p.age < 30).length,
    },
    {
      group: "30-40",
      count: patients.filter((p) => p.age >= 30 && p.age < 40).length,
    },
    {
      group: "40-50",
      count: patients.filter((p) => p.age >= 40 && p.age < 50).length,
    },
    {
      group: "50-60",
      count: patients.filter((p) => p.age >= 50 && p.age < 60).length,
    },
    { group: "60+", count: patients.filter((p) => p.age >= 60).length },
  ];

  const admissionTrend = [
    { month: "Oct", patients: 12 },
    { month: "Nov", patients: 18 },
    { month: "Dec", patients: 15 },
    { month: "Jan", patients: 22 },
    { month: "Feb", patients: 19 },
    { month: "Mar", patients: patients.length },
  ];

  const styles = {
    page: { padding: "24px", maxWidth: "1200px", margin: "0 auto" },
    header: { marginBottom: "24px" },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
      gap: "20px",
    },
    chartCard: {
      background: "white",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    },
    chartTitle: {
      fontWeight: 700,
      fontSize: "16px",
      marginBottom: "16px",
      color: "#2d3748",
    },
    kpiGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "16px",
      marginBottom: "24px",
    },
  };

  const KPI = ({ label, value, icon, color }) => (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "28px", marginBottom: "8px" }}>{icon}</div>
      <div style={{ fontSize: "26px", fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: "13px", color: "#718096" }}>{label}</div>
    </div>
  );

  return (
    <div style={styles.page} className="fade-in">
      <div style={styles.header}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "4px" }}>
          📊 Analytics Dashboard
        </h1>
        <p style={{ color: "#718096" }}>
          Real-time healthcare insights and statistics
        </p>
      </div>

      <div style={styles.kpiGrid}>
        <KPI
          label="Total Patients"
          value={patients.length}
          icon="👥"
          color="#3182ce"
        />
        <KPI
          label="Avg Age"
          value={Math.round(
            patients.reduce((a, p) => a + p.age, 0) / patients.length,
          )}
          icon="📅"
          color="#805ad5"
        />
        <KPI
          label="Critical Cases"
          value={patients.filter((p) => p.status === "Critical").length}
          icon="🚨"
          color="#e53e3e"
        />
        <KPI label="Recovery Rate" value="75%" icon="📈" color="#38a169" />
      </div>

      <div style={styles.grid}>
        {/* Conditions Bar Chart */}
        <div style={{ ...styles.chartCard, gridColumn: "span 2" }}>
          <h3 style={styles.chartTitle}>Patients by Condition</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={conditionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {conditionData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Patient Status Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={75}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {statusData.map((_, i) => (
                  <Cell key={i} fill={["#38a169", "#e53e3e", "#d69e2e"][i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Admission Trend */}
        <div style={{ ...styles.chartCard, gridColumn: "span 2" }}>
          <h3 style={styles.chartTitle}>
            Patient Admission Trend (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={admissionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#3182ce"
                strokeWidth={3}
                dot={{ fill: "#3182ce", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Age Groups */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Age Group Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ageGroupData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
              <XAxis type="number" />
              <YAxis dataKey="group" type="category" width={45} />
              <Tooltip />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {ageGroupData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Pie */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
              >
                {genderData.map((_, i) => (
                  <Cell key={i} fill={["#3182ce", "#ed64a6"][i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
