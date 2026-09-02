import React, { useState, useEffect } from 'react';
import { Plus, Search, X, Loader2, User, Mail, Lock, Building, UserCheck } from 'lucide-react';
import axios from 'axios';

export default function AdminFormateurs() {
  const [formateurs, setFormateurs] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Informatique',
    manager_id: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      // 1. جلب قائمة الـ Formateurs
      const formateursRes = await axios.get('http://127.0.0.1:8000/api/admin/formateurs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormateurs(Array.isArray(formateursRes.data) ? formateursRes.data : formateursRes.data.data || []);

      // 2. جلب قائمة الـ Managers لملء الـ Dropdown (اختياري)
      const managersRes = await axios.get('http://127.0.0.1:8000/api/admin/managers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setManagers(Array.isArray(managersRes.data) ? managersRes.data : managersRes.data.data || []);
    } catch (err) {
      console.error("Erreur de chargement:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admin/add-formateur', {
        ...formData,
        role: 'formateur'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFormateurs([response.data.user || response.data, ...formateurs]);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', password: '', department: 'Informatique', manager_id: '' });
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la création du compte.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredFormateurs = formateurs.filter(f => 
    f.name?.toLowerCase().includes(search.toLowerCase()) ||
    f.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Gestion des Formateurs</h1>
          <p className="text-xs text-slate-500">Liste des enseignants et gestion de leurs comptes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
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
            placeholder="Rechercher un formateur..." 
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
          <div className="divide-y divide-slate-100">
            {filteredFormateurs.map((f, idx) => (
              <div key={f.id || idx} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-900 font-bold flex items-center justify-center text-xs uppercase">
                    {f.name ? f.name[0] : 'F'}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-xs">{f.name}</p>
                    <p className="text-slate-400 text-[10px] flex items-center gap-2">
                      <span>{f.email}</span> • <span>{f.department || 'Informatique'}</span>
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">
                  Actif
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modern & Clean Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm">Ajouter un nouveau Formateur</h3>
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

              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Nom Complet</label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 absolute left-3 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="ex: Youssef Benali"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Adresse Email</label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 absolute left-3 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    placeholder="y.benali@enaa.ma"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Mot de passe</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-3 text-slate-400" />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Department Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">Département</label>
                <div className="relative flex items-center">
                  <Building className="w-4 h-4 absolute left-3 text-slate-400" />
                  <select 
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition"
                  >
                    <option value="Informatique">Informatique</option>
                    <option value="Design / Digital">Design / Digital</option>
                    <option value="Gestion / Commerce">Gestion / Commerce</option>
                  </select>
                </div>
              </div>

              {/* Manager Selection (Optional) */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">
                  Manager Responsable <span className="text-slate-400 font-normal">(Optionnel)</span>
                </label>
                <div className="relative flex items-center">
                  <UserCheck className="w-4 h-4 absolute left-3 text-slate-400" />
                  <select 
                    value={formData.manager_id}
                    onChange={(e) => setFormData({ ...formData, manager_id: e.target.value })}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white transition"
                  >
                    <option value="">Aucun manager (Assigner plus tard)</option>
                    {managers.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
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
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Créer le compte
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}