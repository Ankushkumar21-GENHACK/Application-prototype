import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend
} from "recharts";
import TopBar from "../../components/TopBar";
import type { AppMode } from "../../App";
import { adminStats, demandData, zones, cooperativeNetwork, skillGaps, proposals, equipment, workers } from "../../mockData";

type AdminScreen =
  | "dashboard" | "demand-forecast" | "shortage" | "workforce-network" | "worker-management"
  | "governance" | "governance-vote" | "equipment" | "skill-gap" | "analytics" | "ai-engine"
  | "conflict-management";

const adminTabs = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "worker-management", icon: "👥", label: "Workers" },
  { id: "shortage", icon: "🗺️", label: "Workforce" },
  { id: "analytics", icon: "📈", label: "Analytics" },
  { id: "governance", icon: "🏛️", label: "Governance" },
];

function AdminNav({ active, onChange }: { active: string; onChange: (s: AdminScreen) => void }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-1 pt-3 pb-4"
      style={{ background: "white", borderTop: "1px solid var(--border)" }}
    >
      {adminTabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id as AdminScreen)}
          className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-2xl transition-all"
          style={{ color: active === t.id ? "var(--secondary)" : "var(--muted-foreground)" }}
        >
          <span className="text-xl leading-none">{t.icon}</span>
          <span className="text-[9px] font-semibold">{t.label}</span>
          {active === t.id && <div className="w-1 h-1 rounded-full mt-0.5" style={{ background: "var(--secondary)" }} />}
        </button>
      ))}
    </div>
  );
}

