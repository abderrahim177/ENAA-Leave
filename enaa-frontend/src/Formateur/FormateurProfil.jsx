import React from 'react';
import { User, Mail, Shield, Building } from 'lucide-react';

export default function FormateurProfil() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Mon Profil</h1>
        <p className="text-xs text-slate-500">Informations personnelles et compte utilisateur.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-800 font-bold text-lg flex items-center justify-center">
            {user.nom ? user.nom[0] : "F"}
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{user.nom || "Formateur"}</h3>
            <p className="text-slate-400">Enseignant / Formateur ENAA</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-slate-600">
            <Mail className="w-4 h-4 text-violet-600" />
            <span>{user.email || "formateur@enaa.ma"}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <Shield className="w-4 h-4 text-violet-600" />
            <span className="capitalize">Rôle: {user.role || "Formateur"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}