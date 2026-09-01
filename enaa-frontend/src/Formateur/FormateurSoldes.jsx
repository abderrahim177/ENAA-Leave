import React, { useState, useEffect } from 'react';
import { Clock, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function FormateurSoldes() {
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);

  // ألوان افتراضية للتنسيق حسب ترتيب الأنواع
  const colorsPalette = [
    { color: "bg-violet-600", text: "text-violet-600" },
    { color: "bg-blue-600", text: "text-blue-600" },
    { color: "bg-emerald-600", text: "text-emerald-600" },
    { color: "bg-amber-600", text: "text-amber-600" }
  ];

  useEffect(() => {
    handelfatchdata();
  }, []);

  const handelfatchdata = async () => {
    setloading(true);
    seterror('');
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/GetLeaveType', {
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
      seterror(err.response?.data?.message || "Impossible de charger les soldes de congé.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Mes Soldes de Congés</h1>
        <p className="text-xs text-slate-500">Aperçu détaillé de vos droits et jours restants pour l'année en cours.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100">
          {error}
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center flex items-center justify-center gap-2 text-slate-400 text-xs">
          <Loader2 className="w-5 h-5 animate-spin text-slate-600" /> Chargement de vos soldes...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((item, idx) => {
            const title = item.name || item.nom || item.title || "Congé";
            const total = item.default_quota;
            const used = item.used_days || item.used || 0;
            const remaining = total - used;
            
            const style = colorsPalette[idx % colorsPalette.length];
            const percentage = total > 0 ? Math.min((remaining / total) * 100, 100) : 0;

            return (
              <div key={item.id || idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 text-xs">{title}</span>
                  <Clock className={`w-4 h-4 ${style.text}`} />
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-3xl font-extrabold text-slate-900">{remaining}</span>
                    <span className="text-[11px] text-slate-400">sur {total} jours</span>
                  </div>
                  
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${style.color} rounded-full transition-all duration-300`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between text-[10px] text-slate-500 border-t border-slate-50">
                  <span>Consommés: <b>{used} j</b></span>
                  <span>Restants: <b>{remaining} j</b></span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}