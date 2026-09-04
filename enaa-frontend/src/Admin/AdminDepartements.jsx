import React, { useState, useEffect } from "react";
import { Building2, Plus, X, Loader2 } from "lucide-react";
import axios from "axios";

export default function AdminDepartements() {
  const [depts, setDepts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/Getdepartments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepts(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error("Erreur chargement départements:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/departments",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const newDept = response.data.department || response.data;
      setDepts([newDept, ...depts]);

      setIsModalOpen(false);
      setFormData({ name: "" });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la création du département.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Structure & Départements
          </h1>
          <p className="text-xs text-slate-500">
            Organisation des pôles d'enseignement de l'établissement.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl font-semibold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Nouveau Département
        </button>
      </div>
      {loading ? (
  <div className="p-12 text-center text-slate-400 text-xs flex justify-center items-center gap-2">
    <Loader2 className="w-4 h-4 animate-spin" /> Chargement des départements...
  </div>
) : depts.length === 0 ? (
  <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80 text-slate-400 text-xs">
    Aucun département trouvé.
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {depts.map((d, idx) => {
      const manager = d.users?.find(u => u.role === 'manager');

      const formateursCount = d.users?.filter(u => u.role === 'formateur').length || 0;

      return (
        <div key={d.id || idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-900 rounded-xl w-fit">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xs">{d.name}</h3>
            <p className="text-slate-400 text-[10px] mt-1">
              Chef: <span className="text-slate-700 font-medium">
                {manager ? manager.name : 'Non assigné'}
              </span>
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Effectif:</span>
            <span className="font-bold text-slate-800">
              {formateursCount} Formateur(s)
            </span>
          </div>
        </div>
      );
    })}
  </div>
)}

      {/* Modal Ajout Département */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm">
                Ajouter un nouveau Département
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs">
                  {error}
                </div>
              )}

              {/* Department Name Only */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">
                  Nom du Département
                </label>
                <div className="relative flex items-center">
                  <Building2 className="w-4 h-4 absolute left-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="ex: Département Intelligence Artificielle"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl text-xs font-semibold shadow-sm transition disabled:opacity-50"
                >
                  {submitting && (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  )}
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
