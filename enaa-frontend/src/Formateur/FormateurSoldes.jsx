import React from 'react';
import { Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

export default function FormateurSoldes() {
  const soldes = [
    { title: "Congé Annuel", total: 22, used: 8, remaining: 14, color: "bg-violet-600", text: "text-violet-600" },
    { title: "Congé Exceptionnel", total: 10, used: 2, remaining: 8, color: "bg-blue-600", text: "text-blue-600" },
    { title: "Congé Maladie", total: 15, used: 0, remaining: 15, color: "bg-emerald-600", text: "text-emerald-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Mes Soldes de Congés</h1>
        <p className="text-xs text-slate-500">Aperçu détaillé de vos droits et jours restants pour l'année en cours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {soldes.map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 text-xs">{s.title}</span>
              <Clock className={`w-4 h-4 ${s.text}`} />
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-extrabold text-slate-900">{s.remaining}</span>
                <span className="text-[11px] text-slate-400">sur {s.total} jours</span>
              </div>
              
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${s.color} rounded-full`} 
                  style={{ width: `${(s.remaining / s.total) * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex justify-between text-[10px] text-slate-500 border-t border-slate-50">
              <span>Consommés: <b>{s.used} j</b></span>
              <span>Restants: <b>{s.remaining} j</b></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}