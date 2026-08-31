import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  CalendarDays,
  UserCog,
  LogOut,
  Bell,
  Menu,
  X,
  Briefcase,
} from "lucide-react";

export default function ManagerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const managerInfo = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { name: "Tableau de bord", path: "/manager/dashboard", icon: LayoutDashboard },
    { name: "Demandes à Valider", path: "/manager/validation", icon: CheckSquare, badge: "2" },
    { name: "Mon Équipe", path: "/manager/team", icon: Users },
    { name: "Planning de l'Équipe", path: "/manager/planning", icon: CalendarDays },
    { name: "Paramètres", path: "/manager/settings", icon: UserCog, },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 text-slate-800 font-sans flex flex-col text-xs">
      {/* Header */}
      <header className="h-14 bg-white border-b border-slate-200 shrink-0 px-4 flex items-center justify-between shadow-sm z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/manager" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900 tracking-tight">
              ENAA<span className="text-blue-600">Manager</span>{" "}
              <span className="text-[10px] text-slate-400 font-normal ml-1">
                | Management Portal
              </span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white" />
          </button>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center border border-blue-200">
              {managerInfo.nom ? managerInfo.nom[0] : "M"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="font-semibold text-slate-900 text-[11px]">
                {managerInfo.nom || "Responsable"}
              </p>
              <p className="text-[10px] text-slate-400">Chef d'Équipe</p>
            </div>
          </div>
        </div>
      </header>

      {/* Body Container */}
      <div className="flex-1 flex overflow-hidden relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/40 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-20 w-60 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 transition-transform duration-300 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } pt-14 md:pt-0 h-full`}
        >
          <div className="p-3 space-y-4 overflow-y-auto">
            <nav className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Gestion d'Équipe
              </p>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-blue-100 text-blue-800 font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="p-3 border-t border-slate-100 shrink-0">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 h-full">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}