import React from 'react';
import { Users, UserCheck, FileCheck, Building2, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: "Total Formateurs", value: "48", desc: "+4 ce trimestre", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Total Managers", value: "8", desc: "Tous actifs", icon: UserCheck, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Congés en Attente", value: "5", desc: "Validation finale", icon: FileCheck, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Départements", value: "6", desc: "Structure ENAA", icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Vue d'ensemble RH</h1>
        <p className="text-xs text-slate-500">Statistiques globales et gestion centralisée des ressources humaines.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{s.title}</span>
                <div className={`p-2 rounded-xl ${s.bg} ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}