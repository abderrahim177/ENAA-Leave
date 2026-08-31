import React from 'react';
import { Check, X, Calendar, User } from 'lucide-react';

export default function AdminConges() {
  const pendingValidation = [
    { id: 1, name: "Hassan Ouchtain", role: "Formateur", type: "Congé Payé", dates: "20 Sep - 25 Sep", days: "5 jours", managerStatus: "Validé par Manager" },
    { id: 2, name: "Amina Alami", role: "Formatrice", type: "Congé Exceptionnel", dates: "15 Sep - 16 Sep", days: "2 jours", managerStatus: "Validé par Manager" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Validation Finale des Congés</h1>
        <p className="text-xs text-slate-500">Approbation finale des demandes validées au préalable par les managers.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {pendingValidation.map((c) => (
            <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900">{c.name}</p>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">{c.managerStatus}</span>
                </div>
                <p className="text-slate-400 text-[11px] flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> {c.dates} ({c.days}) • <span className="text-indigo-600 font-medium">{c.type}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl font-medium text-xs transition-colors">
                  <X className="w-3.5 h-3.5" /> Refuser
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl font-medium text-xs shadow-sm transition-colors">
                  <Check className="w-3.5 h-3.5" /> Valider définitivement
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}