import React from 'react';
import { Plus, Shield, UserCheck } from 'lucide-react';

export default function AdminManagers() {
  const managers = [
    { name: "Karim Tazi", email: "k.tazi@enaa.ma", dept: "Département Informatique", teamSize: "12 Formateurs" },
    { name: "Fatima Zahra", email: "f.zahra@enaa.ma", dept: "Département Gestion", teamSize: "8 Formateurs" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Gestion des Managers</h1>
          <p className="text-xs text-slate-500">Supervision des chefs d'équipe et responsables de départements.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl font-semibold text-xs shadow-sm transition-all">
          <Plus className="w-4 h-4" /> Ajouter Manager
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {managers.map((m, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 font-bold flex items-center justify-center">
                {m.name[0]}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{m.name}</h3>
                <p className="text-[11px] text-slate-400">{m.email}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>{m.dept}</span>
              <span className="font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-full text-[10px]">{m.teamSize}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}