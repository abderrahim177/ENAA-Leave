import React, { useState, useEffect } from 'react';
import { Plus, Search, X, Loader2, User, Mail, Lock, Building, UserCheck, Edit, Trash2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function AdminFormateurs() {
  const [formateurs, setFormateurs] = useState([]);
  const [managers, setManagers] = useState([]);
  const [depts, setDepts] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFormateurId, setSelectedFormateurId] = useState(null);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department_id: '',
    manager_id: ''
  });

  // Validation Errors State
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    fetchManagers();
    fetchFormateur();
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/Getdepartments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setDepts(data);
    } catch (err) {
      console.error("Erreur chargement départements:", err);
    }
  };

  const fetchFormateur = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/Getformateur', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setFormateurs(data);
    } catch (err) {
      console.error("Erreur de chargement:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchManagers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/Getmanager', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setManagers(data);
    } catch (err) {
      console.error("Erreur de chargement managers:", err);
    }
  };

  // Helper handling input changes & validation reset
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Validate Add Form
  const validateAddForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Le nom complet est obligatoire.";
    }
    if (!formData.email.trim()) {
      errors.email = "L'adresse email est obligatoire.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Veuillez entrer un email valide.";
    }
    if (!formData.password) {
      errors.password = "Le mot de passe est obligatoire.";
    } else if (formData.password.length < 8) {
      errors.password = "Le mot de passe doit contenir au moins 8 caractères.";
    }
    if (!formData.department_id) {
      errors.department_id = "Veuillez sélectionner un département.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate Edit Form
  const validateEditForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Le nom complet est obligatoire.";
    }
    if (!formData.email.trim()) {
      errors.email = "L'adresse email est obligatoire.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Veuillez entrer un email valide.";
    }
    if (formData.password && formData.password.length < 8) {
      errors.password = "Le mot de passe doit contenir au moins 8 caractères.";
    }
    if (!formData.department_id) {
      errors.department_id = "Veuillez sélectionner un département.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Create Formateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAddForm()) return;

    setSubmitting(true);
    setError('');
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://127.0.0.1:8000/api/add_formateur', {
        ...formData,
        role: 'formateur'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await fetchFormateur();
      setIsModalOpen(false);
      setFormData({ name: '', email: '', password: '', department_id: '', manager_id: '' });
      setFieldErrors({});
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la création du compte.");
    } finally {
      setSubmitting(false);
    }
  };

  // Open Edit Modal & Populate Form
  const handleEditClick = (formateur) => {
    setSelectedFormateurId(formateur.id);
    setFormData({
      name: formateur.name || '',
      email: formateur.email || '',
      password: '', 
      department_id: formateur.department_id || formateur.department?.id || '',
      manager_id: formateur.manager_id || formateur.manager?.id || ''
    });
    setError('');
    setFieldErrors({});
    setIsEditModalOpen(true);
  };

  // Update Formateur
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateEditForm()) return;

    setSubmitting(true);
    setError('');
    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://127.0.0.1:8000/api/update_formateur/${selectedFormateurId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await fetchFormateur();
      setIsEditModalOpen(false);
      setFormData({ name: '', email: '', password: '', department_id: '', manager_id: '' });
      setFieldErrors({});
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la modification.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Formateur
  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce formateur ?")) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete_formateur/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormateurs(formateurs.filter(f => f.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      alert(err.response?.data?.message || "Impossible de supprimer ce formateur.");
    }
  };

  const filteredFormateurs = formateurs.filter(f => 
    f.name?.toLowerCase().includes(search.toLowerCase()) ||
    f.email?.toLowerCase().includes(search.toLowerCase()) ||
    f.department?.name?.toLowerCase().includes(search.toLowerCase()) ||
    f.manager?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const isAddSubmitDisabled = !formData.name.trim() || !formData.email.trim() || !formData.password || !formData.department_id || submitting;
  const isEditSubmitDisabled = !formData.name.trim() || !formData.email.trim() || !formData.department_id || submitting;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Gestion des Formateurs</h1>
          <p className="text-xs text-slate-500">Liste des enseignants et gestion de leurs comptes.</p>
        </div>
        <button 
          onClick={() => {
            setFormData({ name: '', email: '', password: '', department_id: '', manager_id: '' });
            setError('');
            setFieldErrors({});
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl font-semibold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Nouveau Formateur
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
          <Search className="w-4 h-4 text-slate-400 ml-2" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, email, département ou manager..." 
            className="bg-transparent border-none outline-none text-xs w-full text-slate-700" 
          />
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 text-xs flex justify-center items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Chargement...
          </div>
        ) : filteredFormateurs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">Aucun formateur trouvé.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Formateur</th>
                  <th className="py-3 px-4">Département</th>
                  <th className="py-3 px-4">Manager Responsable</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredFormateurs.map((f, idx) => (
                  <tr key={f.id || idx} className="hover:bg-slate-50/50 transition">
                    {/* User Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-900 font-bold flex items-center justify-center text-xs uppercase flex-shrink-0">
                          {f.name ? f.name[0] : 'F'}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{f.name}</p>
                          <p className="text-slate-400 text-[11px]">{f.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {f.department?.name || f.department_name || (typeof f.department === 'string' ? f.department : 'Non assigné')}
                      </span>
                    </td>

                    {/* Manager */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 text-slate-600 text-[11px] font-medium">
                        <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                        {f.manager?.name || f.manager_name || 'Aucun manager'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 inline-block">
                        Actif
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEditClick(f)}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(f.id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal - Add Formateur */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm">Ajouter un nouveau Formateur</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs">
                  {error}
                </div>
              )}

              {/* Nom Complet */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Nom Complet</label>
                <div className="relative flex items-center">
                  <User className={`w-4 h-4 absolute left-3 ${fieldErrors.name ? 'text-rose-400' : 'text-slate-400'}`} />
                  <input 
                    type="text" 
                    placeholder="ex: Youssef Benali"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border rounded-xl outline-none transition ${
                      fieldErrors.name
                        ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-600 focus:bg-white"
                    }`}
                  />
                </div>
                {fieldErrors.name && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
                    <AlertCircle className="w-3 h-3" /> {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Adresse Email</label>
                <div className="relative flex items-center">
                  <Mail className={`w-4 h-4 absolute left-3 ${fieldErrors.email ? 'text-rose-400' : 'text-slate-400'}`} />
                  <input 
                    type="email" 
                    placeholder="y.benali@enaa.ma"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border rounded-xl outline-none transition ${
                      fieldErrors.email
                        ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-600 focus:bg-white"
                    }`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
                    <AlertCircle className="w-3 h-3" /> {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Mot de passe</label>
                <div className="relative flex items-center">
                  <Lock className={`w-4 h-4 absolute left-3 ${fieldErrors.password ? 'text-rose-400' : 'text-slate-400'}`} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border rounded-xl outline-none transition ${
                      fieldErrors.password
                        ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-600 focus:bg-white"
                    }`}
                  />
                </div>
                {fieldErrors.password && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
                    <AlertCircle className="w-3 h-3" /> {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Department */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Département</label>
                <div className="relative flex items-center">
                  <Building className={`w-4 h-4 absolute left-3 pointer-events-none ${fieldErrors.department_id ? 'text-rose-400' : 'text-slate-400'}`} />
                  <select 
                    value={formData.department_id}
                    onChange={(e) => handleInputChange('department_id', e.target.value)}
                    className={`w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border rounded-xl outline-none transition text-slate-700 ${
                      fieldErrors.department_id
                        ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-600 focus:bg-white"
                    }`}
                  >
                    <option value="">Sélectionner un département</option>
                    {depts.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                {fieldErrors.department_id && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
                    <AlertCircle className="w-3 h-3" /> {fieldErrors.department_id}
                  </p>
                )}
              </div>

              {/* Manager Responsable */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">
                  Manager Responsable <span className="text-slate-400 font-normal">(Optionnel)</span>
                </label>
                <div className="relative flex items-center">
                  <UserCheck className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
                  <select 
                    value={formData.manager_id}
                    onChange={(e) => handleInputChange('manager_id', e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition text-slate-700"
                  >
                    <option value="">Aucun manager (Assigner plus tard)</option>
                    {managers.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  disabled={isAddSubmitDisabled}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isAddSubmitDisabled
                      ? "bg-indigo-300 text-white cursor-not-allowed opacity-60 shadow-none"
                      : "bg-indigo-900 hover:bg-indigo-950 text-white shadow-sm active:scale-95"
                  }`}
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Créer le compte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal - Edit Formateur */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm">Modifier le Formateur</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4" noValidate>
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs">
                  {error}
                </div>
              )}

              {/* Nom Complet */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Nom Complet</label>
                <div className="relative flex items-center">
                  <User className={`w-4 h-4 absolute left-3 ${fieldErrors.name ? 'text-rose-400' : 'text-slate-400'}`} />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border rounded-xl outline-none transition ${
                      fieldErrors.name
                        ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-600 focus:bg-white"
                    }`}
                  />
                </div>
                {fieldErrors.name && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
                    <AlertCircle className="w-3 h-3" /> {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Adresse Email</label>
                <div className="relative flex items-center">
                  <Mail className={`w-4 h-4 absolute left-3 ${fieldErrors.email ? 'text-rose-400' : 'text-slate-400'}`} />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border rounded-xl outline-none transition ${
                      fieldErrors.email
                        ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-600 focus:bg-white"
                    }`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
                    <AlertCircle className="w-3 h-3" /> {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">
                  Nouveau Mot de passe <span className="text-slate-400 font-normal">(Laisser vide si inchangé)</span>
                </label>
                <div className="relative flex items-center">
                  <Lock className={`w-4 h-4 absolute left-3 ${fieldErrors.password ? 'text-rose-400' : 'text-slate-400'}`} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border rounded-xl outline-none transition ${
                      fieldErrors.password
                        ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-600 focus:bg-white"
                    }`}
                  />
                </div>
                {fieldErrors.password && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
                    <AlertCircle className="w-3 h-3" /> {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Department */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Département</label>
                <div className="relative flex items-center">
                  <Building className={`w-4 h-4 absolute left-3 pointer-events-none ${fieldErrors.department_id ? 'text-rose-400' : 'text-slate-400'}`} />
                  <select 
                    value={formData.department_id}
                    onChange={(e) => handleInputChange('department_id', e.target.value)}
                    className={`w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border rounded-xl outline-none transition text-slate-700 ${
                      fieldErrors.department_id
                        ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-600 focus:bg-white"
                    }`}
                  >
                    <option value="">Sélectionner un département</option>
                    {depts.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                {fieldErrors.department_id && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
                    <AlertCircle className="w-3 h-3" /> {fieldErrors.department_id}
                  </p>
                )}
              </div>

              {/* Manager Responsable */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">
                  Manager Responsable <span className="text-slate-400 font-normal">(Optionnel)</span>
                </label>
                <div className="relative flex items-center">
                  <UserCheck className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
                  <select 
                    value={formData.manager_id}
                    onChange={(e) => handleInputChange('manager_id', e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition text-slate-700"
                  >
                    <option value="">Aucun manager</option>
                    {managers.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  disabled={isEditSubmitDisabled}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isEditSubmitDisabled
                      ? "bg-indigo-300 text-white cursor-not-allowed opacity-60 shadow-none"
                      : "bg-indigo-900 hover:bg-indigo-950 text-white shadow-sm active:scale-95"
                  }`}
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}