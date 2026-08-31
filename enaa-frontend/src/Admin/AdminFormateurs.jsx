import React from 'react';
import { Plus, Search, Mail, Building } from 'lucide-react';

export default function AdminFormateurs() {
  const formateurs = [
    { name: "Hassan Ouchtain", email: "h.ouchtain@enaa.ma", dept: "Informatique", status: "Actif" },
    { name: "Amina Alami", email: "a.alami@enaa.ma", dept: "Design / Digital", status: "En congé" },
    { name: "Youssef Benali", email: "y.benali@enaa.ma", dept: "Informatique", status: "Actif" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Gestion des Formateurs</h1>
          <p className="text-xs text-slate-500">Liste des enseignants et gestion de leurs comptes.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl font-semibold text-xs shadow-sm transition-all">
          <Plus className="w-4 h-4" /> Nouveau Formateur
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
          <Search className="w-4 h-4 text-slate-400 ml-2" />
          <input type="text" placeholder="Rechercher un formateur..." className="bg-transparent border-none outline-none text-xs w-full text-slate-700" />
        </div>

        <div className="divide-y divide-slate-100">
          {formateurs.map((f, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-900 font-bold flex items-center justify-center text-xs">
                  {f.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{f.name}</p>
                  <p className="text-slate-400 text-[10px] flex items-center gap-2">
                    <span>{f.email}</span> • <span>{f.dept}</span>
                  </p>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                f.status === 'Actif' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {f.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}