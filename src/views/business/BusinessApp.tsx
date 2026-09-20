import { useState } from "react";
import TopBar from "../../components/TopBar";
import type { AppMode } from "../../App";
import { workers } from "../../mockData";

type BusinessScreen =
  | "dashboard" | "post-requirement" | "matching" | "porter-network" | "invoices" | "profile";

const bizTabs = [
  { id: "dashboard", icon: "🏢", label: "Jobs" },
  { id: "post-requirement", icon: "👷", label: "Workers" },
  { id: "invoices", icon: "🧾", label: "Bookings" },
  { id: "invoices", icon: "💳", label: "Payments" },
  { id: "profile", icon: "👤", label: "Profile" },
];

export default function BusinessApp({ onNavigate }: { onNavigate: (m: AppMode) => void }) {
  const [screen, setScreen] = useState<BusinessScreen>("dashboard");
  const [workerCount, setWorkerCount] = useState(10);
  const [matchStep, setMatchStep] = useState<"search" | "results" | "confirmed">("search");

  const go = (s: BusinessScreen) => setScreen(s);

  // ─── DASHBOARD ───────────────────────────────────────────────────────────────
  if (screen === "dashboard") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="px-5 pt-8 pb-4" style={{ background: "white" }}>
            <div className="flex items-center justify-between mb-1">
              <div>
                <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Business Dashboard</h1>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Haldia Infra Ltd. · Contractor</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "var(--primary)" }}>HL</div>
            </div>
          </div>

          <div className="px-4 mt-4">
            {/* Core CTA */}
            <button
              onClick={() => { setMatchStep("search"); go("post-requirement"); }}
              className="w-full rounded-2xl p-5 text-left mb-4 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, var(--primary) 0%, #c4520a 100%)" }}
            >
              <div className="text-white font-bold text-xl mb-1">Post Workforce Requirement</div>
              <div className="text-orange-100 text-sm">Find verified local workers instantly</div>
              <div className="mt-3 text-white font-semibold text-sm">+ New Requirement →</div>
            </button>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Active Workers", value: "14", icon: "👷" },
                { label: "This Month", value: "₹2.1L", icon: "💰" },
                { label: "Jobs Posted", value: "8", icon: "📋" },
                { label: "Satisfaction", value: "4.7⭐", icon: "😊" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid var(--border)" }}>
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{s.value}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Active jobs */}
            <div className="mb-4">
              <h3 className="font-bold mb-3" style={{ color: "var(--foreground)" }}>Active Requirements</h3>
              {[
                { title: "Construction Helpers", needed: 10, filled: 8, date: "Tomorrow 8 AM", location: "Site A, Haldia" },
                { title: "Loading/Unloading Crew", needed: 5, filled: 5, date: "Today 10 AM", location: "Warehouse B" },
              ].map((j) => (
                <div key={j.title} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{j.title}</span>
                    <span className="text-xs font-bold" style={{ color: j.filled === j.needed ? "var(--secondary)" : "var(--primary)" }}>
                      {j.filled}/{j.needed} filled
                    </span>
                  </div>
                  <div className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>📅 {j.date} · 📍 {j.location}</div>
                  <div className="h-1.5 rounded-full mb-2" style={{ background: "var(--muted)" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${(j.filled / j.needed) * 100}%`, background: j.filled === j.needed ? "var(--secondary)" : "var(--primary)" }} />
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl text-xs font-semibold border" style={{ borderColor: "var(--border)" }}>Manage</button>
                    <button className="py-2 px-3 rounded-xl text-xs font-semibold border" style={{ borderColor: "var(--border)" }}>Track</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Porter network CTA */}
            <div
              className="rounded-2xl p-4 mb-4 cursor-pointer"
              style={{ background: "rgba(26,122,94,0.05)", border: "1px solid rgba(26,122,94,0.2)" }}
              onClick={() => go("porter-network")}
            >
              <div className="font-bold text-sm mb-1" style={{ color: "var(--secondary)" }}>📦 B2B Porter Network</div>
              <p className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>Need porters for restaurant/warehouse? Book directly from cooperative network.</p>
              <button onClick={(e) => { e.stopPropagation(); go("porter-network"); }} className="text-xs font-bold" style={{ color: "var(--secondary)" }}>Book Porters →</button>
            </div>
          </div>
        </div>
        <BizNav />
      </div>
    );
  }

  // ─── POST REQUIREMENT ────────────────────────────────────────────────────────
  if (screen === "post-requirement") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Post Requirement" onBack={() => go("dashboard")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-4 mb-5">
            <div>
              <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>Type of Work</label>
              <select className="w-full px-4 py-3.5 rounded-2xl border text-sm focus:outline-none" style={{ borderColor: "var(--border)", background: "white" }}>
                <option>Construction Helpers</option>
                <option>Porters</option>
                <option>Loading/Unloading</option>
                <option>Electricians</option>
                <option>Security Guards</option>
                <option>Cleaning Crew</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>Number of Workers</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setWorkerCount(Math.max(1, workerCount - 1))} className="w-12 h-12 rounded-xl text-xl font-bold" style={{ background: "var(--muted)" }}>−</button>
                <span className="text-3xl font-bold flex-1 text-center" style={{ color: "var(--foreground)" }}>{workerCount}</span>
                <button onClick={() => setWorkerCount(workerCount + 1)} className="w-12 h-12 rounded-xl text-xl font-bold text-white" style={{ background: "var(--primary)" }}>+</button>
              </div>
            </div>

            {[
              { label: "Date", value: "Tomorrow, 14 Sep 2026", type: "date" },
              { label: "Time (Start – End)", value: "8:00 AM – 5:00 PM" },
              { label: "Location", value: "Construction Site A, Haldia" },
              { label: "Daily Pay", value: "₹650/day" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>{f.label}</label>
                <input className="w-full px-4 py-3.5 rounded-2xl border text-sm focus:outline-none" style={{ borderColor: "var(--border)", background: "white" }} defaultValue={f.value} />
              </div>
            ))}

            <div>
              <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>Requirements</label>
              <textarea className="w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none resize-none" style={{ borderColor: "var(--border)", background: "white" }} rows={3} defaultValue="Basic construction experience. Must be able to lift 30+ kg." />
            </div>
          </div>

          <button onClick={() => { setMatchStep("search"); go("matching"); }} className="w-full py-4 rounded-2xl font-bold text-base text-white active:scale-98" style={{ background: "var(--primary)" }}>
            🔍 Find {workerCount} Workers →
          </button>
        </div>
      </div>
    );
  }

  // ─── BULK MATCHING ───────────────────────────────────────────────────────────
  if (screen === "matching") {
    const verified = 8;
    const remaining = workerCount - verified;

    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Workforce Matching" onBack={() => go("post-requirement")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {matchStep === "search" && (
            <>
              <div className="flex flex-col items-center py-8">
                <div className="text-5xl mb-4 animate-pulse">🤖</div>
                <h2 className="text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Finding Workers...</h2>
                <p className="text-sm text-center" style={{ color: "var(--muted-foreground)" }}>Searching cooperative network for {workerCount} construction helpers in Haldia</p>
                <div className="mt-6 w-full max-w-xs">
                  <div className="h-2 rounded-full" style={{ background: "var(--muted)" }}>
                    <div className="h-2 rounded-full animate-pulse" style={{ width: "80%", background: "var(--primary)" }} />
                  </div>
                  <p className="text-xs text-center mt-2" style={{ color: "var(--muted-foreground)" }}>Checking 3 cooperatives...</p>
                </div>
                <button onClick={() => setMatchStep("results")} className="mt-8 px-6 py-3 rounded-2xl font-bold text-sm text-white" style={{ background: "var(--primary)" }}>
                  See Results →
                </button>
              </div>
            </>
          )}

          {matchStep === "results" && (
            <>
              <div className="rounded-2xl p-5 mb-4" style={{ background: "white", border: "2px solid var(--secondary)" }}>
                <div className="text-center mb-3">
                  <span className="text-sm font-semibold" style={{ color: "var(--muted-foreground)" }}>{workerCount} Workers Required</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl p-4 text-center" style={{ background: "rgba(26,122,94,0.08)" }}>
                    <div className="text-3xl font-bold" style={{ color: "var(--secondary)" }}>{verified}</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Verified workers matched</div>
                  </div>
                  <div className="rounded-xl p-4 text-center" style={{ background: remaining > 0 ? "rgba(220,38,38,0.08)" : "rgba(26,122,94,0.08)" }}>
                    <div className="text-3xl font-bold" style={{ color: remaining > 0 ? "#DC2626" : "var(--secondary)" }}>{remaining}</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{remaining > 0 ? "Still needed" : "Fully staffed!"}</div>
                  </div>
                </div>
                {remaining > 0 && (
                  <div className="mt-3 rounded-xl p-3 text-xs text-center" style={{ background: "rgba(26,122,94,0.05)", color: "var(--secondary)" }}>
                    💡 {remaining} additional workers requested from Kolkata Workers United (nearby cooperative)
                  </div>
                )}
              </div>

              <h3 className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>Matched Workers</h3>
              {workers.slice(0, 3).map((w) => (
                <div key={w.id} className="rounded-2xl p-4 mb-3 flex items-center gap-3" style={{ background: "white", border: "1px solid var(--border)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "var(--primary)" }}>{w.avatar}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{w.name}</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>⭐ {w.rating} · {w.verified.identity ? "✓ Verified" : "Pending"}</div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(26,122,94,0.1)", color: "var(--secondary)" }}>✓ Confirmed</div>
                </div>
              ))}

              <div className="rounded-xl p-3 mb-4 text-xs" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                🌐 Shared workforce infrastructure — workers sourced from ABC Labour Cooperative and Kolkata Workers United
              </div>

              <div className="flex gap-3">
                <button onClick={() => go("dashboard")} className="flex-1 py-4 rounded-2xl font-bold text-sm border" style={{ borderColor: "var(--border)" }}>Modify</button>
                <button onClick={() => { setMatchStep("confirmed"); }} className="flex-1 py-4 rounded-2xl font-bold text-sm text-white" style={{ background: "var(--secondary)" }}>Confirm All →</button>
              </div>
            </>
          )}

          {matchStep === "confirmed" && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-6xl">✅</div>
              <h2 className="text-2xl font-bold text-center" style={{ color: "var(--foreground)" }}>Workforce Confirmed!</h2>
              <p className="text-sm text-center" style={{ color: "var(--muted-foreground)" }}>8 workers confirmed for tomorrow 8 AM – 5 PM at Construction Site A, Haldia</p>
              <div className="w-full rounded-2xl p-4" style={{ background: "white", border: "1px solid var(--border)" }}>
                <div className="text-sm font-semibold mb-2" style={{ color: "var(--foreground)" }}>All workers will receive:</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>✓ Job notification via app/SMS/WhatsApp<br />✓ Location & shift details<br />✓ ₹650/day payment via cooperative</div>
              </div>
              <button onClick={() => go("dashboard")} className="w-full py-4 rounded-2xl font-bold text-base text-white" style={{ background: "var(--primary)" }}>
                Back to Dashboard →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── PORTER NETWORK ──────────────────────────────────────────────────────────
  if (screen === "porter-network") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="B2B Porter Network" onBack={() => go("dashboard")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-4 mb-4" style={{ background: "linear-gradient(135deg, #1A7A5E 0%, #155f4b 100%)" }}>
            <div className="text-green-100 text-xs mb-1">SHARED WORKFORCE INFRASTRUCTURE</div>
            <div className="text-white font-bold text-lg">Business Porter Network</div>
            <div className="text-green-100 text-xs mt-1">Access cooperative porter workforce for your business needs</div>
          </div>

          <div className="flex flex-col gap-3 mb-5">
            {[
              { label: "Need", value: "5 Porters" },
              { label: "Date", value: "Today" },
              { label: "Time", value: "6:00 PM – 10:00 PM" },
              { label: "Location", value: "Restaurant / Warehouse" },
              { label: "Pay", value: "₹400 / porter" },
            ].map((f) => (
              <div key={f.label} className="flex justify-between py-2 px-4 rounded-xl" style={{ background: "white", border: "1px solid var(--border)" }}>
                <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{f.label}</span>
                <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{f.value}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>Available Porters</h3>
            {[
              { name: "Amit Mondal", distance: "1.2 km", rating: 4.5, coop: "ABC Labour Coop" },
              { name: "Bikram Sen", distance: "2.1 km", rating: 4.6, coop: "Howrah Labour Coop" },
              { name: "Jiten Das", distance: "0.9 km", rating: 4.8, coop: "ABC Labour Coop" },
              { name: "Sumon Roy", distance: "3.4 km", rating: 4.4, coop: "Kolkata Workers United" },
              { name: "Tapan Ghosh", distance: "1.7 km", rating: 4.5, coop: "Howrah Labour Coop" },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs" style={{ background: "var(--secondary)" }}>
                  {p.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{p.name}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.coop} · {p.distance} · ⭐ {p.rating}</div>
                </div>
                <div className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(26,122,94,0.1)", color: "var(--secondary)" }}>Available</div>
              </div>
            ))}
          </div>

          <button onClick={() => go("dashboard")} className="w-full py-4 rounded-2xl font-bold text-base text-white" style={{ background: "var(--primary)" }}>
            📦 Confirm 5 Porters →
          </button>
        </div>
      </div>
    );
  }

  // ─── INVOICES ────────────────────────────────────────────────────────────────
  if (screen === "invoices") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Invoices & Payments" />
        <div className="flex-1 overflow-y-auto px-4 py-3 pb-20">
          {[
            { id: "INV-001", desc: "8 Construction Helpers — 1 day", amount: "₹5,200", date: "Today", status: "Pending" },
            { id: "INV-002", desc: "5 Porters — Warehouse", amount: "₹2,000", date: "10 Sep", status: "Paid" },
            { id: "INV-003", desc: "3 Electricians — Site B", amount: "₹4,500", date: "5 Sep", status: "Paid" },
          ].map((i) => (
            <div key={i.id} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{i.id}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: i.status === "Paid" ? "rgba(22,163,74,0.1)" : "rgba(234,88,12,0.1)", color: i.status === "Paid" ? "#16A34A" : "#EA580C" }}>{i.status}</span>
              </div>
              <div className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>{i.desc}</div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{i.date}</span>
                <span className="font-bold" style={{ color: "var(--foreground)" }}>{i.amount}</span>
              </div>
              {i.status === "Pending" && (
                <button className="w-full mt-3 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "var(--primary)" }}>Pay Now</button>
              )}
            </div>
          ))}
        </div>
        <BizNav />
      </div>
    );
  }

  // ─── PROFILE ─────────────────────────────────────────────────────────────────
  if (screen === "profile") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Business Profile" />
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="flex flex-col items-center px-5 py-6" style={{ background: "white" }}>
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-white text-2xl mb-3" style={{ background: "var(--primary)" }}>HL</div>
            <h2 className="font-bold text-lg" style={{ color: "var(--foreground)" }}>Haldia Infra Ltd.</h2>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Contractor · Haldia, WB</p>
          </div>
          <div className="px-4 py-3">
            {["Company Details", "Payment Account", "Job History", "Preferred Workers", "Notifications", "Help"].map((s) => (
              <div key={s} className="flex items-center gap-3 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="flex-1 text-sm font-medium" style={{ color: "var(--foreground)" }}>{s}</span>
                <span style={{ color: "var(--muted-foreground)" }}>→</span>
              </div>
            ))}
          </div>
        </div>
        <BizNav />
      </div>
    );
  }

  function BizNav() {
    return (
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-1 pt-3 pb-4" style={{ background: "white", borderTop: "1px solid var(--border)" }}>
        {bizTabs.map((t) => (
          <button key={t.label} onClick={() => go(t.id as BusinessScreen)} className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-2xl transition-all" style={{ color: screen === t.id ? "var(--primary)" : "var(--muted-foreground)" }}>
            <span className="text-xl leading-none">{t.icon}</span>
            <span className="text-[9px] font-semibold">{t.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return null;
}
