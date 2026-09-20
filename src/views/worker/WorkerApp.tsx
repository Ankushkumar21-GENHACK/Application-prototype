import { useState } from "react";
import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import type { AppMode } from "../../App";
import { workerSchedule, dailyJobs } from "../../mockData";

type WorkerScreen =
  | "home" | "job-request" | "active-job" | "job-complete" | "earnings"
  | "schedule" | "daily-labour" | "welfare" | "skill-passport" | "profile"
  | "low-literacy" | "offline" | "notifications" | "training";

const workerTabs = [
  { id: "home", icon: "💼", label: "Jobs" },
  { id: "schedule", icon: "📅", label: "Schedule" },
  { id: "earnings", icon: "💰", label: "Earnings" },
  { id: "messages", icon: "💬", label: "Messages" },
  { id: "profile", icon: "👤", label: "Profile" },
];

export default function WorkerApp({ onNavigate }: { onNavigate: (m: AppMode) => void }) {
  const [screen, setScreen] = useState<WorkerScreen>("home");
  const [tab, setTab] = useState("home");
  const [available, setAvailable] = useState(true);
  const [jobStage, setJobStage] = useState<"accepted" | "on-way" | "arrived" | "working" | "done">("accepted");
  const [offlineMode, setOfflineMode] = useState(false);

  const go = (s: WorkerScreen) => setScreen(s);

  const handleTab = (t: string) => {
    setTab(t);
    if (t === "home") go("home");
    else if (t === "schedule") go("schedule");
    else if (t === "earnings") go("earnings");
    else if (t === "profile") go("profile");
    else if (t === "messages") go("home"); // placeholder
  };

  // ─── HOME ────────────────────────────────────────────────────────────────────
  if (screen === "home") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <div className="flex-1 overflow-y-auto pb-20">
          {/* Header */}
          <div className="px-5 pt-10 pb-4" style={{ background: "white" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>नमस्ते 🙏</p>
                <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Ramesh Kumar</h1>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Electrician · Haldia</p>
              </div>
              <div className="flex gap-2 items-center">
                <button onClick={() => go("notifications")} className="w-10 h-10 rounded-full flex items-center justify-center relative" style={{ background: "var(--muted)" }}>
                  🔔
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full" style={{ background: "var(--primary)" }} />
                </button>
              </div>
            </div>

            {/* Availability toggle */}
            <button
              onClick={() => setAvailable(!available)}
              className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all"
              style={{
                background: available ? "rgba(26,122,94,0.1)" : "var(--muted)",
                border: `2px solid ${available ? "var(--secondary)" : "var(--border)"}`,
                color: available ? "var(--secondary)" : "var(--muted-foreground)",
              }}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: available ? "var(--secondary)" : "var(--muted-foreground)" }} />
              {available ? "🟢 AVAILABLE FOR WORK" : "⛔ NOT AVAILABLE"}
            </button>
          </div>

          <div className="px-4 mt-4">
            {/* New job notification */}
            {available && (
              <div
                className="rounded-2xl p-4 mb-4 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, var(--primary) 0%, #c4520a 100%)" }}
                onClick={() => go("job-request")}
              >
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -mr-5 -mt-5" style={{ background: "white" }} />
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-white" />
                  <span className="text-white text-xs font-semibold">NEW JOB REQUEST</span>
                </div>
                <div className="text-white font-bold text-lg">Tap Repair</div>
                <div className="text-orange-100 text-sm">Today 4 PM · 1.8 km · Est. ₹400</div>
                <div className="flex gap-3 mt-3">
                  <button onClick={(e) => { e.stopPropagation(); go("job-request"); }} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white border border-white/40 active:scale-95">
                    View Details
                  </button>
                </div>
              </div>
            )}

            {/* Today's Schedule */}
            <div className="mb-4">
              <h3 className="font-bold text-base mb-3" style={{ color: "var(--foreground)" }}>Today's Schedule</h3>
              {workerSchedule.filter((s) => s.type !== "travel").map((s) => (
                <div key={s.id} className="rounded-2xl p-4 mb-2 flex items-center gap-3" style={{ background: "white", border: "1px solid var(--border)" }}>
                  <div className="text-center w-12">
                    <div className="text-xs font-bold" style={{ color: "var(--primary)" }}>{s.time}</div>
                    <div className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>→ {s.endTime}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{s.title}</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.customer}</div>
                  </div>
                  <div className="w-2 h-2 rounded-full" style={{ background: s.type === "upcoming" ? "var(--secondary)" : "var(--primary)" }} />
                </div>
              ))}
            </div>

            {/* Today's earnings */}
            <div className="rounded-2xl p-4 mb-4" style={{ background: "linear-gradient(135deg, #1A7A5E 0%, #155f4b 100%)" }}>
              <div className="text-green-100 text-sm mb-1">Today's Earnings</div>
              <div className="text-white text-3xl font-bold mb-2">₹1,250</div>
              <div className="flex gap-4 text-xs text-green-100">
                <span>3 jobs done</span>
                <span>1 pending</span>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { icon: "💼", label: "New Jobs", onClick: () => go("job-request") },
                { icon: "⛏️", label: "Daily Work", onClick: () => go("daily-labour") },
                { icon: "🛡️", label: "Welfare", onClick: () => go("welfare") },
                { icon: "📜", label: "My Passport", onClick: () => go("skill-passport") },
                { icon: "📚", label: "Training", onClick: () => go("training") },
                { icon: "🔤", label: "Simple Mode", onClick: () => go("low-literacy") },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={a.onClick}
                  className="rounded-2xl p-3 flex flex-col items-center gap-2 transition-all active:scale-95"
                  style={{ background: "white", border: "1px solid var(--border)" }}
                >
                  <span className="text-2xl">{a.icon}</span>
                  <span className="text-[10px] font-semibold text-center" style={{ color: "var(--foreground)" }}>{a.label}</span>
                </button>
              ))}
            </div>

            {/* Offline mode toggle */}
            <div className="rounded-2xl p-3 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>Offline Mode</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Access jobs without internet</div>
                </div>
                <button
                  onClick={() => { setOfflineMode(!offlineMode); go("offline"); }}
                  className="w-12 h-6 rounded-full transition-all relative"
                  style={{ background: offlineMode ? "var(--secondary)" : "var(--muted)" }}
                >
                  <div className="w-4 h-4 rounded-full bg-white absolute top-1 transition-all" style={{ left: offlineMode ? "28px" : "4px" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <BottomNav tabs={workerTabs} active={tab} onChange={handleTab} primary="var(--secondary)" />
      </div>
    );
  }

  // ─── JOB REQUEST ─────────────────────────────────────────────────────────────
  if (screen === "job-request") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="New Job Request" onBack={() => go("home")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* Notification preview */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: "#25D366", color: "white" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💬</span>
              <span className="font-bold text-sm">WhatsApp Notification</span>
            </div>
            <div className="rounded-xl p-3" style={{ background: "rgba(0,0,0,0.15)" }}>
              <p className="text-sm font-medium mb-1">New job request:</p>
              <p className="text-sm">Plumbing · Today, 4 PM · 1.8 km away · Est. ₹400</p>
              <div className="flex gap-3 mt-2">
                <span className="font-bold text-sm">Reply 1 to Accept</span>
                <span className="font-bold text-sm">2 to Decline</span>
              </div>
            </div>
            <p className="text-xs mt-2 opacity-70">SMS fallback also sent. Voice/IVR: "1 dabayein"</p>
          </div>

          <div className="rounded-2xl p-5 mb-4" style={{ background: "white", border: "2px solid var(--primary)" }}>
            <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <h3 className="font-bold" style={{ color: "var(--foreground)" }}>Tap Repair</h3>
              <div>
                <div className="font-bold text-xl text-right" style={{ color: "var(--primary)" }}>₹400</div>
                <div className="text-xs text-right" style={{ color: "var(--muted-foreground)" }}>estimated</div>
              </div>
            </div>

            {/* Problem image */}
            <div className="rounded-xl mb-4 overflow-hidden relative" style={{ height: "100px", background: "#1C1917" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl">🚿</div>
                  <p className="text-white/60 text-xs mt-1">Customer's problem photo</p>
                </div>
              </div>
            </div>

            {[
              { label: "Customer Location", value: "34 Park Ave, Haldia" },
              { label: "Distance", value: "1.8 km" },
              { label: "Est. Duration", value: "45 minutes" },
              { label: "Est. Earnings", value: "₹400 (90% of ₹444)" },
              { label: "Date / Time", value: "Today at 4:00 PM" },
            ].map((d) => (
              <div key={d.label} className="flex justify-between py-2 text-sm" style={{ borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--muted-foreground)" }}>{d.label}</span>
                <span className="font-semibold" style={{ color: "var(--foreground)" }}>{d.value}</span>
              </div>
            ))}

            <div className="mt-3 rounded-xl p-3" style={{ background: "var(--muted)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--foreground)" }}>Recommended tools</p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>• Pipe wrench • PTFE tape • Replacement connector</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => go("home")} className="flex-1 py-4 rounded-2xl font-bold text-base border-2" style={{ borderColor: "#DC2626", color: "#DC2626", background: "rgba(220,38,38,0.05)" }}>
              ✗ Decline
            </button>
            <button onClick={() => go("active-job")} className="flex-1 py-4 rounded-2xl font-bold text-base text-white" style={{ background: "var(--secondary)" }}>
              ✓ Accept
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── ACTIVE JOB ──────────────────────────────────────────────────────────────
  if (screen === "active-job") {
    const stages = [
      { id: "on-way", label: "I'm On My Way", icon: "🚶", done: ["on-way", "arrived", "working", "done"].includes(jobStage) },
      { id: "arrived", label: "I've Arrived", icon: "📍", done: ["arrived", "working", "done"].includes(jobStage) },
      { id: "working", label: "Start Work", icon: "🔧", done: ["working", "done"].includes(jobStage) },
      { id: "done", label: "Complete Job", icon: "✅", done: jobStage === "done" },
    ] as const;

    const nextStage = { accepted: "on-way", "on-way": "arrived", arrived: "working", working: "done", done: "done" } as const;

    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Job in Progress" onBack={() => go("home")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "var(--secondary)" }}>AG</div>
              <div>
                <div className="font-bold" style={{ color: "var(--foreground)" }}>Ankit Gupta</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Customer · Tap Repair</div>
              </div>
              <div className="ml-auto text-right">
                <div className="font-bold" style={{ color: "var(--primary)" }}>₹400</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>estimated</div>
              </div>
            </div>
            <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>📍 34 Park Avenue, Haldia</div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden mb-4 relative" style={{ height: "140px", background: "#e8e0d8" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl">🗺️</div>
                <p className="text-xs" style={{ color: "#78716C" }}>Navigate to customer</p>
              </div>
            </div>
          </div>

          {/* Progress stages */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: "var(--foreground)" }}>Job Progress</h3>
            <div className="flex justify-between mb-4">
              {stages.map((s, i) => (
                <div key={s.id} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl mb-1"
                    style={{ background: s.done ? "var(--secondary)" : "var(--muted)", border: s.id === jobStage && !s.done ? "2px solid var(--primary)" : "none" }}
                  >
                    {s.done ? "✅" : s.icon}
                  </div>
                  <span className="text-[9px] text-center leading-tight" style={{ color: s.done ? "var(--secondary)" : "var(--muted-foreground)" }}>{s.label}</span>
                  {i < stages.length - 1 && (
                    <div className="absolute" />
                  )}
                </div>
              ))}
            </div>
            {jobStage !== "done" && (
              <button
                onClick={() => {
                  const next = nextStage[jobStage];
                  setJobStage(next);
                  if (next === "done") go("job-complete");
                }}
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white"
                style={{ background: "var(--secondary)" }}
              >
                {stages.find((s) => s.id === nextStage[jobStage])?.label} →
              </button>
            )}
          </div>

          {/* Emergency */}
          <button className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 mb-3 border-2" style={{ borderColor: "#DC2626", color: "#DC2626", background: "rgba(220,38,38,0.05)" }}>
            🆘 Safety / Emergency
          </button>

          <div className="rounded-xl p-3 text-xs" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            🔒 Your live location is being shared with the customer during this booking only.
          </div>
        </div>
      </div>
    );
  }

  // ─── JOB COMPLETE ────────────────────────────────────────────────────────────
  if (screen === "job-complete") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Complete Job" onBack={() => go("active-job")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="text-center mb-5">
            <div className="text-5xl mb-3">📸</div>
            <h2 className="text-xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Upload Completion Photo</h2>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Optional: Show the completed work</p>
          </div>

          <div className="rounded-2xl p-4 mb-4 flex flex-col items-center justify-center" style={{ height: "120px", background: "var(--muted)", border: "2px dashed var(--border)" }}>
            <span className="text-3xl mb-2">📷</span>
            <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>Tap to take photo</span>
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>Job Notes (optional)</label>
            <textarea className="w-full text-sm p-3 rounded-xl border focus:outline-none resize-none" style={{ borderColor: "var(--border)", background: "var(--muted)" }} rows={3} placeholder="e.g. Replaced washer and PTFE tape. Fixed leakage." />
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>Parts Used (optional)</label>
            <input className="w-full text-sm p-3 rounded-xl border focus:outline-none" style={{ borderColor: "var(--border)", background: "var(--muted)" }} placeholder="e.g. PTFE tape ₹30, Washer ₹15" />
          </div>

          <button onClick={() => { setJobStage("accepted"); go("earnings"); }} className="w-full py-4 rounded-2xl font-bold text-base text-white mb-3" style={{ background: "var(--secondary)" }}>
            ✅ Mark Job Complete
          </button>
          <button onClick={() => { setJobStage("accepted"); go("earnings"); }} className="w-full py-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
            Complete without photo
          </button>
        </div>
      </div>
    );
  }

  // ─── EARNINGS ────────────────────────────────────────────────────────────────
  if (screen === "earnings") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="My Earnings" />
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: "Today", value: "₹1,250", icon: "📅" },
              { label: "This Week", value: "₹6,800", icon: "📆" },
              { label: "This Month", value: "₹18,400", icon: "🗓️" },
              { label: "Pending", value: "₹800", icon: "⏳" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid var(--border)" }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Income Stability</h3>
              <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "rgba(26,122,94,0.1)", color: "var(--secondary)" }}>Good</span>
            </div>
            <div className="h-2 rounded-full mb-2" style={{ background: "var(--muted)" }}>
              <div className="h-2 rounded-full" style={{ width: "72%", background: "var(--secondary)" }} />
            </div>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>73 jobs completed this month · Above cooperative average</p>
          </div>

          {/* Recent payments */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>Recent Payments</h3>
            {[
              { service: "Tap Repair — Ankit G.", date: "12 Sep", amount: "₹400", status: "Received" },
              { service: "Fan Repair — Priya B.", date: "12 Sep", amount: "₹350", status: "Received" },
              { service: "Home Wiring — Debjani R.", date: "11 Sep", amount: "₹600", status: "Received" },
              { service: "Wiring — Vikram M.", date: "11 Sep", amount: "₹500", status: "Pending" },
            ].map((p) => (
              <div key={p.service} className="flex justify-between py-2.5 text-sm" style={{ borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div className="font-medium" style={{ color: "var(--foreground)" }}>{p.service}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold" style={{ color: "var(--foreground)" }}>{p.amount}</div>
                  <div className="text-xs" style={{ color: p.status === "Received" ? "var(--secondary)" : "var(--accent)" }}>{p.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomNav tabs={workerTabs} active="earnings" onChange={handleTab} primary="var(--secondary)" />
      </div>
    );
  }

  // ─── SCHEDULE ────────────────────────────────────────────────────────────────
  if (screen === "schedule") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="My Schedule" />
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"].map((d, i) => (
              <button key={d} className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: i === 0 ? "var(--primary)" : "white", color: i === 0 ? "white" : "var(--foreground)", border: i === 0 ? "none" : "1px solid var(--border)" }}>
                {d}
              </button>
            ))}
          </div>

          {workerSchedule.map((s) => (
            <div key={s.id} className="flex gap-3 mb-3">
              <div className="w-14 text-xs text-right pt-1" style={{ color: "var(--muted-foreground)" }}>{s.time}</div>
              <div
                className="flex-1 rounded-xl p-3"
                style={{
                  background: s.type === "travel" ? "var(--muted)" : s.type === "upcoming" ? "rgba(26,122,94,0.08)" : "white",
                  border: s.type === "job" ? "1px solid var(--border)" : s.type === "upcoming" ? "1px solid rgba(26,122,94,0.3)" : "none",
                }}
              >
                <div className="text-sm font-semibold" style={{ color: s.type === "travel" ? "var(--muted-foreground)" : "var(--foreground)" }}>{s.title}</div>
                {s.customer && <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{s.customer}</div>}
                {s.type === "travel" && <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{(s as { distance?: string }).distance}</div>}
              </div>
            </div>
          ))}

          <div className="rounded-xl p-3 mt-2" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            <p className="text-xs">📅 Travel time is automatically added between jobs to prevent schedule conflicts.</p>
          </div>
        </div>
        <BottomNav tabs={workerTabs} active="schedule" onChange={handleTab} primary="var(--secondary)" />
      </div>
    );
  }

  // ─── DAILY LABOUR ────────────────────────────────────────────────────────────
  if (screen === "daily-labour") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Work Today" onBack={() => go("home")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-4 mb-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg, var(--primary) 0%, #c4520a 100%)" }}>
            <div>
              <div className="text-white font-bold">Ready to work today?</div>
              <div className="text-orange-100 text-xs mt-1">Let contractors know you're available</div>
            </div>
            <button className="bg-white font-bold text-sm px-3 py-2 rounded-xl" style={{ color: "var(--primary)" }}>
              I'm Available!
            </button>
          </div>

          <h3 className="font-bold mb-3" style={{ color: "var(--foreground)" }}>Jobs Near You</h3>
          {dailyJobs.map((j) => (
            <div key={j.id} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{j.title}</span>
                <span className="font-bold" style={{ color: "var(--primary)" }}>{j.pay}</span>
              </div>
              <div className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>📍 {j.distance} · ⏰ {j.time} · 📅 {j.date}</div>
              <div className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>Employer: {j.employer} · {j.workers} workers needed</div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "var(--primary)" }}>Apply Now</button>
                <button className="py-2.5 px-3 rounded-xl text-sm font-semibold border" style={{ borderColor: "var(--border)" }}>Details</button>
              </div>
            </div>
          ))}

          {/* Mobility opportunity */}
          <div className="rounded-2xl p-4" style={{ background: "rgba(232,98,10,0.05)", border: "1px solid rgba(232,98,10,0.2)" }}>
            <div className="text-sm font-bold mb-2" style={{ color: "var(--primary)" }}>🚀 Temporary Work Opportunity</div>
            <div className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>High demand in Zone A – Haldia</div>
            <div className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>Role: Plumber · 7 days · 6–8 jobs/day · Est. ₹4,500/day · 18 km</div>
            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
              <div style={{ color: "var(--foreground)" }}>🚌 Transport: Available</div>
              <div style={{ color: "var(--foreground)" }}>🏠 Stay: Available</div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "var(--primary)" }}>I'm Interested</button>
              <button className="flex-1 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: "var(--border)" }}>Not Now</button>
            </div>
            <p className="text-xs mt-2 text-center" style={{ color: "var(--muted-foreground)" }}>Your choice. No obligation to accept.</p>
          </div>
        </div>
      </div>
    );
  }

  // ─── WELFARE ─────────────────────────────────────────────────────────────────
  if (screen === "welfare") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="My Welfare" onBack={() => go("home")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-5 mb-4" style={{ background: "linear-gradient(135deg, #1A7A5E 0%, #155f4b 100%)" }}>
            <div className="text-green-100 text-sm mb-1">Insurance Status</div>
            <div className="text-white text-2xl font-bold mb-1">Active ✅</div>
            <div className="text-green-100 text-sm">Coverage: ₹5,00,000</div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: "Welfare Fund", value: "₹2,400", icon: "💰" },
              { label: "Trainings Done", value: "2", icon: "📚" },
              { label: "Claims Filed", value: "0", icon: "📋" },
              { label: "Emergency Fund", value: "Available", icon: "🆘" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid var(--border)" }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-bold text-base" style={{ color: "var(--foreground)" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-3 text-xs mb-4" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            ℹ️ Mock data shown. Government/insurance integration planned for production deployment.
          </div>
        </div>
      </div>
    );
  }

  // ─── SKILL PASSPORT ──────────────────────────────────────────────────────────
  if (screen === "skill-passport") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Digital Skill Passport" onBack={() => go("home")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl overflow-hidden mb-4" style={{ border: "1px solid var(--border)" }}>
            <div className="p-4" style={{ background: "linear-gradient(135deg, #1C1917 0%, #292524 100%)" }}>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-xl" style={{ background: "var(--primary)" }}>RK</div>
                <div>
                  <div className="text-white font-bold text-lg">Ramesh Kumar</div>
                  <div className="text-white/60 text-sm">Electrician</div>
                  <div className="text-white/60 text-xs mt-1">ABC Labour Cooperative, Haldia</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div><div className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>Experience</div><div className="font-bold" style={{ color: "var(--foreground)" }}>5 years</div></div>
                <div><div className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>Jobs Done</div><div className="font-bold" style={{ color: "var(--foreground)" }}>287</div></div>
                <div><div className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>Rating</div><div className="font-bold" style={{ color: "var(--foreground)" }}>⭐ 4.8</div></div>
                <div><div className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>Work History</div><div className="font-bold" style={{ color: "var(--secondary)" }}>✓ Verified</div></div>
              </div>
              <div className="mb-3">
                <div className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>SKILLS</div>
                <div className="flex flex-wrap gap-2">
                  {["Electrician", "Fan Repair", "Basic Wiring", "Switch/Socket"].map((s) => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(232,98,10,0.08)", color: "var(--primary)" }}>{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>CERTIFICATIONS</div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "var(--secondary)" }}>✓ Electrical Level 2</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl p-3 text-xs" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            🔗 This passport is valid across all participating cooperatives in the SahyogWork network.
          </div>
        </div>
      </div>
    );
  }

  // ─── TRAINING ────────────────────────────────────────────────────────────────
  if (screen === "training") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Training Recommendations" onBack={() => go("home")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>Based on demand in your area — Haldia, WB</p>
          {[
            { skill: "AC Repair – Basic", demand: "Critical", pct: "+42%", jobs: 18, color: "#DC2626" },
            { skill: "Solar Panel Basic", demand: "High", pct: "+28%", jobs: 10, color: "#EA580C" },
            { skill: "EV Charging Setup", demand: "Medium", pct: "+35%", jobs: 7, color: "#CA8A04" },
          ].map((t) => (
            <div key={t.skill} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{t.skill}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${t.color}15`, color: t.color }}>{t.demand}</span>
              </div>
              <p className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>Demand increased {t.pct} in your service area</p>
              <p className="text-xs font-medium mb-3" style={{ color: "var(--secondary)" }}>Could make you eligible for {t.jobs} additional monthly jobs</p>
              <button className="w-full py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "var(--primary)" }}>View Training →</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── LOW LITERACY MODE ───────────────────────────────────────────────────────
  if (screen === "low-literacy") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <div className="flex items-center justify-between px-5 pt-8 pb-4" style={{ background: "white" }}>
          <button onClick={() => go("home")} className="text-2xl">←</button>
          <span className="font-bold" style={{ color: "var(--foreground)" }}>Simple Mode / सरल मोड</span>
          <div />
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { icon: "🏠", label: "Jobs", sub: "काम" },
              { icon: "📅", label: "Schedule", sub: "समय सूची" },
              { icon: "💰", label: "Earnings", sub: "कमाई" },
              { icon: "💬", label: "Messages", sub: "संदेश" },
            ].map((m) => (
              <button key={m.label} className="rounded-3xl p-6 flex flex-col items-center gap-2 transition-all active:scale-95" style={{ background: "white", border: "2px solid var(--border)" }}>
                <span className="text-5xl">{m.icon}</span>
                <span className="font-bold text-base" style={{ color: "var(--foreground)" }}>{m.label}</span>
                <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{m.sub}</span>
              </button>
            ))}
          </div>

          <button className="w-full py-5 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-3 mb-4" style={{ background: "var(--primary)" }}>
            🎙️ Ask about today's work
          </button>

          <div className="rounded-2xl p-4" style={{ background: "rgba(26,122,94,0.08)", border: "1px solid rgba(26,122,94,0.2)" }}>
            <div className="font-semibold text-sm mb-1" style={{ color: "var(--secondary)" }}>🔊 Voice message:</div>
            <p className="text-base font-bold" style={{ color: "var(--foreground)" }}>"Your next booking is at 4 PM."</p>
            <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>आपकी अगली बुकिंग शाम 4 बजे है।</p>
          </div>
        </div>
      </div>
    );
  }

  // ─── OFFLINE MODE ────────────────────────────────────────────────────────────
  if (screen === "offline") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <div className="px-5 pt-8 pb-4 flex items-center justify-between" style={{ background: "#1C1917" }}>
          <button onClick={() => go("home")} className="text-2xl text-white">←</button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="text-white text-sm font-semibold">Offline Mode</span>
          </div>
          <div className="text-xs text-white/60">Sync 10:42 AM</div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-4 mb-4" style={{ background: "rgba(234,88,12,0.08)", border: "1px solid rgba(234,88,12,0.3)" }}>
            <div className="font-semibold text-sm mb-1" style={{ color: "var(--primary)" }}>📡 No internet connection</div>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Showing saved data. Some features unavailable.</p>
          </div>

          <h3 className="font-bold mb-3" style={{ color: "var(--foreground)" }}>Today's Jobs (Saved)</h3>
          {workerSchedule.filter((s) => s.type === "job" || s.type === "upcoming").map((s) => (
            <div key={s.id} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{s.title}</div>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.time} · {s.customer}</div>
            </div>
          ))}

          <div className="rounded-2xl p-4" style={{ background: "var(--muted)" }}>
            <div className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>📱 When internet returns:</div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>• All offline actions will sync automatically<br />• You'll receive any missed notifications<br />• Earnings will be updated</div>
          </div>
        </div>
      </div>
    );
  }

  // ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
  if (screen === "notifications") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Notifications" onBack={() => go("home")} />
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {[
            { icon: "💼", title: "New job request", body: "Plumbing · Today 4 PM · 1.8 km · Est. ₹400", time: "5 min ago", priority: true },
            { icon: "💰", title: "Payment received", body: "₹350 credited for fan repair job", time: "2 hrs ago", priority: false },
            { icon: "📅", title: "New booking confirmed", body: "Wiring job tomorrow 9 AM — Sector 4", time: "Yesterday", priority: false },
            { icon: "🚀", title: "Work opportunity nearby", body: "High demand in Zone A. 7-day temp work available", time: "1 day ago", priority: false },
          ].map((n) => (
            <div key={n.title} className="rounded-2xl p-4 mb-3 flex items-start gap-3" style={{ background: n.priority ? "rgba(232,98,10,0.04)" : "white", border: `1px solid ${n.priority ? "rgba(232,98,10,0.3)" : "var(--border)"}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: n.priority ? "rgba(232,98,10,0.1)" : "var(--muted)" }}>
                {n.icon}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{n.title}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{n.body}</div>
                <div className="text-[10px] mt-1" style={{ color: "var(--muted-foreground)" }}>{n.time}</div>
              </div>
              {n.priority && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: "var(--primary)" }} />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── PROFILE ─────────────────────────────────────────────────────────────────
  if (screen === "profile") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="My Profile" />
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="flex flex-col items-center px-5 py-6" style={{ background: "white" }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-2xl mb-3" style={{ background: "var(--primary)" }}>RK</div>
            <h2 className="font-bold text-lg" style={{ color: "var(--foreground)" }}>Ramesh Kumar</h2>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Electrician · ⭐ 4.8 · 287 jobs</p>
            <p className="text-xs mt-1" style={{ color: "var(--secondary)" }}>ABC Labour Cooperative · Haldia</p>
          </div>
          <div className="px-4 py-3">
            {[
              { icon: "👤", label: "Personal Details" },
              { icon: "⚡", label: "Skills & Verification", onClick: () => go("skill-passport") },
              { icon: "📅", label: "Availability Settings" },
              { icon: "💳", label: "Payment Details" },
              { icon: "🔒", label: "Privacy Settings" },
              { icon: "🛡️", label: "Welfare & Insurance", onClick: () => go("welfare") },
              { icon: "🏛️", label: "Cooperative Membership" },
              { icon: "🌐", label: "Language" },
              { icon: "📱", label: "Simple Mode", onClick: () => go("low-literacy") },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 py-4" style={{ borderBottom: "1px solid var(--border)" }} onClick={s.onClick}>
                <span className="text-xl">{s.icon}</span>
                <span className="flex-1 text-sm font-medium" style={{ color: "var(--foreground)" }}>{s.label}</span>
                <span style={{ color: "var(--muted-foreground)" }}>→</span>
              </div>
            ))}
          </div>
        </div>
        <BottomNav tabs={workerTabs} active="profile" onChange={handleTab} primary="var(--secondary)" />
      </div>
    );
  }

  return null;
}
