import React, { useEffect, useState } from 'react';
import { Mail, Loader2, AlertCircle, UserCheck, Clock } from 'lucide-react';
import axios from 'axios';

export default function ManagerTeam() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/MonEquipe', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const resultData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setData(resultData);
    } catch (err) {
      console.error("Error status:", err.response?.status, err.response?.data);
      setError(err.response?.data?.message || "Impossible de charger les données de l'équipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Mon Équipe</h1>
        <p className="text-xs text-slate-500">Liste des membres de votre équipe et leurs soldes de congés.</p>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-medium border border-red-100 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* State Loading */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-center gap-2 text-slate-400 text-xs">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
          <span>Chargement des membres de l'équipe...</span>
        </div>
      ) : data.length === 0 ? (
        /* State Empty Data */
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80 text-slate-400 text-xs space-y-2">
          <UserCheck className="w-8 h-8 mx-auto text-slate-300" />
          <p>Aucun membre trouvé dans votre équipe.</p>
        </div>
      ) : (
        /* Grid Members List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((m, idx) => {
            const name = m.name || m.nom || "Membre";
            const role = m.role || "Formateur";
            const email = m.email || "Non renseigné";
            const status = m.status || "Actif";
            // كايحسب الرصيد على حسب أشنو صيفط ليك الـ Backend
            const balance = m.balance ?? m.solde_conge ?? m.leave_balance ?? "18";

            return (
              <div
                key={m.id || idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 space-y-4 relative"
              >
                {/* Header Card */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center uppercase text-xs shadow-inner">
                      {name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-xs">{name}</h3>
                      <p className="text-[11px] text-slate-400">{role}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                      status === 'Actif' || status === 'active'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {status}
                  </span>
                </div>

                {/* Email Info */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{email}</span>
                </div>

                {/* Balance Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Solde disponible:
                  </span>
                  <span className="font-bold text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded-full text-[11px]">
                    {balance} jours
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}