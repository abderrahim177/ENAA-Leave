import React from 'react';
import { Building2, Users } from 'lucide-react';

export default function AdminDepartements() {
  const depts = [
    { name: "Département Informatique & Digital", manager: "Karim Tazi", count: "24 Formateurs" },
    { name: "Département Management & Gestion", manager: "Fatima Zahra", count: "14 Formateurs" },
    { name: "Département Langues & Communication", manager: "Rachid Amrani", count: "10 Formateurs" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Structure & Départements</h1>
        <p className="text-xs text-slate-500">Organisation des pôles d'enseignement de l'établissement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {depts.map((d, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-900 rounded-xl w-fit">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xs">{d.name}</h3>
              <p className="text-slate-400 text-[10px] mt-1">Chef: <span className="text-slate-700 font-medium">{d.manager}</span></p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span>Effectif:</span>
              <span className="font-bold text-slate-800">{d.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}