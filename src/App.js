import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PatientProvider } from "./context/PatientContext";
import { NotificationProvider } from "./context/NotificationContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AnalyticsPage from "./pages/AnalyticsPage";
import PatientDetailsPage from "./pages/PatientDetailsPage";

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Dashboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <AnalyticsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patients"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <PatientDetailsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patients/:id"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <PatientDetailsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </PatientProvider>
    </AuthProvider>
  );
}
