import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Auth/login';
import AdminLayout from './Admin/AdminLayout';
import FormateurLayout from './Formateur/FormateurLayout';
import ManagerLayout from './Manager/ManagerLayout';
import ProtectedRoute from './protectedRoute'; 
// manager 
import ManagerDashboard from './Manager/ManagerDashboard';
import ManagerValidation from './Manager/ManagerValidation';
import ManagerTeam from './Manager/ManagerTeam';
import ManagerPlanning from './Manager/ManagerPlanning';
import ManagerSettings from './Manager/ManagerSettings';
// formateur

import FormateurSoldes from './Formateur/FormateurSoldes';
import FormateurNouvelleDemande from './Formateur/FormateurNouvelleDemande';
import FormateurMesDemandes from './Formateur/FormateurMesDemandes';
import FormateurHistorique from './Formateur/FormateurHistorique';
import FormateurProfil from './Formateur/FormateurProfil';
// admin

import AdminDashboard from './Admin/AdminDashboard';
import AdminFormateurs from './Admin/AdminFormateurs';
import AdminManagers from './Admin/AdminManagers';
import AdminConges from './Admin/AdminConges';
import AdminDepartements from './Admin/AdminDepartements';
import AdminSettings from './Admin/AdminSettings';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      <Route path="/login" element={<LoginPage />} />

     <Route element={<ProtectedRoute allowedRoles={['admin_rh']} />}>
        <Route path="/Admin_RH" element={<AdminLayout />}>
          <Route index element={<Navigate to="/Admin_RH/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="formateurs" element={<AdminFormateurs />} />
          <Route path="managers" element={<AdminManagers />} />
          <Route path="conges" element={<AdminConges />} />
          <Route path="departements" element={<AdminDepartements />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* Manager Routes */}
      <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<Navigate to="/manager/dashboard" replace />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="validation" element={<ManagerValidation />} />
          <Route path="team" element={<ManagerTeam />} />
          <Route path="planning" element={<ManagerPlanning />} />
          <Route path="settings" element={<ManagerSettings />} />
        </Route>
      </Route>

      {/* Formateur Routes */}
      <Route element={<ProtectedRoute allowedRoles={['formateur']} />}>
        <Route path="/formateur" element={<FormateurLayout />}>
          <Route index element={<Navigate to="/formateur/soldes" replace />} />
          <Route path="soldes" element={<FormateurSoldes />} />
          <Route path="nouvelle-demande" element={<FormateurNouvelleDemande />} />
          <Route path="mes-demandes" element={<FormateurMesDemandes />} />
          <Route path="historique" element={<FormateurHistorique />} />
          <Route path="profil" element={<FormateurProfil />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}