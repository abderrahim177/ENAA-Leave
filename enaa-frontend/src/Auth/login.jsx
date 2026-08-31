import React, { useState } from 'react';
import { BuildingOffice2Icon, LockClosedIcon, EnvelopeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
export default function LoginPage() {
  const [formadata , setformadata]= useState({email : "",password : "",});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const handleChange = (e) => {
    setformadata({
      ...formadata,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const res = await axios.post('http://127.0.0.1:8000/api/login', {
      email: formadata.email,
      password: formadata.password
    });

    const { user, access_token } = res.data;

    if (access_token && user) {
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      const userRole = user.role?.toLowerCase();

      if (userRole === 'formateur') {
        navigate('/formateur', { replace: true });
      } else if (userRole === 'manager') {
        navigate('/manager', { replace: true });
      } else if (userRole === 'admin_rh') {
        navigate('/Admin_RH', { replace: true });
      } else {
        setError(`Réponse du serveur invalide (Rôle non reconnu: ${userRole}).`);
      }
    } else {
      setError('Erreur: Token introvable');
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError('Invalid login credentials. Please check your information and try again.');
    }
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans">
      
      {/* 1. Left Side - Poster & System Intro (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Soft decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Visual Identity & Brand */}
        <div className="flex items-center gap-3 z-10">
          <div className="p-2.5 bg-blue-600/30 rounded-xl backdrop-blur-md border border-white/10">
            <BuildingOffice2Icon className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-wide">ENAA</h1>
            <p className="text-xs text-blue-200/70">Leave Management Platform</p>
          </div>
        </div>

        {/* Welcome & Descriptive Message */}
        <div className="z-10 space-y-4 max-w-md">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/20">
            HR & Staff Portal
          </span>
          <h2 className="text-4xl font-extrabold leading-tight text-white">
            Transparency and Efficiency in Leave Management
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            A unified and secure system enabling educational staff, managers, and administration to seamlessly track and manage leave balances, compensation, and requests.
          </p>
        </div>

        {/* Left Side Footer */}
        <div className="z-10 text-xs text-slate-400">
          © 2026 ENAA. All rights reserved.
        </div>
      </div>

      {/* 2. Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
          
          {/* Form Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">Sign In</h2>
            <p className="text-sm text-slate-500">Enter your email and password to access your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <EnvelopeIcon className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name='email'
                  value={formadata.email}
                  onChange={handleChange}
                  placeholder="name@enaa.ma"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none text-slate-800"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <LockClosedIcon className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name='password'
                  value={formadata.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none text-slate-800"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* System Roles Footnote */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Restricted access for: <span className="font-semibold text-slate-600">HR Admin</span> • <span className="font-semibold text-slate-600">Manager</span> • <span className="font-semibold text-slate-600">Trainer</span>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}