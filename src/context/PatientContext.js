import { createContext, useContext, useState, useCallback } from "react";

const PatientContext = createContext();

const MOCK_PATIENTS = [
  {
    id: 1,
    name: "Arjun Sharma",
    age: 45,
    gender: "Male",
    condition: "Hypertension",
    status: "Stable",
    doctor: "Dr. Priya Mehta",
    lastVisit: "2026-03-10",
    bloodGroup: "O+",
    phone: "+91-9876543210",
    avatar: "AS",
  },
  {
    id: 2,
    name: "Priya Nair",
    age: 32,
    gender: "Female",
    condition: "Diabetes Type 2",
    status: "Critical",
    doctor: "Dr. Rohan Desai",
    lastVisit: "2026-03-18",
    bloodGroup: "A+",
    phone: "+91-9823456789",
    avatar: "PN",
  },
  {
    id: 3,
    name: "Mohammed Rafiq",
    age: 60,
    gender: "Male",
    condition: "Cardiac Arrest",
    status: "Recovering",
    doctor: "Dr. Anita Kapoor",
    lastVisit: "2026-03-15",
    bloodGroup: "B-",
    phone: "+91-9765432187",
    avatar: "MR",
  },
  {
    id: 4,
    name: "Sunita Reddy",
    age: 28,
    gender: "Female",
    condition: "Asthma",
    status: "Stable",
    doctor: "Dr. Priya Mehta",
    lastVisit: "2026-03-20",
    bloodGroup: "AB+",
    phone: "+91-9812345678",
    avatar: "SR",
  },
  {
    id: 5,
    name: "Vikram Joshi",
    age: 52,
    gender: "Male",
    condition: "Kidney Disease",
    status: "Critical",
    doctor: "Dr. Rohan Desai",
    lastVisit: "2026-03-12",
    bloodGroup: "O-",
    phone: "+91-9834567890",
    avatar: "VJ",
  },
  {
    id: 6,
    name: "Deepa Iyer",
    age: 38,
    gender: "Female",
    condition: "Migraine",
    status: "Stable",
    doctor: "Dr. Anita Kapoor",
    lastVisit: "2026-03-22",
    bloodGroup: "A-",
    phone: "+91-9878901234",
    avatar: "DI",
  },
  {
    id: 7,
    name: "Rahul Gupta",
    age: 41,
    gender: "Male",
    condition: "Arthritis",
    status: "Recovering",
    doctor: "Dr. Priya Mehta",
    lastVisit: "2026-03-08",
    bloodGroup: "B+",
    phone: "+91-9901234567",
    avatar: "RG",
  },
  {
    id: 8,
    name: "Kavya Pillai",
    age: 55,
    gender: "Female",
    condition: "Thyroid",
    status: "Stable",
    doctor: "Dr. Rohan Desai",
    lastVisit: "2026-03-19",
    bloodGroup: "O+",
    phone: "+91-9856789012",
    avatar: "KP",
  },
];

export function PatientProvider({ children }) {
  const [patients] = useState(MOCK_PATIENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = useCallback(() => {
    return patients.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.doctor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "All" || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [patients, searchQuery, filterStatus]);

  return (
    <PatientContext.Provider
      value={{
        patients,
        filteredPatients: filteredPatients(),
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        viewMode,
        setViewMode,
        selectedPatient,
        setSelectedPatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export const usePatients = () => useContext(PatientContext);
