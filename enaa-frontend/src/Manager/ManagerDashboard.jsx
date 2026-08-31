import React from 'react';
import { Users, Clock, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

export default function ManagerDashboard() {
  const stats = [
    { title: "Effectif Équipe", value: "12", change: "+2 ce mois", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "En Attente", value: "3", change: "Action requise", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Approuvés (Mois)", value: "18", change: "+12%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "En Congé Aujourd'hui", value: "2", change: "Présence 83%", icon: AlertCircle, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-xs text-slate-500">Vue d'ensemble de l'activité et des demandes de votre équipe.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{stat.title}</span>
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}