export default function AdminApp({ onNavigate }: { onNavigate: (m: AppMode) => void }) {
  const [screen, setScreen] = useState<AdminScreen>("dashboard");
  const [selectedProposal, setSelectedProposal] = useState(proposals[0]);

  const go = (s: AdminScreen) => setScreen(s);

  // ─── DASHBOARD ───────────────────────────────────────────────────────────────
  if (screen === "dashboard") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="px-4 pt-8 pb-4" style={{ background: "white" }}>
            <div className="flex items-center justify-between mb-1">
              <div>
                <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Admin Dashboard</h1>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>ABC Labour Cooperative · Haldia</p>
              </div>
              <div className="mr-12 flex gap-2">
                <button onClick={() => go("ai-engine")} className="px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: "var(--secondary)" }}>
                  🤖 AI
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 mt-4">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Active Workers", value: adminStats.activeWorkers, icon: "👥", color: "var(--secondary)" },
                { label: "Today's Bookings", value: adminStats.todayBookings, icon: "📅", color: "var(--primary)" },
                { label: "Completed Jobs", value: adminStats.completedJobs, icon: "✅", color: "var(--secondary)" },
                { label: "Pending", value: adminStats.pendingJobs, icon: "⏳", color: "var(--accent)" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid var(--border)" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{s.icon}</span>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</span>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Financial */}
            <div className="rounded-2xl p-4 mb-4" style={{ background: "linear-gradient(135deg, #1A7A5E 0%, #155f4b 100%)" }}>
              <div className="flex justify-between">
                <div>
                  <div className="text-green-100 text-xs">Worker Earnings Today</div>
                  <div className="text-white text-2xl font-bold">{adminStats.workerEarnings}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-100 text-xs">Cooperative Fund</div>
                  <div className="text-white text-2xl font-bold">{adminStats.coopFund}</div>
                </div>
              </div>
            </div>

            {/* Alert: shortage */}
            <div
              className="rounded-2xl p-4 mb-4 cursor-pointer"
              style={{ background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.3)" }}
              onClick={() => go("shortage")}
            >
              <div className="flex items-center gap-2 mb-1">
                <span>🔴</span>
                <span className="font-bold text-sm" style={{ color: "#DC2626" }}>Workforce Shortage Detected</span>
              </div>
              <p className="text-xs" style={{ color: "var(--foreground)" }}>Zone A – Haldia: 13 plumbers short. AI recommends redistribution from Zone C.</p>
              <button onClick={(e) => { e.stopPropagation(); go("shortage"); }} className="mt-2 text-xs font-bold" style={{ color: "#DC2626" }}>View Details →</button>
            </div>

            {/* Demand Forecast snippet */}
            <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Demand Forecast</h3>
                <button onClick={() => go("demand-forecast")} className="text-xs font-bold" style={{ color: "var(--primary)" }}>Full View →</button>
              </div>
              <div style={{ height: "100px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={demandData}>
                    <Line type="monotone" dataKey="plumbing" stroke="var(--primary)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="electrical" stroke="var(--secondary)" strokeWidth={2} dot={false} />
                    <XAxis dataKey="week" tick={{ fontSize: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { icon: "📈", label: "AI Forecast", onClick: () => go("demand-forecast") },
                { icon: "🗺️", label: "Risk Map", onClick: () => go("shortage") },
                { icon: "🌐", label: "Coop Network", onClick: () => go("workforce-network") },
                { icon: "🧩", label: "Skill Gap", onClick: () => go("skill-gap") },
                { icon: "⚙️", label: "Equipment", onClick: () => go("equipment") },
                { icon: "⚖️", label: "Conflicts", onClick: () => go("conflict-management") },
              ].map((a) => (
                <button key={a.label} onClick={a.onClick} className="rounded-2xl p-3 flex items-center gap-3 transition-all active:scale-95" style={{ background: "white", border: "1px solid var(--border)" }}>
                  <span className="text-xl">{a.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <AdminNav active="dashboard" onChange={go} />
      </div>
    );
  }

  // ─── DEMAND FORECAST ─────────────────────────────────────────────────────────
  if (screen === "demand-forecast") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="AI Workforce Intelligence" onBack={() => go("dashboard")} />
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
          <div className="rounded-2xl p-4 mb-4" style={{ background: "linear-gradient(135deg, #1C1917 0%, #292524 100%)" }}>
            <div className="text-white/70 text-xs mb-1">AI PREDICTION</div>
            <div className="text-white font-bold text-lg mb-1">Plumbing demand expected to increase 23% next week</div>
            <div className="text-white/60 text-xs">Based on historical bookings, seasonal patterns, and current trends</div>
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>Weekly Demand Trend + Forecast</h3>
            <div style={{ height: "200px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demandData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE8" />
                  <XAxis dataKey="week" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Line type="monotone" dataKey="plumbing" name="Plumbing" stroke="#E8620A" strokeWidth={2.5} strokeDasharray="0" />
                  <Line type="monotone" dataKey="electrical" name="Electrical" stroke="#1A7A5E" strokeWidth={2.5} />
                  <Line type="monotone" dataKey="cleaning" name="Cleaning" stroke="#7C3AED" strokeWidth={2.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-right mt-2" style={{ color: "var(--muted-foreground)" }}>W6–W9 are AI forecasts</div>
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>Recommendations</h3>
            {[
              { icon: "🔧", text: "Recruit 8 more plumbers before W6", priority: "High" },
              { icon: "⚡", text: "Electrical capacity sufficient through W7", priority: "Low" },
              { icon: "🧹", text: "Consider training 5 cleaners for peak season", priority: "Medium" },
            ].map((r) => (
              <div key={r.text} className="flex items-start gap-3 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
                <span>{r.icon}</span>
                <span className="flex-1 text-sm" style={{ color: "var(--foreground)" }}>{r.text}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0" style={{ background: r.priority === "High" ? "rgba(220,38,38,0.1)" : r.priority === "Medium" ? "rgba(234,88,12,0.1)" : "rgba(22,163,74,0.1)", color: r.priority === "High" ? "#DC2626" : r.priority === "Medium" ? "#EA580C" : "#16A34A" }}>
                  {r.priority}
                </span>
              </div>
            ))}
          </div>

          <button onClick={() => go("skill-gap")} className="w-full py-4 rounded-2xl font-bold text-sm text-white" style={{ background: "var(--secondary)" }}>
            View Skill Gap Analysis →
          </button>
        </div>
      </div>
    );
  }

  // ─── SHORTAGE DETECTION / WORKFORCE RISK MAP ─────────────────────────────────
  if (screen === "shortage") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Workforce Risk Map" onBack={() => go("dashboard")} />
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
          {/* Risk map visual */}
          <div className="rounded-2xl overflow-hidden mb-4 relative" style={{ height: "200px", background: "#e8e0d8" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs font-medium" style={{ color: "#78716C" }}>West Bengal — Workforce Zone Map</p>
            </div>
            {/* Zone indicators */}
            {[
              { label: "Zone A\nHaldia", x: "20%", y: "65%", color: "#DC2626" },
              { label: "Zone B\nDurgapur", x: "50%", y: "35%", color: "#16A34A" },
              { label: "Zone C\nSiliguri", x: "75%", y: "20%", color: "#CA8A04" },
              { label: "Zone D\nHowrah", x: "40%", y: "60%", color: "#16A34A" },
            ].map((z) => (
              <div key={z.label} className="absolute" style={{ left: z.x, top: z.y }}>
                <div className="w-10 h-10 rounded-full border-4 border-white opacity-80 flex items-center justify-center text-[8px] font-bold text-white text-center leading-tight shadow-lg" style={{ background: z.color }}>
                  {z.label.split("\n")[0]}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {zones.map((z) => (
              <div key={z.id} className="rounded-2xl p-3" style={{ background: "white", border: `2px solid ${z.color}40` }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: z.color }} />
                  <span className="text-xs font-bold" style={{ color: "var(--foreground)" }}>{z.name}</span>
                </div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Required: {z.required}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Available: {z.available}</div>
                {z.shortage > 0 && <div className="text-xs font-bold mt-1" style={{ color: "#DC2626" }}>Short: {z.shortage}</div>}
                {z.shortage < 0 && <div className="text-xs font-bold mt-1" style={{ color: "#CA8A04" }}>Surplus: {Math.abs(z.shortage)}</div>}
                {z.shortage === 0 && <div className="text-xs font-bold mt-1" style={{ color: "#16A34A" }}>Balanced ✓</div>}
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.2)" }}>
            <div className="font-bold text-sm mb-2" style={{ color: "#DC2626" }}>🔴 Critical: Zone A – Haldia</div>
            <div className="text-sm mb-1" style={{ color: "var(--foreground)" }}>Plumbers required: 25 · Available: 12 · Shortage: 13</div>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Consider temporary workforce redistribution from Zone C (Siliguri — 13 surplus plumbers)</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => go("workforce-network")} className="flex-1 py-4 rounded-2xl font-bold text-sm text-white" style={{ background: "var(--secondary)" }}>
              Request Workers →
            </button>
            <button onClick={() => go("demand-forecast")} className="flex-1 py-4 rounded-2xl font-bold text-sm border" style={{ borderColor: "var(--border)" }}>
              View Forecast
            </button>
          </div>
        </div>
        <AdminNav active="shortage" onChange={go} />
      </div>
    );
  }

  // ─── WORKFORCE NETWORK ───────────────────────────────────────────────────────
  if (screen === "workforce-network") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Cooperative Network" onBack={() => go("shortage")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-4 mb-4" style={{ background: "linear-gradient(135deg, #1C1917 0%, #292524 100%)" }}>
            <div className="text-white/70 text-xs mb-1">AI RECOMMENDATION</div>
            <div className="text-white font-bold">Kolkata Workers United has surplus capacity</div>
            <div className="text-white/60 text-xs mt-1">5 workers could temporarily accept assignments in Zone A</div>
          </div>

          {cooperativeNetwork.map((c) => (
            <div key={c.id} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{c.name}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{c.zone}</div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{
                  background: c.status === "surplus" ? "rgba(22,163,74,0.1)" : c.status === "shortage" ? "rgba(220,38,38,0.1)" : "rgba(202,138,4,0.1)",
                  color: c.status === "surplus" ? "#16A34A" : c.status === "shortage" ? "#DC2626" : "#CA8A04",
                }}>
                  {c.status === "surplus" ? "Surplus ↑" : c.status === "shortage" ? "Shortage ↓" : "Balanced"}
                </span>
              </div>
              <div className="flex gap-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
                <span>🔧 Plumbers: <strong style={{ color: "var(--foreground)" }}>{c.plumbers}</strong></span>
                <span>⚡ Electricians: <strong style={{ color: "var(--foreground)" }}>{c.electricians}</strong></span>
                <span>🧹 Maids: <strong style={{ color: "var(--foreground)" }}>{c.maids}</strong></span>
              </div>
            </div>
          ))}

          <div className="rounded-2xl p-4 mb-4" style={{ background: "rgba(26,122,94,0.05)", border: "1px solid rgba(26,122,94,0.2)" }}>
            <div className="font-bold text-sm mb-2" style={{ color: "var(--secondary)" }}>Send Workforce Request</div>
            <div className="text-sm mb-3" style={{ color: "var(--foreground)" }}>
              Request 5 plumbers from Kolkata Workers United for Zone A – Haldia (7 days)
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div style={{ color: "var(--muted-foreground)" }}>🚌 Transport: Arranged</div>
              <div style={{ color: "var(--muted-foreground)" }}>💰 Pay: ₹4,500/day</div>
            </div>
            <button className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: "var(--secondary)" }}>
              📤 Send Workforce Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── WORKER MANAGEMENT ───────────────────────────────────────────────────────
  if (screen === "worker-management") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Worker Management" right={<button className="text-sm font-bold" style={{ color: "var(--secondary)" }}>+ Add</button>} />
        <div className="flex-1 overflow-y-auto px-4 py-3 pb-20">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            {["All", "Pending Verification", "Active", "Suspended"].map((f) => (
              <button key={f} className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: f === "All" ? "var(--secondary)" : "white", color: f === "All" ? "white" : "var(--muted-foreground)", border: f !== "All" ? "1px solid var(--border)" : "none" }}>
                {f}
              </button>
            ))}
          </div>

          {workers.map((w) => (
            <div key={w.id} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "var(--primary)" }}>{w.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{w.name}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{w.role} · {w.location}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: w.verified.identity ? "rgba(26,122,94,0.1)" : "rgba(234,88,12,0.1)", color: w.verified.identity ? "var(--secondary)" : "var(--primary)" }}>
                    {w.verified.identity ? "ID ✓" : "Pending"}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>⭐ {w.rating}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-xl text-xs font-semibold border" style={{ borderColor: "var(--border)" }}>View</button>
                {!w.verified.skill && <button className="flex-1 py-2 rounded-xl text-xs font-semibold" style={{ background: "rgba(232,98,10,0.08)", color: "var(--primary)" }}>Verify Skill</button>}
                {!w.verified.bg && <button className="flex-1 py-2 rounded-xl text-xs font-semibold" style={{ background: "rgba(26,122,94,0.08)", color: "var(--secondary)" }}>Approve BG</button>}
              </div>
            </div>
          ))}
        </div>
        <AdminNav active="worker-management" onChange={go} />
      </div>
    );
  }

  // ─── ANALYTICS ───────────────────────────────────────────────────────────────
  if (screen === "analytics") {
    const qualityData = [
      { name: "Completion", value: 94 },
      { name: "Satisfaction", value: 87 },
      { name: "On-time", value: 81 },
      { name: "Repeat", value: 73 },
    ];
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Analytics" />
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: "Avg Rating", value: adminStats.avgRating + "⭐", icon: "⭐" },
              { label: "Completion Rate", value: adminStats.completionRate + "%", icon: "✅" },
              { label: "Cancellation", value: adminStats.cancellationRate + "%", icon: "❌" },
              { label: "Worker Coverage", value: "97%", icon: "🛡️" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid var(--border)" }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>Quality Metrics (%)</h3>
            <div style={{ height: "160px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={qualityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE8" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Bar dataKey="value" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>Demand by Service (This Month)</h3>
            {[
              { service: "Maid / Cleaner", pct: 32 },
              { service: "Electrician", pct: 22 },
              { service: "Plumber", pct: 18 },
              { service: "Cook", pct: 12 },
              { service: "Others", pct: 16 },
            ].map((d) => (
              <div key={d.service} className="mb-2">
                <div className="flex justify-between text-xs mb-1" style={{ color: "var(--foreground)" }}>
                  <span>{d.service}</span>
                  <span className="font-bold">{d.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${d.pct * 3}%`, background: "var(--primary)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <AdminNav active="analytics" onChange={go} />
      </div>
    );
  }

  // ─── GOVERNANCE ──────────────────────────────────────────────────────────────
  if (screen === "governance") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Member Governance" right={<button className="text-sm font-bold" style={{ color: "var(--secondary)" }}>+ Propose</button>} />
        <div className="flex-1 overflow-y-auto px-4 py-3 pb-20">
          {proposals.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl p-4 mb-3 cursor-pointer transition-all active:scale-98"
              style={{ background: "white", border: "1px solid var(--border)" }}
              onClick={() => { setSelectedProposal(p); go("governance-vote"); }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-semibold text-sm leading-snug" style={{ color: "var(--foreground)" }}>{p.title}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0" style={{ background: p.status === "Active" ? "rgba(232,98,10,0.1)" : "rgba(22,163,74,0.1)", color: p.status === "Active" ? "var(--primary)" : "#16A34A" }}>
                  {p.status}
                </span>
              </div>
              <div className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>Proposed by {p.proposer} · {p.date}</div>
              {/* Voting bar */}
              <div className="h-2 rounded-full overflow-hidden mb-1" style={{ background: "var(--muted)" }}>
                <div className="h-2 rounded-full" style={{ width: `${p.yes}%`, background: "var(--secondary)" }} />
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold" style={{ color: "var(--secondary)" }}>YES {p.yes}%</span>
                <span style={{ color: "var(--muted-foreground)" }}>{p.voted}/{p.total} voted</span>
                <span className="font-semibold" style={{ color: "#DC2626" }}>NO {p.no}%</span>
              </div>
            </div>
          ))}
        </div>
        <AdminNav active="governance" onChange={go} />
      </div>
    );
  }

  // ─── GOVERNANCE VOTE ─────────────────────────────────────────────────────────
  if (screen === "governance-vote") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Proposal" onBack={() => go("governance")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-5 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <div className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>PROPOSAL</div>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>{selectedProposal.title}</h2>
            <div className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>Proposed by {selectedProposal.proposer} · {selectedProposal.date}</div>

            {/* Voting bars */}
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <div className="flex-1 h-10 rounded-xl flex items-center justify-center font-bold text-white" style={{ background: "var(--secondary)" }}>YES · {selectedProposal.yes}%</div>
                <div className="w-20 h-10 rounded-xl flex items-center justify-center font-bold text-white" style={{ background: "#DC2626" }}>NO · {selectedProposal.no}%</div>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                <div className="h-3 rounded-full" style={{ width: `${selectedProposal.yes}%`, background: "var(--secondary)" }} />
              </div>
            </div>

            <div className="text-sm text-center" style={{ color: "var(--muted-foreground)" }}>
              {selectedProposal.voted} of {selectedProposal.total} members voted
            </div>
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>Discussion</h3>
            {[
              { member: "Kavita M.", text: "This will help workers during medical emergencies. I support this.", time: "2 hrs ago" },
              { member: "Suresh P.", text: "5% might be too high. Can we start with 3%?", time: "4 hrs ago" },
              { member: "Rekha D.", text: "Strongly agree. Our members need this safety net.", time: "6 hrs ago" },
            ].map((c) => (
              <div key={c.member} className="py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold" style={{ color: "var(--foreground)" }}>{c.member}</span>
                  <span style={{ color: "var(--muted-foreground)" }}>{c.time}</span>
                </div>
                <p className="text-xs" style={{ color: "var(--foreground)" }}>{c.text}</p>
              </div>
            ))}
          </div>

          {selectedProposal.status === "Active" && (
            <div className="flex gap-3">
              <button className="flex-1 py-4 rounded-2xl font-bold text-base border-2 text-center" style={{ borderColor: "#DC2626", color: "#DC2626" }}>Vote NO</button>
              <button className="flex-1 py-4 rounded-2xl font-bold text-base text-white" style={{ background: "var(--secondary)" }}>Vote YES</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── EQUIPMENT POOL ──────────────────────────────────────────────────────────
  if (screen === "equipment") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Cooperative Equipment" onBack={() => go("dashboard")} right={<button className="text-sm font-bold" style={{ color: "var(--secondary)" }}>+ Add</button>} />
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {equipment.map((e) => (
            <div key={e.id} className="rounded-2xl p-4 mb-3 flex items-center gap-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "var(--muted)" }}>🔧</div>
              <div className="flex-1">
                <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{e.name}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{e.category}</div>
                {e.borrower && <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Borrowed by {e.borrower} · Return {e.returnDate}</div>}
              </div>
              <div>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: e.status === "Available" ? "rgba(22,163,74,0.1)" : "rgba(234,88,12,0.1)", color: e.status === "Available" ? "#16A34A" : "var(--primary)" }}>
                  {e.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── SKILL GAP ───────────────────────────────────────────────────────────────
  if (screen === "skill-gap") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Skill Gap Analysis" onBack={() => go("demand-forecast")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>Skills currently in shortage — based on demand forecasts</p>
          {skillGaps.map((s) => (
            <div key={s.skill} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{s.skill}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: s.demand === "Critical" ? "rgba(220,38,38,0.1)" : s.demand === "High" ? "rgba(234,88,12,0.1)" : "rgba(202,138,4,0.1)", color: s.demand === "Critical" ? "#DC2626" : s.demand === "High" ? "#EA580C" : "#CA8A04" }}>
                  {s.demand}
                </span>
              </div>
              <div className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>Shortage: {s.shortage} workers</div>
              <div className="text-xs font-medium mb-3" style={{ color: "var(--secondary)" }}>💡 {s.benefit}</div>
              <button className="w-full py-2.5 rounded-xl text-sm font-bold" style={{ background: "var(--secondary)", color: "white" }}>
                Create Training Program
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── AI ENGINE (for SIH presentation) ───────────────────────────────────────
  if (screen === "ai-engine") {
    const flow = [
      "Customer Requests",
      "Demand Data Collection",
      "AI Forecasting Engine",
      "Demand Prediction",
      "Shortage Detection",
      "Skill Gap Analysis",
      "Workforce Mobility",
      "Fair Matching",
      "Travel-Aware Scheduling",
      "Booking Confirmed",
    ];
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="AI Engine Architecture" onBack={() => go("dashboard")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-4 mb-4" style={{ background: "linear-gradient(135deg, #1C1917 0%, #292524 100%)" }}>
            <div className="text-orange-400 font-bold mb-1 text-xs">MAIN AI ENGINE</div>
            <div className="text-white font-bold text-lg">SahyogWork Intelligence</div>
            <div className="text-white/60 text-xs mt-1">Cooperative workforce orchestration powered by AI</div>
          </div>
          <div className="flex flex-col items-center">
            {flow.map((step, i) => (
              <div key={step} className="flex flex-col items-center w-full">
                <div className="w-full rounded-xl p-3 text-center" style={{
                  background: i === 0 ? "rgba(232,98,10,0.08)" : i === flow.length - 1 ? "rgba(26,122,94,0.08)" : "white",
                  border: `1px solid ${i === 0 ? "rgba(232,98,10,0.3)" : i === flow.length - 1 ? "rgba(26,122,94,0.3)" : "var(--border)"}`,
                }}>
                  <span className="text-sm font-semibold" style={{ color: i === 0 ? "var(--primary)" : i === flow.length - 1 ? "var(--secondary)" : "var(--foreground)" }}>
                    {step}
                  </span>
                </div>
                {i < flow.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-3" style={{ background: "var(--border)" }} />
                    <div style={{ color: "var(--muted-foreground)", fontSize: 10 }}>↓</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── CONFLICT MANAGEMENT ─────────────────────────────────────────────────────
  if (screen === "conflict-management") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Complaints & Conflicts" onBack={() => go("dashboard")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {[
            { id: "c1", type: "Payment Issue", customer: "Ankit G.", worker: "Rahul Das", status: "Open", priority: "high", date: "Today" },
            { id: "c2", type: "Worker Didn't Arrive", customer: "Priya S.", worker: "Salim A.", status: "Under Review", priority: "medium", date: "Yesterday" },
            { id: "c3", type: "Work Incomplete", customer: "Debjani R.", worker: "Maya Das", status: "Resolved", priority: "low", date: "10 Sep" },
          ].map((c) => (
            <div key={c.id} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex items-start justify-between mb-2">
                <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{c.type}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: c.status === "Open" ? "rgba(220,38,38,0.1)" : c.status === "Resolved" ? "rgba(22,163,74,0.1)" : "rgba(234,88,12,0.1)", color: c.status === "Open" ? "#DC2626" : c.status === "Resolved" ? "#16A34A" : "#EA580C" }}>
                  {c.status}
                </span>
              </div>
              <div className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>Customer: {c.customer} · Worker: {c.worker} · {c.date}</div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-xl text-xs font-semibold border" style={{ borderColor: "var(--border)" }}>View Details</button>
                {c.status !== "Resolved" && <button className="flex-1 py-2 rounded-xl text-xs font-bold text-white" style={{ background: "var(--secondary)" }}>Resolve</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
