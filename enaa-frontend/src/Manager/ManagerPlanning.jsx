import React from 'react';

export default function ManagerPlanning() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Planning de l'Équipe</h1>
        <p className="text-xs text-slate-500">Aperçu du calendrier des absences du mois.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto font-bold text-lg">
          📅
        </div>
        <h3 className="font-semibold text-slate-800 text-sm">Vue Calendrier</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Le composant de planning interactif s'affichera ici pour suivre les présences en temps réel.
        </p>
      </div>
    </div>
  );
}