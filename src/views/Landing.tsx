import type { AppMode } from "../App";

const categories = [
  { icon: "🏠", label: "Home" },
  { icon: "🔧", label: "Repair" },
  { icon: "🧹", label: "Cleaning" },
  { icon: "👷", label: "Labour" },
  { icon: "🚗", label: "Transport" },
  { icon: "💅", label: "Beauty" },
  { icon: "🎉", label: "Events" },
];

interface Props {
  onNavigate: (m: AppMode) => void;
}

export default function Landing({ onNavigate }: Props) {
  return (
    <div className="h-full overflow-y-auto flex flex-col" style={{ background: "var(--background)" }}>
      {/* Hero */}
      <div
        className="relative px-6 pt-12 pb-8 flex flex-col"
        style={{
          background: "linear-gradient(160deg, #1C1917 0%, #292524 60%, #44312a 100%)",
        }}
      >
        {/* Logo / Brand */}
        <div className="flex items-center gap-2 mb-6">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white text-lg"
            style={{ background: "var(--primary)" }}
          >
            S
          </div>
          <div>
            <div className="font-bold text-white text-base leading-none">Sahayogi</div>
            <div className="text-xs" style={{ color: "#A8A29E" }}>सहयोगी</div>
          </div>
        </div>

        <div className="mb-1">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: "rgba(232,98,10,0.2)", color: "#E8620A" }}
          >
            Book. Work. Earn. Grow.
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white mt-3 leading-tight">
          Local Skills.<br />
          <span style={{ color: "#E8620A" }}>Local Workers.</span><br />
          Collective Growth.
        </h1>

        <p className="mt-4 text-sm leading-relaxed" style={{ color: "#A8A29E" }}>
          Connect with verified cooperative workers for household, business and community services.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#22C55E" }}
          />
          <span className="text-xs" style={{ color: "#A8A29E" }}>
            Powered by cooperative workers · 847 active workers
          </span>
        </div>
      </div>

      {/* Categories strip */}
      <div className="px-4 py-4" style={{ background: "#1C1917" }}>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                {c.icon}
              </div>
              <span className="text-[10px] text-white/60 font-medium">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex-1 px-5 pt-5 pb-8 flex flex-col gap-3">
        <button
          onClick={() => onNavigate("language-customer")}
          className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-98 shadow-sm"
          style={{ background: "var(--primary)", color: "white" }}
        >
          🔍 &nbsp;Find a Service
        </button>

        <button
          onClick={() => onNavigate("language-worker")}
          className="w-full py-4 rounded-2xl font-bold text-base border-2 transition-all active:scale-98"
          style={{ borderColor: "var(--secondary)", color: "var(--secondary)", background: "white" }}
        >
          👷 &nbsp;Join as a Worker
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => onNavigate("admin")}
            className="flex-1 py-3.5 rounded-2xl font-semibold text-sm border transition-all active:scale-95"
            style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "white" }}
          >
            🏛️ Cooperative Login
          </button>
          <button
            onClick={() => onNavigate("business")}
            className="flex-1 py-3.5 rounded-2xl font-semibold text-sm border transition-all active:scale-95"
            style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "white" }}
          >
            🏢 Business / Contractor
          </button>
        </div>

        {/* Trust signals */}
        <div
          className="mt-2 rounded-2xl p-4 flex flex-col gap-2"
          style={{ background: "white", border: "1px solid var(--border)" }}
        >
          <div className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
            WHY SAHAYOGI?
          </div>
          {[
            { icon: "✅", text: "Workers verified by cooperative societies" },
            { icon: "⚖️", text: "Fair wages, transparent payment breakdown" },
            { icon: "🛡️", text: "Worker welfare & insurance included" },
            { icon: "🤖", text: "AI-powered smart matching & scheduling" },
          ].map((i) => (
            <div key={i.text} className="flex items-center gap-3 text-xs" style={{ color: "var(--foreground)" }}>
              <span>{i.icon}</span>
              <span>{i.text}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
          Available in English · हिंदी · বাংলা
        </p>
      </div>
    </div>
  );
}
