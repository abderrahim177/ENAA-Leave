import React from 'react';
import { Check, X, Calendar } from 'lucide-react';

export default function ManagerValidation() {
  const requests = [
    { id: 1, name: "Youssef Benali", role: "Formateur PHP", type: "Congé Payé", dates: "12 Sep - 18 Sep", days: "5 jours" },
    { id: 2, name: "Amina Alami", role: "Formatrice React", type: "Congé Maladie", dates: "05 Sep - 06 Sep", days: "2 jours" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Demandes à Valider</h1>
        <p className="text-xs text-slate-500">Examinez et gérez les demandes de congé soumises.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {requests.map((req) => (
            <div key={req.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0">
                  {req.name[0]}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900 text-xs">{req.name}</p>
                    <span className="text-[10px] text-slate-400">• {req.role}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {req.dates}</span>
                    <span className="font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-[10px]">{req.type} ({req.days})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl font-medium transition-colors text-xs">
                  <X className="w-3.5 h-3.5" /> Refuser
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm transition-colors text-xs">
                  <Check className="w-3.5 h-3.5" /> Approuver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}