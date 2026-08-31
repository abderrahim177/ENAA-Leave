import React, { useState } from 'react';
import { Send, Calendar, Paperclip } from 'lucide-react';

export default function FormateurNouvelleDemande() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Nouvelle Demande de Congé</h1>
        <p className="text-xs text-slate-500">Remplissez le formulaire ci-dessous pour soumettre votre demande.</p>
      </div>

      <form className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Type de congé</label>
          <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-600">
            <option>Congé Payé Annuel</option>
            <option>Congé Exceptionnel (Mariage, Naissance...)</option>
            <option>Congé Maladie</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Date de début</label>
            <input type="date" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-600" />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Date de fin</label>
            <input type="date" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-600" />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Motif / Commentaire</label>
          <textarea rows="3" placeholder="Précisez la raison de votre demande..." className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-600"></textarea>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Pièce justificative (Optionnel)</label>
          <div className="flex items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 cursor-pointer hover:bg-slate-100/50">
            <div className="flex items-center gap-2 text-slate-500">
              <Paperclip className="w-4 h-4" />
              <span>Joindre un document (PDF, PNG, JPG)</span>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full py-3 bg-violet-800 hover:bg-violet-900 text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
          <Send className="w-4 h-4" />
          <span>Soumettre la demande</span>
        </button>
      </form>
    </div>
  );
}