import React, { useEffect, useState } from 'react';
import { Check, X, Calendar, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function AdminConges() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [actionLoading, setActionLoading] = useState(null);

  // State للتحكم فـ الـ Modal ديال Refuser
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    handelFetchData();
  }, []);

  const handelFetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/GetConges', {
        headers: { 
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const resultData = Array.isArray(response.data) 
        ? response.data 
        : response.data.data || [];

      setData(resultData);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };


  const handleStatusChange = async (requestId, status) => {
    setActionLoading(requestId);
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/updateRequestStatusAdmin/${requestId}`,
        { status: 'approved' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
      setData((prevData) => prevData.filter((req) => req.id !== requestId));
    } catch (err) {
  console.error(err.response?.data);
  const debugMsg = err.response?.data?.debug_error || err.response?.data?.message;
  alert(debugMsg || "Erreur lors de la mise à jour du statut.");
} finally {
      setActionLoading(null);
    }
  };

  const openRejectModal = (requestId) => {
    setSelectedRequestId(requestId);
    setRejectReason('');
    setShowRejectModal(true);
  };

  const handleConfirmReject = async () => {
    if (!rejectReason.trim()) {
      alert("Veuillez indiquer la raison du refus.");
      return;
    }

    setActionLoading(selectedRequestId);
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/updateRequestStatusAdmin/${selectedRequestId}`,
        { 
          status: 'rejected',
          rejection_reason: rejectReason,
          _method: 'PUT' 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      setData((prevData) => prevData.filter((req) => req.id !== selectedRequestId));
      setShowRejectModal(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur lors du refus de la demande.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Validation Finale des Congés</h1>
        <p className="text-xs text-slate-500">Approbation finale des demandes validées au préalable par les managers.</p>
      </div>

      {loading && <p className="text-xs text-slate-500">Chargement...</p>}
      {error && <p className="text-xs text-rose-500">{error}</p>}

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {data.length > 0 ? (
            data.map((c) => (
              <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900">{c.user?.name || c.name}</p>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                      {c.managerStatus || 'Validé par Manager'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> {c.start_date} - {c.end_date} <span className="text-indigo-600 font-medium">{c.type}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    disabled={actionLoading === c.id}
                    onClick={() => openRejectModal(c.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl font-medium text-xs transition-colors disabled:opacity-50"
                  >
                    <X className="w-3.5 h-3.5" /> Refuser
                  </button>

                  <button 
                    disabled={actionLoading === c.id}
                    onClick={() => handleStatusChange(c.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl font-medium text-xs shadow-sm transition-colors disabled:opacity-50"
                  >
                    <Check className="w-3.5 h-3.5" /> Valider définitivement
                  </button>
                </div>
              </div>
            ))
          ) : (
            !loading && <p className="p-4 text-xs text-slate-400 text-center">Aucune demande en attente.</p>
          )}
        </div>
      </div>

      {/* --- MODAL DIAL REFUSER --- */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-semibold text-sm">Refuser la demande</h3>
            </div>
            
            <p className="text-xs text-slate-500">
              Veuillez indiquer la raison du refus. Cette remarque sera transmise au demandeur.
            </p>

            <textarea
              rows="3"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Ex: Période de forte activité..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
            ></textarea>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmReject}
                disabled={actionLoading !== null}
                className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 disabled:opacity-50"
              >
                Confirmer le refus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}