import React, { useState, useEffect } from "react";
import {
  Plus,
  UserCheck,
  X,
  Loader2,
  User,
  Mail,
  Lock,
  Building,
  Pencil,
  Trash2,
} from "lucide-react";
import axios from "axios";

export default function AdminManagers() {
  const [managers, setManagers] = useState([]);
  const [depts, setDepts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editingManager, setEditingManager] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department_id: "",
  });

  useEffect(() => {
    fetchDepartments();
    fetchManagers();
  }, []);

  const fetchDepartments = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/Getdepartments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setDepts(data);
      if (data.length > 0 && !formData.department_id) {
        setFormData((prev) => ({ ...prev, department_id: data[0].id }));
      }
    } catch (err) {
      console.error("Erreur chargement départements:", err);
    }
  };

  const fetchManagers = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/Getmanager", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setManagers(data);
    } catch (err) {
      console.error("Erreur de chargement:", err);
    } finally {
      setLoading(false);
    }
  };

  // Ouvre le modal pour ajouter un manager
  const handleOpenAddModal = () => {
    setEditingManager(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      department_id: depts[0]?.id || "",
    });
    setError("");
    setIsModalOpen(true);
  };

  // Ouvre le modal pour modifier un manager
  const handleEdit = (manager) => {
    setEditingManager(manager);
    setFormData({
      name: manager.name || "",
      email: manager.email || "",
      password: "", // Laisser vide pour conserver le mot de passe actuel si inchangé
      department_id: manager.department_id || manager.department?.id || depts[0]?.id || "",
    });
    setError("");
    setIsModalOpen(true);
  };

  // Supprimer un manager
  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce manager ?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete_manager/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setManagers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Erreur lors de la suppression du manager."
      );
    }
  };

  // Soumission (Ajout ou Modification) avec validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // --- Validation Coté Client ---
    if (!formData.name.trim()) {
      setError("Le nom complet est obligatoire.");
      setSubmitting(false);
      return;
    }

    if (!formData.email.trim()) {
      setError("L'adresse email est obligatoire.");
      setSubmitting(false);
      return;
    }

    if (!editingManager && !formData.password) {
      setError("Le mot de passe est obligatoire pour créer un compte.");
      setSubmitting(false);
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      setSubmitting(false);
      return;
    }

    if (!formData.department_id) {
      setError("Veuillez sélectionner un département.");
      setSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      if (editingManager) {
        // Mode Modification (UPDATE)
        const payload = {
          name: formData.name,
          email: formData.email,
          department_id: formData.department_id,
        };
        if (formData.password) payload.password = formData.password;

        const response = await axios.put(
          `http://127.0.0.1:8000/api/update_manager/${editingManager.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const updatedManager = response.data.user || response.data;
        setManagers((prev) =>
          prev.map((m) => (m.id === editingManager.id ? { ...m, ...updatedManager } : m))
        );
      } else {
        // Mode Ajout (ADD)
        const response = await axios.post(
          "http://127.0.0.1:8000/api/add_manager",
          {
            ...formData,
            role: "manager",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const newManager = response.data.user || response.data;
        setManagers([newManager, ...managers]);
      }

      setIsModalOpen(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        department_id: depts[0]?.id || "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de l'enregistrement des données."
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
            Gestion des Managers
          </h1>
          <p className="text-xs text-slate-500">
            Supervision des chefs d'équipe et responsables de départements.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl font-semibold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Ajouter Manager
        </button>
      </div>

      {/* Managers Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs flex justify-center items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Chargement des
          managers...
        </div>
      ) : managers.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80 text-slate-400 text-xs">
          Aucun manager trouvé.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {managers.map((m, idx) => {
            const formateursCount =
              m.formateurs_count !== undefined
                ? m.formateurs_count
                : m.subordinates_count !== undefined
                  ? m.subordinates_count
                  : Array.isArray(m.formateurs)
                    ? m.formateurs.length
                    : 0;

            const teamText =
              m.teamSize ||
              `${formateursCount} Formateur${formateursCount > 1 ? "s" : ""}`;

            return (
              <div
                key={m.id || idx}
                className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 space-y-3 relative"
              >
                {/* Header Container + Action Buttons */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 font-bold flex items-center justify-center uppercase text-sm shadow-inner">
                      {m.name ? m.name[0] : "M"}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-xs">
                        {m.name}
                      </h3>
                      <p className="text-[11px] text-slate-400">{m.email}</p>
                    </div>
                  </div>

                  {/* Action Buttons (Edit & Delete) */}
                  <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(m)}
                      title="Modifier"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      title="Supprimer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    {m.department?.name ||
                      m.department_name ||
                      "Département Général"}
                  </span>
                  <span className="font-bold text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded-full text-[10px]">
                    {teamText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Ajout / Modification Manager */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm">
                {editingManager
                  ? "Modifier le Manager"
                  : "Nouveau Responsable / Manager"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs">
                  {error}
                </div>
              )}

              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">
                  Nom Complet *
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 absolute left-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="ex: Karim Tazi"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">
                  Adresse Email Pro *
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 absolute left-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="k.tazi@enaa.ma"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">
                  Mot de passe {editingManager ? "(Laisser vide si inchangé)" : "*"}
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-3 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Department Selection */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">
                  Département Attribué *
                </label>
                <div className="relative flex items-center">
                  <Building className="w-4 h-4 absolute left-3 text-slate-400" />
                  <select
                    required
                    value={formData.department_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        department_id: e.target.value,
                      })
                    }
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition"
                  >
                    <option value="">Sélectionner un département</option>
                    {depts.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Actions */}
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
                  {editingManager ? "Mettre à jour" : "Créer le compte Manager"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}