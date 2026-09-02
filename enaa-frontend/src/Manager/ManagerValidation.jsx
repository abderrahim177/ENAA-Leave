import React, { useState, useEffect } from 'react';
import { Check, X, Calendar, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function ManagerValidation() {
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [data, setdata] = useState([]);

  useEffect(() => {
    handelfatchdata();
  }, []);

  const handelfatchdata = async () => {
    setloading(true);
    seterror('');
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getAllRequestsForAdmin', {
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

  const handleStatusChange = async (requestId, status) => {
    setActionLoading(requestId);
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/updateRequestStatus/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
      setdata((prevData) => prevData.filter((req) => req.id !== requestId));
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la mise à jour du statut.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Demandes à Valider</h1>
        <p className="text-xs text-slate-500">Examinez et gérez les demandes de congé soumises.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center flex items-center justify-center gap-2 text-slate-400 text-xs">
            <Loader2 className="w-5 h-5 animate-spin text-slate-600" /> Chargement des demandes...
          </div>
        ) : data.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            Aucune demande en attente de validation.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.map((req) => {
              const userName = req.user?.name || req.user?.nom || "Utilisateur";
              const userRole = req.user?.role || "Formateur";
              const typeName = req.leave_type?.name || req.leave_type?.nom || "Congé";

              return (
                <div key={req.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 text-sm uppercase">
                      {userName[0]}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900 text-xs">{userName}</p>
                        <span className="text-[10px] text-slate-400">• {userRole}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {req.start_date} au {req.end_date}
                        </span>
                        <span className="font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-[10px]">
                          {typeName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      disabled={actionLoading === req.id}
                      onClick={() => handleStatusChange(req.id, 'rejected')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl font-medium transition-colors text-xs disabled:opacity-50"
                    >
                      <X className="w-3.5 h-3.5" /> Refuser
                    </button>
                    <button
                      disabled={actionLoading === req.id}
                      onClick={() => handleStatusChange(req.id, 'approved')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm transition-colors text-xs disabled:opacity-50"
                    >
                      {actionLoading === req.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      Approuver
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}