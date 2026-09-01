import React, { useEffect, useState } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function FormateurMesDemandes() {
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    handelfatchdata();
  }, []);

  const handelfatchdata = async () => {
    setloading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/GetAllRequest', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const resultData = Array.isArray(response.data) ? response.data : response.data.data || [];
      setdata(resultData);
    } catch (err) {
      console.error("Error status:", err.response?.status, err.response?.data);
      seterror(err.response?.data?.message || "Impossible de charger les demandes.");
    } finally {
      setloading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return { label: 'Approuvé', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' };
      case 'rejected':
        return { label: 'Refusé', color: 'bg-red-50 text-red-600 border-red-200' };
      case 'pending_hr':
        return { label: 'En attente RH', color: 'bg-blue-50 text-blue-600 border-blue-200' };
      case 'pending_manager':
      default:
        return { label: 'En attente', color: 'bg-amber-50 text-amber-600 border-amber-200' };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Mes Demandes</h1>
        <p className="text-xs text-slate-500">Suivi du statut de vos demandes récentes.</p>
      </div>

      {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium">{error}</div>}

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center flex items-center justify-center gap-2 text-slate-400 text-xs">
            <Loader2 className="w-4 h-4 animate-spin" /> Chargement de vos demandes...
          </div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            Aucune demande trouvée.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.map((d) => {
              const badge = getStatusBadge(d.status);
              return (
                <div key={d.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900 text-sm">
                      {d.leave_type?.name || d.leave_type?.nom || `Demande #${d.id}`}
                    </p>
                    <p className="text-slate-400 text-xs flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> 
                      {d.start_date} au {d.end_date}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}