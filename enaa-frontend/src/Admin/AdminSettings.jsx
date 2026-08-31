import React from 'react';

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Paramètres RH</h1>
        <p className="text-xs text-slate-500">Configuration des règles de solde annuel et flux de validation.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="space-y-1 pb-4 border-b border-slate-100">
          <label className="block font-semibold text-slate-700 text-xs">Solde de congé annuel par défaut (jours)</label>
          <input type="number" defaultValue={22} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-900 text-xs text-slate-800" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="font-semibold text-slate-800 text-xs">Double Validation Obligatoire</p>
            <p className="text-[10px] text-slate-400">Exiger la validation du Manager ET de l'Admin RH</p>
          </div>
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-900 rounded cursor-pointer" />
        </div>
      </div>
    </div>
  );
}