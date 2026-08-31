import React from 'react';
import { Mail, Phone, MoreVertical } from 'lucide-react';

export default function ManagerTeam() {
  const members = [
    { name: "Youssef Benali", role: "Formateur Full-stack", email: "y.benali@enaa.ma", status: "Actif", balance: "18 jours" },
    { name: "Amina Alami", role: "Formatrice UI/UX", email: "a.alami@enaa.ma", status: "En congé", balance: "12 jours" },
    { name: "Karim Tazi", role: "Formateur DevOps", email: "k.tazi@enaa.ma", status: "Actif", balance: "22 jours" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Mon Équipe</h1>
        <p className="text-xs text-slate-500">Liste des membres et soldes de congés restants.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                  {m.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-xs">{m.name}</h3>
                  <p className="text-[11px] text-slate-400">{m.role}</p>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                m.status === 'Actif' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {m.status}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Solde disponible:</span>
              <span className="font-bold text-slate-800">{m.balance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}