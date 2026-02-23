import React, { createContext, useContext, useState, useCallback } from "react";

const AlertContext = createContext(null);

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used inside AlertProvider");
  return ctx;
}

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({ isOpen: false, message: "", type: "info" });

  const showAlert = useCallback((message, type = "info") => {
    setAlert({ isOpen: true, message: String(message), type });
  }, []);

  const closeAlert = useCallback(() => {
    setAlert((a) => ({ ...a, isOpen: false }));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      <CustomAlert
        isOpen={alert.isOpen}
        message={alert.message}
        type={alert.type}
        onClose={closeAlert}
      />
    </AlertContext.Provider>
  );
}

function CustomAlert({ isOpen, message, type, onClose }) {
  if (!isOpen) return null;

  const styles = {
    success: {
      border: "border-cyan-500/40",
      icon: "✓",
      iconBg: "bg-cyan-500/20 text-cyan-400",
    },
    error: {
      border: "border-red-500/40",
      icon: "!",
      iconBg: "bg-red-500/20 text-red-400",
    },
    info: {
      border: "border-white/20",
      icon: "i",
      iconBg: "bg-white/10 text-slate-300",
    },
  };

  const s = styles[type] || styles.info;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-sm bg-slate-900/95 backdrop-blur-xl border ${s.border} rounded-2xl p-6 shadow-2xl animate-scale-in`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${s.iconBg}`}
          >
            {s.icon}
          </span>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-slate-100 text-sm leading-relaxed">{message}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold transition active:scale-[0.98]"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default CustomAlert;
