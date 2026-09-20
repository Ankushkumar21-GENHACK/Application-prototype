import { useState } from "react";
import Landing from "./views/Landing";
import LanguageSelect from "./views/LanguageSelect";
import CustomerOnboarding from "./views/CustomerOnboarding";
import WorkerOnboarding from "./views/WorkerOnboarding";
import CustomerApp from "./views/customer/CustomerApp";
import WorkerApp from "./views/worker/WorkerApp";
import AdminApp from "./views/admin/AdminApp";
import BusinessApp from "./views/business/BusinessApp";

export type AppMode =
  | "landing"
  | "language-customer"
  | "language-worker"
  | "customer-onboarding"
  | "worker-onboarding"
  | "customer"
  | "worker"
  | "admin"
  | "business";

export default function App() {
  const [mode, setMode] = useState<AppMode>("landing");
  const [lang, setLang] = useState<"en" | "hi" | "bn">("en");
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);

  const navigate = (m: AppMode) => setMode(m);
  const views: { id: AppMode; label: string }[] = [
    { id: "landing", label: "Home" },
    { id: "customer", label: "Customer" },
    { id: "worker", label: "Worker" },
    { id: "admin", label: "Admin" },
    { id: "business", label: "Business" },
  ];

  return (
    <div
      className="size-full flex items-center justify-center"
      style={{ background: "var(--background)", fontFamily: "'Poppins', sans-serif" }}
    >
      <div
        className="relative overflow-hidden shadow-2xl"
        style={{
          width: "390px",
          height: "844px",
          maxHeight: "100vh",
          maxWidth: "100vw",
          background: "var(--background)",
          borderRadius: "40px",
          border: "8px solid #1C1917",
        }}
      >
        <div className="size-full">
          {mode === "landing" && <Landing onNavigate={navigate} />}
          {mode === "language-customer" && (
            <LanguageSelect
              onSelect={(l) => { setLang(l); navigate("customer-onboarding"); }}
              onBack={() => navigate("landing")}
            />
          )}
          {mode === "language-worker" && (
            <LanguageSelect
              onSelect={(l) => { setLang(l); navigate("worker-onboarding"); }}
              onBack={() => navigate("landing")}
              isWorker
            />
          )}
          {mode === "customer-onboarding" && (
            <CustomerOnboarding lang={lang} onComplete={() => navigate("customer")} onBack={() => navigate("language-customer")} />
          )}
          {mode === "worker-onboarding" && (
            <WorkerOnboarding lang={lang} onComplete={() => navigate("worker")} onBack={() => navigate("language-worker")} />
          )}
          {mode === "customer" && <CustomerApp onNavigate={navigate} />}
          {mode === "worker" && <WorkerApp onNavigate={navigate} />}
          {mode === "admin" && <AdminApp onNavigate={navigate} />}
          {mode === "business" && <BusinessApp onNavigate={navigate} />}
        </div>

        {/* Global view switcher — kept inside the phone frame so it is always available. */}
        <div className="absolute top-3 right-3 z-50 size-10">
          <button
            type="button"
            aria-label="Open prototype view menu"
            aria-expanded={isViewMenuOpen}
            onClick={() => setIsViewMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-full text-2xl font-bold leading-none text-white shadow-lg transition-transform active:scale-95"
            style={{ background: "var(--foreground)" }}
          >
            <span aria-hidden="true" className="-mt-1">⋮</span>
          </button>

          <div
            aria-hidden={!isViewMenuOpen}
            className={`absolute top-12 right-0 w-40 overflow-hidden rounded-2xl border bg-white shadow-xl transition-all duration-200 ease-out ${
              isViewMenuOpen
                ? "max-h-64 translate-x-0 opacity-100"
                : "pointer-events-none max-h-64 translate-x-[calc(100%+1rem)] opacity-0"
            }`}
            style={{ borderColor: "var(--border)" }}
          >
            <div className="p-2">
              {views.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => {
                    navigate(view.id);
                    setIsViewMenuOpen(false);
                  }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors"
                  style={{
                    background: mode === view.id ? "var(--primary)" : "transparent",
                    color: mode === view.id ? "white" : "var(--foreground)",
                  }}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
