import React, { useState, useRef } from "react";
import { Send, Calendar, Paperclip, X, FileText } from "lucide-react";;
export default function FormateurNouvelleDemande() {
    const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
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
      <label className="block font-semibold text-slate-700 mb-1">
        Pièce justificative (Optionnel)
      </label>

      {/* Input File Hidden */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
      />

      {/* Custom UI Button */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`flex items-center justify-between p-4 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
          file
            ? "border-violet-300 bg-violet-50/50"
            : "border-slate-200 bg-slate-50 hover:bg-slate-100/50 hover:border-violet-300"
        }`}
      >
        {!file ? (
          <div className="flex items-center gap-2 text-slate-500 mx-auto">
            <Paperclip className="w-4 h-4 text-slate-400" />
            <span>Joindre un document (PDF, PNG, JPG)</span>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-violet-900 overflow-hidden">
              <FileText className="w-4 h-4 shrink-0 text-violet-700" />
              <span className="font-medium text-xs truncate">{file.name}</span>
              <span className="text-[10px] text-slate-400">
                ({(file.size / (1024 * 1024)).toFixed(2)} MB)
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="p-1 hover:bg-violet-100 text-slate-500 hover:text-red-600 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
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