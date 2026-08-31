import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, X, FileText, Loader2 } from "lucide-react";
import axios from "axios";

export default function FormateurNouvelleDemande() {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [file, setFile] = useState(null);
  const [formadata, setformadata] = useState({
    leave_type_id: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [error, seterror] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setloading] = useState(false);
  const [fetchingTypes, setFetchingTypes] = useState(true);

  const fileInputRef = useRef(null);

  // 1. Fetch Leave Types on Component Mount
  useEffect(() => {
  const fetchLeaveTypes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/GetAllleaveType", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      
      setLeaveTypes(response.data);
      if (response.data.length > 0) {
        setformadata((prev) => ({ ...prev, leave_type_id: response.data[0].id }));
      }
    } catch (err) {
      console.error("Error status:", err.response?.status, err.response?.data);
      seterror(err.response?.data?.message || "Impossible de charger les types de congé.");
    } finally {
      setFetchingTypes(false);
    }
  };

  fetchLeaveTypes();
}, []);

  const handleChange = (e) => {
    setformadata({
      ...formadata,
      [e.target.name]: e.target.value,
    });
  };

  // 2. Submit Leave Request with FormData (for file support)
  const handleSubmit = async (e) => {
  e.preventDefault();
  seterror("");
  setSuccess("");
  setloading(true);

  const token = localStorage.getItem("token");

  const data = new FormData();
  data.append("type_conge", formadata.leave_type_id);
  data.append("date_debut", formadata.start_date);
  data.append("date_fin", formadata.end_date);
  if (formadata.reason) {
    data.append("commentaire", formadata.reason);
  }
  if (file) {
    data.append("justificative", file); 
  }

  try {
    await axios.post("http://127.0.0.1:8000/api/leave-requests/submit", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setSuccess("Votre demande de congé a été soumise avec succès!");
    setformadata({
      leave_type_id: leaveTypes[0]?.id || "",
      start_date: "",
      end_date: "",
      reason: "",
    });
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  } catch (err) {
    console.error("Validation:", err.response?.data?.errors);
    if (err.response?.status === 422) {
      const serverErrors = err.response.data.errors;
      const firstError = Object.values(serverErrors)[0][0];
      seterror(`Erreur: ${firstError}`);
    } else {
      seterror(err.response?.data?.message || "Une erreur est survenue lors de l'envoi.");
    }
  } finally {
    setloading(false);
  }
};

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Nouvelle Demande de Congé</h1>
        <p className="text-xs text-slate-500">Remplissez le formulaire ci-dessous pour soumettre votre demande.</p>
      </div>

      {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium">{error}</div>}
      {success && <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-medium">{success}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Type de congé</label>
          {fetchingTypes ? (
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Chargement des types...
            </div>
          ) : (
            <select
              name="leave_type_id"
              value={formadata.leave_type_id}
              onChange={handleChange}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-600 text-xs font-medium text-slate-700"
            >
              {leaveTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Date de début</label>
            <input
              type="date"
              name="start_date"
              value={formadata.start_date}
              onChange={handleChange}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-600 text-xs text-slate-700"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Date de fin</label>
            <input
              type="date"
              name="end_date"
              value={formadata.end_date}
              onChange={handleChange}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-600 text-xs text-slate-700"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Motif / Commentaire</label>
          <textarea
            rows="3"
            name="reason"
            value={formadata.reason}
            onChange={handleChange}
            placeholder="Précisez la raison de votre demande..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-600 text-xs text-slate-700"
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Pièce justificative (Optionnel)</label>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className={`flex items-center justify-between p-4 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
              file ? "border-violet-300 bg-violet-50/50" : "border-slate-200 bg-slate-50 hover:bg-slate-100/50 hover:border-violet-300"
            }`}
          >
            {!file ? (
              <div className="flex items-center gap-2 text-slate-500 mx-auto">
                <Paperclip className="w-4 h-4 text-slate-400" />
                <span className="text-xs">Joindre un document (PDF, PNG, JPG)</span>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-violet-900 overflow-hidden">
                  <FileText className="w-4 h-4 shrink-0 text-violet-700" />
                  <span className="font-medium text-xs truncate">{file.name}</span>
                  <span className="text-[10px] text-slate-400">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-violet-800 hover:bg-violet-900 text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-xs disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Soumettre la demande</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}