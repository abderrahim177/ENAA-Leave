import React from 'react';
import { Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function FormateurMesDemandes() {
  const demandes = [
    { id: 1, type: "Congé Payé", dates: "15 Oct - 20 Oct", days: "5 jours", status: "En attente", color: "bg-amber-50 text-amber-600 border-amber-200" },
    { id: 2, type: "Congé Maladie", dates: "02 Sep - 03 Sep", days: "2 jours", status: "Approuvé", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { id: 3, type: "Congé Exceptionnel", dates: "10 Jun - 11 Jun", days: "1 jour", status: "Refusé", color: "bg-red-50 text-red-600 border-red-200" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Mes Demandes</h1>
        <p className="text-xs text-slate-500">Suivi du statut de vos demandes récentes.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {demandes.map((d) => (
            <div key={d.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
              <div className="space-y-1">
                <p className="font-semibold text-slate-900">{d.type}</p>
                <p className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {d.dates} ({d.days})
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold ${d.color}`}>
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}