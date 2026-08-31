import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function FormateurHistorique() {
  const docs = [
    { name: "Certificat Médical - Sep 2026", date: "03/09/2026", type: "PDF" },
    { name: "Justificatif Mariage - Jun 2026", date: "12/06/2026", type: "PNG" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Historique & Justificatifs</h1>
        <p className="text-xs text-slate-500">Archive de vos pièces justificatives et historiques de congés.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 space-y-3">
        {docs.map((doc, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-violet-700" />
              <div>
                <p className="font-semibold text-slate-800">{doc.name}</p>
                <p className="text-slate-400 text-[10px]">Déposé le {doc.date}</p>
              </div>
            </div>
            <button className="p-2 text-slate-600 hover:text-violet-800 hover:bg-violet-50 rounded-lg">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}