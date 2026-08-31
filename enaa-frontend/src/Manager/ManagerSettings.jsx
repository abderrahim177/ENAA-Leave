import React from 'react';

export default function ManagerSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-xs text-slate-500">Configuration des préférences et notifications de validation.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <p className="font-semibold text-slate-800 text-xs">Notifications par Email</p>
            <p className="text-[11px] text-slate-400">Recevoir un e-mail à chaque nouvelle demande soumise</p>
          </div>
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 rounded cursor-pointer" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800 text-xs">Validation Automatique</p>
            <p className="text-[11px] text-slate-400">Approuver automatiquement les demandes inférieures à 1 jour</p>
          </div>
          <input type="checkbox" className="w-4 h-4 accent-blue-600 rounded cursor-pointer" />
        </div>
      </div>
    </div>
  );
}