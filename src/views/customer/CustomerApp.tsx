import { useState } from "react";
import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import type { AppMode } from "../../App";
import { workers, myWorkers, chatMessages, communityLeaderboard, notifications } from "../../mockData";

type CustomerScreen =
  | "home" | "plumbing" | "ai-diagnosis" | "booking-type" | "worker-search"
  | "fair-matching" | "worker-profile" | "smart-scheduling" | "booking-confirm"
  | "live-tracking" | "job-complete" | "payment" | "invoice" | "review"
  | "my-workers" | "add-worker" | "worker-details" | "release-engage" | "find-replacement"
  | "chat" | "notifications" | "community" | "bookings" | "profile" | "daily-labour";

const bottomTabs = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "bookings", icon: "📅", label: "Bookings" },
  { id: "my-workers", icon: "👥", label: "My Workers" },
  { id: "chat", icon: "💬", label: "Messages" },
  { id: "profile", icon: "👤", label: "Profile" },
];

const categories = [
  { icon: "🧹", label: "Maid" }, { icon: "👨‍🍳", label: "Cook" },
  { icon: "🫧", label: "Cleaner" }, { icon: "⚡", label: "Electrician" },
  { icon: "🔧", label: "Plumber" }, { icon: "🪚", label: "Carpenter" },
  { icon: "📦", label: "Porter" }, { icon: "🛡️", label: "Security" },
  { icon: "🚗", label: "Driver" }, { icon: "🌱", label: "Gardener" },
  { icon: "💅", label: "Beauty" }, { icon: "🌸", label: "Mehendi" },
  { icon: "⛏️", label: "Daily Labour" }, { icon: "➕", label: "More" },
];

export default function CustomerApp({ onNavigate }: { onNavigate: (m: AppMode) => void }) {
  const [screen, setScreen] = useState<CustomerScreen>("home");
  const [tab, setTab] = useState("home");
  const [selectedWorker] = useState(workers[0]);
  const [chatInput, setChatInput] = useState("");
  const [msgs, setMsgs] = useState(chatMessages);
  const [rating, setRating] = useState(0);
  const [uploadedPhoto, setUploadedPhoto] = useState(false);
  const [endEngagement, setEndEngagement] = useState(false);

  const go = (s: CustomerScreen) => setScreen(s);

  const handleTab = (t: string) => {
    setTab(t);
    if (t === "home") go("home");
    else if (t === "bookings") go("bookings");
    else if (t === "my-workers") go("my-workers");
    else if (t === "chat") go("chat");
    else if (t === "profile") go("profile");
  };

  // ─── HOME ───────────────────────────────────────────────────────────────────
  if (screen === "home") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <div className="overflow-y-auto pb-20">
          {/* Header */}
          <div className="px-5 pt-10 pb-5" style={{ background: "white" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Good evening 🌆</p>
                <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Ayush Gupta</h1>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>📍 Haldia, West Bengal</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => go("notifications")} className="w-10 h-10 rounded-full flex items-center justify-center relative" style={{ background: "var(--muted)" }}>
                  🔔
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full" style={{ background: "var(--primary)" }} />
                </button>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "var(--primary)" }}>AG</div>
              </div>
            </div>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: "var(--muted)" }}
              onClick={() => go("plumbing")}
            >
              <span>🔍</span>
              <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>What service do you need?</span>
            </div>
          </div>

          <div className="px-4 mt-4">
            {/* Emergency card */}
            <div
              className="rounded-2xl p-4 mb-4 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)" }}
            >
              <div className="text-3xl">🚨</div>
              <div className="flex-1">
                <div className="text-white font-bold text-base">Need help right now?</div>
                <div className="text-red-100 text-xs">Emergency workers available in 15–20 min</div>
              </div>
              <button className="bg-white text-red-600 font-bold text-sm px-3 py-2 rounded-xl">
                Emergency
              </button>
            </div>

            {/* Categories */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base" style={{ color: "var(--foreground)" }}>Services</h3>
                <button className="text-xs font-semibold" style={{ color: "var(--primary)" }}>See all</button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {categories.slice(0, 10).map((c) => (
                  <button
                    key={c.label}
                    onClick={() => go("plumbing")}
                    className="flex flex-col items-center gap-1.5 active:scale-95 transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl" style={{ background: "white" }}>
                      {c.icon}
                    </div>
                    <span className="text-[9px] font-medium text-center leading-tight" style={{ color: "var(--foreground)" }}>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div className="mb-4">
              <h3 className="font-bold text-base mb-3" style={{ color: "var(--foreground)" }}>Upcoming</h3>
              <div
                className="rounded-2xl p-4"
                style={{ background: "white", border: "1px solid var(--border)" }}
                onClick={() => go("live-tracking")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(232,98,10,0.1)" }}>⚡</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>Electrician — Tap Repair</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Today, 5:30 PM · Ramesh Kumar</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold rounded-full px-2 py-0.5" style={{ background: "rgba(26,122,94,0.1)", color: "var(--secondary)" }}>Confirmed</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={(e) => { e.stopPropagation(); go("live-tracking"); }} className="flex-1 py-2 rounded-xl text-xs font-semibold" style={{ background: "var(--primary)", color: "white" }}>Track</button>
                  <button onClick={(e) => { e.stopPropagation(); go("chat"); }} className="flex-1 py-2 rounded-xl text-xs font-semibold border" style={{ borderColor: "var(--border)" }}>Chat</button>
                </div>
              </div>
            </div>

            {/* My Workers */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base" style={{ color: "var(--foreground)" }}>My Workers</h3>
                <button onClick={() => { setTab("my-workers"); go("my-workers"); }} className="text-xs font-semibold" style={{ color: "var(--primary)" }}>Manage</button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {myWorkers.map((w) => (
                  <div key={w.id} className="flex-shrink-0 flex flex-col items-center gap-1.5 w-16 active:scale-95" onClick={() => go("my-workers")}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-base" style={{ background: "var(--secondary)" }}>
                      {w.avatar}
                    </div>
                    <span className="text-[10px] font-semibold text-center" style={{ color: "var(--foreground)" }}>{w.name.split(" ")[0]}</span>
                    <span className="text-[9px]" style={{ color: "var(--muted-foreground)" }}>{w.role}</span>
                  </div>
                ))}
                <div className="flex-shrink-0 flex flex-col items-center gap-1.5 w-16" onClick={() => go("add-worker")}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl border-2 border-dashed" style={{ borderColor: "var(--border)" }}>+</div>
                  <span className="text-[10px] font-semibold" style={{ color: "var(--primary)" }}>Add</span>
                </div>
              </div>
            </div>

            {/* Recommended */}
            <div className="mb-4">
              <h3 className="font-bold text-base mb-3" style={{ color: "var(--foreground)" }}>Recommended Near You</h3>
              {workers.slice(0, 2).map((w) => (
                <div
                  key={w.id}
                  className="rounded-2xl p-4 mb-3 flex items-center gap-3"
                  style={{ background: "white", border: "1px solid var(--border)" }}
                  onClick={() => go("worker-profile")}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "var(--primary)" }}>
                    {w.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{w.name}</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{w.role} · {w.distance} · ⭐ {w.rating}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--secondary)" }}>✓ Verified · Available {w.eta}</div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); go("booking-confirm"); }} className="px-3 py-2 rounded-xl text-xs font-bold" style={{ background: "var(--primary)", color: "white" }}>Book</button>
                </div>
              ))}
            </div>

            {/* Community */}
            <div
              className="rounded-2xl p-4 mb-4"
              style={{ background: "linear-gradient(135deg, #1A7A5E 0%, #155f4b 100%)" }}
              onClick={() => go("community")}
            >
              <div className="font-bold text-white text-base mb-1">Help a Worker Join</div>
              <div className="text-green-100 text-xs mb-3">Know a local worker? Help them join the cooperative and earn community points.</div>
              <button onClick={(e) => { e.stopPropagation(); go("add-worker"); }} className="bg-white font-bold text-sm px-4 py-2 rounded-xl" style={{ color: "var(--secondary)" }}>
                + Add a Worker
              </button>
            </div>
          </div>
        </div>
        <BottomNav tabs={bottomTabs} active={tab} onChange={handleTab} />
      </div>
    );
  }

  // ─── PLUMBING / SERVICE DISCOVERY ───────────────────────────────────────────
  if (screen === "plumbing") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Plumbing Services" onBack={() => go("home")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { icon: "🚿", label: "Tap Repair", popular: true },
              { icon: "💧", label: "Pipe Leakage" },
              { icon: "🚽", label: "Drain Blockage" },
              { icon: "🛁", label: "Bathroom Repair" },
              { icon: "🔩", label: "Installation" },
              { icon: "➕", label: "Other" },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => go("ai-diagnosis")}
                className="p-4 rounded-2xl text-left relative transition-all active:scale-95"
                style={{ background: "white", border: "1px solid var(--border)" }}
              >
                {s.popular && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(232,98,10,0.1)", color: "var(--primary)" }}>Popular</span>
                )}
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{s.label}</div>
              </button>
            ))}
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>Describe your problem</label>
            <textarea
              className="w-full px-3 py-2.5 rounded-xl text-sm border focus:outline-none resize-none"
              style={{ borderColor: "var(--border)", background: "var(--muted)" }}
              rows={3}
              placeholder="e.g. Kitchen tap is dripping constantly..."
              defaultValue="Kitchen tap is dripping constantly and wasting water."
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { setUploadedPhoto(true); go("ai-diagnosis"); }}
                className="flex-1 py-3 rounded-xl text-sm font-semibold border transition-all active:scale-95"
                style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "white" }}
              >
                📷 Upload Photo/Video
              </button>
            </div>
          </div>

          <div
            className="rounded-2xl p-4"
            style={{ background: "rgba(232,98,10,0.05)", border: "1px solid rgba(232,98,10,0.2)" }}
            onClick={() => go("ai-diagnosis")}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🤖</span>
              <span className="font-bold text-sm" style={{ color: "var(--primary)" }}>Not sure what service you need?</span>
            </div>
            <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>Upload a photo and let AI identify the problem and suggest the right service.</p>
            <button className="py-3 w-full rounded-xl font-bold text-sm text-white" style={{ background: "var(--primary)" }}>
              🔍 Analyze Problem
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── AI DIAGNOSIS ────────────────────────────────────────────────────────────
  if (screen === "ai-diagnosis") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="AI Problem Analysis" onBack={() => go("plumbing")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* Photo preview */}
          <div className="rounded-2xl overflow-hidden mb-4 relative" style={{ height: "180px", background: "#1C1917" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-2">🚿</div>
                <p className="text-white/60 text-xs">Uploaded image: Leaking kitchen tap</p>
              </div>
            </div>
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Analyzed
            </div>
          </div>

          {/* AI result */}
          <div className="rounded-2xl p-5 mb-4" style={{ background: "white", border: "2px solid var(--primary)" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🤖</span>
              <span className="font-bold text-sm" style={{ color: "var(--primary)" }}>Possible Issue Detected</span>
            </div>
            <h2 className="text-xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Pipe / Tap Leakage</h2>
            <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>Worn-out washer or loose fitting detected in the tap assembly.</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl p-3" style={{ background: "var(--muted)" }}>
                <div className="text-xs font-semibold mb-1" style={{ color: "var(--muted-foreground)" }}>SUGGESTED SERVICE</div>
                <div className="font-bold" style={{ color: "var(--foreground)" }}>🔧 Plumber</div>
              </div>
              <div className="rounded-xl p-3" style={{ background: "var(--muted)" }}>
                <div className="text-xs font-semibold mb-1" style={{ color: "var(--muted-foreground)" }}>URGENCY</div>
                <div className="font-bold" style={{ color: "var(--secondary)" }}>⏰ Normal</div>
              </div>
            </div>

            <div className="rounded-xl p-3 mb-1" style={{ background: "var(--muted)" }}>
              <div className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>SUGGESTED TOOLS</div>
              {["Pipe wrench", "PTFE tape", "Replacement connector"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm py-0.5" style={{ color: "var(--foreground)" }}>
                  <span style={{ color: "var(--primary)" }}>•</span> {t}
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs mb-4 px-2" style={{ color: "var(--muted-foreground)" }}>
            ⚠️ AI suggestions are estimates. Final diagnosis is done by the worker.
          </p>

          <button
            onClick={() => go("booking-type")}
            className="w-full py-4 rounded-2xl font-bold text-base text-white mb-3 active:scale-98"
            style={{ background: "var(--primary)" }}
          >
            Find a Plumber →
          </button>
          <button
            onClick={() => go("plumbing")}
            className="w-full py-3 rounded-2xl font-semibold text-sm border active:scale-98"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            Edit Problem
          </button>
        </div>
      </div>
    );
  }

  // ─── BOOKING TYPE ────────────────────────────────────────────────────────────
  if (screen === "booking-type") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Choose Booking Type" onBack={() => go("ai-diagnosis")} />
        <div className="flex-1 px-4 py-4 flex flex-col gap-4">
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>How would you like to book this service?</p>
          {[
            { icon: "⚡", title: "Now", sub: "Find the nearest available worker", badge: "Fastest", color: "#DC2626", onClick: () => go("worker-search") },
            { icon: "📅", title: "Schedule", sub: "Choose a specific date and time", badge: null, color: "var(--primary)", onClick: () => go("worker-search") },
            { icon: "🔁", title: "Recurring", sub: "Book this service regularly — e.g. every Mon–Fri", badge: "Save more", color: "var(--secondary)", onClick: () => go("worker-search") },
          ].map((t) => (
            <button
              key={t.title}
              onClick={t.onClick}
              className="rounded-2xl p-5 text-left flex items-start gap-4 transition-all active:scale-98"
              style={{ background: "white", border: "2px solid var(--border)" }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: `${t.color}15` }}>
                {t.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-lg" style={{ color: "var(--foreground)" }}>{t.title}</span>
                  {t.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${t.color}15`, color: t.color }}>{t.badge}</span>
                  )}
                </div>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{t.sub}</p>
              </div>
              <span className="text-xl mt-1" style={{ color: "var(--muted-foreground)" }}>→</span>
            </button>
          ))}

          {/* Scheduling modes info */}
          <div className="rounded-2xl p-4" style={{ background: "rgba(232,98,10,0.05)", border: "1px solid rgba(232,98,10,0.15)" }}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--primary)" }}>SERVICE-SPECIFIC MODES</p>
            {[
              { service: "Plumber", mode: "Emergency or Scheduled" },
              { service: "Maid / Cook", mode: "Recurring" },
              { service: "Porter", mode: "On-demand" },
              { service: "Security Guard", mode: "Shift booking" },
            ].map((s) => (
              <div key={s.service} className="flex justify-between text-xs py-1" style={{ color: "var(--foreground)" }}>
                <span className="font-medium">{s.service}</span>
                <span style={{ color: "var(--muted-foreground)" }}>{s.mode}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── WORKER SEARCH ───────────────────────────────────────────────────────────
  if (screen === "worker-search") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Nearby Plumbers" onBack={() => go("booking-type")} right={<span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>Filter</span>} />
        {/* Fake map */}
        <div className="relative mx-4 mt-2 rounded-2xl overflow-hidden" style={{ height: "180px", background: "#e8e0d8" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-1">🗺️</div>
              <p className="text-xs font-medium" style={{ color: "#78716C" }}>Haldia, West Bengal</p>
            </div>
          </div>
          {/* Worker pins */}
          {[
            { x: "35%", y: "40%", name: "RK", primary: true },
            { x: "62%", y: "55%", name: "RD", primary: false },
            { x: "25%", y: "65%", name: "PS", primary: false },
          ].map((p) => (
            <div key={p.name} className="absolute" style={{ left: p.x, top: p.y }}>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg border-2 border-white"
                style={{ background: p.primary ? "var(--primary)" : "var(--secondary)" }}
              >
                {p.name}
              </div>
            </div>
          ))}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-2 shadow">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--primary)" }} />
            Showing 6 workers nearby
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="text-xs font-semibold mb-3" style={{ color: "var(--muted-foreground)" }}>BEST MATCHES FOR YOU</div>
          {[workers[0], workers[2], workers[3]].map((w) => (
            <div key={w.id} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "var(--primary)" }}>
                  {w.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{w.name}</span>
                    <span className="text-xs">⭐ {w.rating}</span>
                  </div>
                  <div className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>{w.role} · {w.distance} · ETA {w.eta}</div>
                  <div className="flex flex-wrap gap-1">
                    {w.verified.identity && <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: "rgba(26,122,94,0.1)", color: "var(--secondary)" }}>✓ ID Verified</span>}
                    {w.verified.coop && <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: "rgba(26,122,94,0.1)", color: "var(--secondary)" }}>✓ Coop Member</span>}
                    {w.verified.skill && <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: "rgba(26,122,94,0.1)", color: "var(--secondary)" }}>✓ Skill Verified</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => go("worker-profile")} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border" style={{ borderColor: "var(--border)" }}>View Profile</button>
                <button onClick={() => go("fair-matching")} className="py-2.5 px-3 rounded-xl text-sm font-semibold border" style={{ borderColor: "var(--border)" }}>Why? 🤔</button>
                <button onClick={() => go("smart-scheduling")} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "var(--primary)" }}>Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── FAIR MATCHING ───────────────────────────────────────────────────────────
  if (screen === "fair-matching") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Fair Matching" onBack={() => go("worker-search")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-5 mb-4" style={{ background: "white" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "var(--primary)" }}>RK</div>
              <div>
                <div className="font-bold" style={{ color: "var(--foreground)" }}>Ramesh Kumar</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Electrician · ⭐ 4.8</div>
              </div>
            </div>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Ramesh was selected because he:</p>
            {[
              "Has the required skill (Plumbing)",
              "Can reach the location on time (20 min)",
              "Is currently available",
              "Has strong reliability (94% completion)",
              "Has received fewer jobs this week",
            ].map((r) => (
              <div key={r} className="flex items-start gap-2 py-1.5 text-sm" style={{ color: "var(--foreground)" }}>
                <span style={{ color: "var(--secondary)" }}>✓</span> {r}
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Matching Factors</p>
            {[
              { label: "Skill Match", pct: 30, color: "var(--primary)" },
              { label: "Distance", pct: 20, color: "var(--secondary)" },
              { label: "Availability", pct: 20, color: "#7C3AED" },
              { label: "Reliability", pct: 15, color: "#EA580C" },
              { label: "Fair Workload", pct: 15, color: "#0891B2" },
            ].map((f) => (
              <div key={f.label} className="mb-3">
                <div className="flex justify-between text-xs mb-1" style={{ color: "var(--foreground)" }}>
                  <span className="font-medium">{f.label}</span>
                  <span className="font-bold">{f.pct}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "var(--muted)" }}>
                  <div className="h-2 rounded-full" style={{ width: `${f.pct * 3}%`, background: f.color }} />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-3 mb-4" style={{ background: "rgba(26,122,94,0.05)", border: "1px solid rgba(26,122,94,0.2)" }}>
            <p className="text-xs text-center" style={{ color: "var(--secondary)" }}>
              ⚖️ Fairness prevents the same workers from receiving every booking. We consider skill, travel time, reliability and workload fairness.
            </p>
          </div>

          <button onClick={() => go("worker-profile")} className="w-full py-4 rounded-2xl font-bold text-base text-white" style={{ background: "var(--primary)" }}>
            View Ramesh's Profile →
          </button>
        </div>
      </div>
    );
  }

  // ─── WORKER PROFILE ──────────────────────────────────────────────────────────
  if (screen === "worker-profile") {
    const w = selectedWorker;
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar onBack={() => go("worker-search")} transparent />
        <div className="flex-1 overflow-y-auto pb-4">
          <div className="px-5 pt-2 pb-6 text-center" style={{ background: "white" }}>
            <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center font-bold text-white text-2xl mb-3" style={{ background: "var(--primary)" }}>
              {w.avatar}
            </div>
            <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{w.name}</h2>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{w.role}</p>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span>⭐ {w.rating}</span>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{w.jobs} completed jobs</span>
            </div>
          </div>

          <div className="px-4 py-4">
            {/* Verification */}
            <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>Verification Status</h3>
              {[
                { label: "Live Photo Verified", done: w.verified.livePhoto },
                { label: "Identity Verified", done: w.verified.identity },
                { label: "Cooperative Member", done: w.verified.coop },
                { label: "Skill Verified", done: w.verified.skill },
                { label: "Background Verification", done: w.verified.bg },
              ].map((v) => (
                <div key={v.label} className="flex items-center gap-2 py-1.5 text-sm" style={{ color: "var(--foreground)" }}>
                  <span style={{ color: v.done ? "var(--secondary)" : "var(--muted-foreground)" }}>{v.done ? "✓" : "○"}</span>
                  <span style={{ color: v.done ? "var(--foreground)" : "var(--muted-foreground)" }}>{v.label}</span>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>Skills</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {w.skills.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(232,98,10,0.08)", color: "var(--primary)" }}>{s}</span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { label: "Experience", value: w.experience },
                  { label: "Languages", value: w.languages.join(", ") },
                  { label: "Service Area", value: w.area },
                  { label: "Availability", value: w.availability },
                  { label: "Cooperative", value: w.cooperative || "—" },
                ].map((d) => (
                  <div key={d.label}>
                    <span className="font-semibold block mb-0.5" style={{ color: "var(--muted-foreground)" }}>{d.label}</span>
                    <span style={{ color: "var(--foreground)" }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-3 text-xs mb-4" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
              🔒 Phone number is hidden unless the worker chooses to share it.
            </div>
          </div>
        </div>

        <div className="px-4 pb-5 pt-3 border-t flex gap-3" style={{ borderColor: "var(--border)", background: "white" }}>
          <button onClick={() => go("chat")} className="flex-1 py-3.5 rounded-2xl font-semibold text-sm border" style={{ borderColor: "var(--border)" }}>
            💬 Chat
          </button>
          <button onClick={() => go("smart-scheduling")} className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white" style={{ background: "var(--primary)" }}>
            Book Now →
          </button>
        </div>
      </div>
    );
  }

  // ─── SMART SCHEDULING ────────────────────────────────────────────────────────
  if (screen === "smart-scheduling") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Worker's Schedule" onBack={() => go("worker-profile")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>Travel-aware scheduling prevents impossible appointments.</p>

          {/* Timeline */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: "var(--foreground)" }}>Today's Timeline — Ramesh Kumar</h3>
            {[
              { time: "08:00", end: "09:00", type: "job", label: "Fan repair — Sector 4" },
              { time: "09:00", end: "09:30", type: "travel", label: "🚶 Travel (3.2 km)" },
              { time: "09:30", end: "10:30", type: "job", label: "Switch installation — Park St." },
              { time: "10:30", end: "11:00", type: "travel", label: "🚶 Travel (2.1 km)" },
              { time: "11:00", end: "12:30", type: "job", label: "Home wiring — Salt Lake" },
              { time: "17:30", end: "18:15", type: "upcoming", label: "📍 Your booking: Tap repair" },
            ].map((s, i) => (
              <div key={i} className="flex gap-3 mb-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
                    style={{ background: s.type === "job" ? "var(--primary)" : s.type === "upcoming" ? "var(--secondary)" : "var(--muted-foreground)" }}
                  />
                  {i < 5 && <div className="w-0.5 h-6 mt-1" style={{ background: "var(--border)" }} />}
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: "var(--foreground)" }}>{s.time}</span>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>→ {s.end}</span>
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: s.type === "upcoming" ? "var(--secondary)" : s.type === "travel" ? "var(--muted-foreground)" : "var(--foreground)" }}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Conflict example */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.2)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span>⚠️</span>
              <span className="font-bold text-sm" style={{ color: "#DC2626" }}>Slot Unavailable: 9:15 AM</span>
            </div>
            <p className="text-xs mb-2" style={{ color: "var(--foreground)" }}>
              • Previous job ends at 9:00 AM<br />
              • Estimated travel time: 30 minutes<br />
              • Next available slot: <strong>9:30 AM</strong>
            </p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Travel-aware scheduling prevents impossible appointments.
            </p>
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "rgba(26,122,94,0.05)", border: "1px solid rgba(26,122,94,0.2)" }}>
            <div className="font-semibold text-sm mb-1" style={{ color: "var(--secondary)" }}>✓ Available slot confirmed</div>
            <div className="text-sm" style={{ color: "var(--foreground)" }}>Today, 5:30 PM – 6:15 PM</div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Worker has 45 min buffer before your booking</div>
          </div>

          <button onClick={() => go("booking-confirm")} className="w-full py-4 rounded-2xl font-bold text-base text-white" style={{ background: "var(--primary)" }}>
            Confirm This Slot →
          </button>
        </div>
      </div>
    );
  }

  // ─── BOOKING CONFIRM ─────────────────────────────────────────────────────────
  if (screen === "booking-confirm") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Confirm Booking" onBack={() => go("smart-scheduling")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-5 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "var(--primary)" }}>RK</div>
              <div>
                <div className="font-bold" style={{ color: "var(--foreground)" }}>Ramesh Kumar</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>⭐ 4.8 · 287 jobs · Electrician</div>
              </div>
            </div>
            {[
              { label: "Service", value: "Tap Repair (Plumbing)" },
              { label: "Date", value: "12 September 2026" },
              { label: "Time", value: "5:30 PM" },
              { label: "Location", value: "34 Park Avenue, Haldia" },
              { label: "Est. Duration", value: "45 minutes" },
              { label: "Travel Time", value: "~20 minutes" },
              { label: "Estimated Price", value: "₹350 – ₹500" },
            ].map((d) => (
              <div key={d.label} className="flex justify-between py-2.5 text-sm" style={{ borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--muted-foreground)" }}>{d.label}</span>
                <span className="font-semibold" style={{ color: "var(--foreground)" }}>{d.value}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-3 mb-4" style={{ background: "rgba(26,122,94,0.05)", border: "1px solid rgba(26,122,94,0.2)" }}>
            <p className="text-xs" style={{ color: "var(--secondary)" }}>
              📅 Your worker's schedule includes travel time to prevent overlapping appointments.
            </p>
          </div>

          <div className="rounded-xl p-3 mb-4" style={{ background: "var(--muted)" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--foreground)" }}>Payment</p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Pay after job completion via UPI / Cash. Price may vary based on actual work done.</p>
          </div>

          <button onClick={() => go("live-tracking")} className="w-full py-4 rounded-2xl font-bold text-base text-white mb-3 active:scale-98" style={{ background: "var(--primary)" }}>
            ✓ Confirm Booking
          </button>
          <button onClick={() => go("worker-search")} className="w-full py-3 rounded-2xl text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
            Choose a Different Worker
          </button>
        </div>
      </div>
    );
  }

  // ─── LIVE TRACKING ───────────────────────────────────────────────────────────
  if (screen === "live-tracking") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Tracking" onBack={() => go("home")} />
        {/* Map */}
        <div className="relative mx-4 mt-2 rounded-2xl overflow-hidden" style={{ height: "220px", background: "#e8e0d8" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl">🗺️</div>
            </div>
          </div>
          {/* Worker location */}
          <div className="absolute" style={{ left: "30%", top: "40%" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg" style={{ background: "var(--primary)" }}>RK</div>
            <div className="w-3 h-3 rounded-full mx-auto -mt-1" style={{ background: "var(--primary)", opacity: 0.3 }} />
          </div>
          {/* Your location */}
          <div className="absolute" style={{ left: "65%", top: "60%" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs shadow-lg border-2 border-white" style={{ background: "var(--secondary)" }}>You</div>
          </div>
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 text-xs font-semibold shadow flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--primary)" }} />
            Live location
          </div>
        </div>

        <div className="px-4 py-4 flex-1 flex flex-col gap-3">
          <div className="rounded-2xl p-4" style={{ background: "white", border: "2px solid var(--primary)" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "var(--primary)" }}>RK</div>
              <div className="flex-1">
                <p className="font-bold" style={{ color: "var(--foreground)" }}>Ramesh is on the way 🚶</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Tap Repair · Today 5:30 PM</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: "var(--primary)" }}>12</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>minutes away</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>1.4</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>km away</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: "var(--secondary)" }}>5:42</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>est. arrival</div>
              </div>
            </div>
          </div>

          <div className="text-xs rounded-xl p-3" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            🔒 Worker location is only shared during the active booking period. Location sharing stops automatically after job completion.
          </div>

          <div className="flex gap-3">
            <button onClick={() => go("chat")} className="flex-1 py-3.5 rounded-2xl font-semibold text-sm border" style={{ borderColor: "var(--border)", background: "white" }}>
              💬 Chat
            </button>
            <button onClick={() => go("job-complete")} className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white" style={{ background: "var(--secondary)" }}>
              ✓ Job Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── JOB COMPLETE ────────────────────────────────────────────────────────────
  if (screen === "job-complete") {
    return (
      <div className="h-full flex flex-col items-center justify-center px-5" style={{ background: "var(--background)" }}>
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-4" style={{ background: "rgba(26,122,94,0.1)" }}>
          ✅
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Job Completed!</h2>
        <p className="text-sm text-center mb-1" style={{ color: "var(--muted-foreground)" }}>Ramesh Kumar has completed tap repair.</p>
        <p className="text-sm text-center mb-6" style={{ color: "var(--muted-foreground)" }}>Duration: 42 minutes</p>

        <div className="w-full rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
          <div className="flex justify-between py-2 text-sm" style={{ borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--muted-foreground)" }}>Service</span>
            <span className="font-semibold" style={{ color: "var(--foreground)" }}>Tap Repair</span>
          </div>
          <div className="flex justify-between py-2 text-sm">
            <span style={{ color: "var(--muted-foreground)" }}>Amount Due</span>
            <span className="text-xl font-bold" style={{ color: "var(--foreground)" }}>₹450</span>
          </div>
        </div>

        <button onClick={() => go("payment")} className="w-full py-4 rounded-2xl font-bold text-base text-white mb-3" style={{ background: "var(--primary)" }}>
          Pay ₹450 →
        </button>
        <button onClick={() => go("payment")} className="w-full py-3 text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
          Pay Later / Cash
        </button>
      </div>
    );
  }

  // ─── PAYMENT ─────────────────────────────────────────────────────────────────
  if (screen === "payment") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Payment" onBack={() => go("job-complete")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-5 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold mb-3" style={{ color: "var(--foreground)" }}>Payment Breakdown</h3>
            {[
              { label: "Service Value", value: "₹500" },
              { label: "Worker Earning (90%)", value: "₹450", color: "var(--secondary)" },
              { label: "Cooperative Contribution (10%)", value: "₹50", color: "var(--muted-foreground)" },
            ].map((r) => (
              <div key={r.label} className="flex justify-between py-2.5 text-sm" style={{ borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--muted-foreground)" }}>{r.label}</span>
                <span className="font-bold" style={{ color: r.color || "var(--foreground)" }}>{r.value}</span>
              </div>
            ))}
            <div className="flex justify-between py-2.5">
              <span className="font-bold" style={{ color: "var(--foreground)" }}>Total</span>
              <span className="text-xl font-bold" style={{ color: "var(--foreground)" }}>₹500</span>
            </div>
            <p className="text-xs mt-2" style={{ color: "var(--secondary)" }}>Transparent cooperative settlement. 10% goes to worker welfare &amp; cooperative operations.</p>
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold mb-3" style={{ color: "var(--foreground)" }}>Pay via UPI</h3>
            {["Google Pay", "PhonePe", "Paytm", "BHIM UPI"].map((u) => (
              <button key={u} className="w-full flex items-center gap-3 py-3 text-left" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm" style={{ background: "var(--muted)" }}>💳</div>
                <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{u}</span>
                <span className="ml-auto text-lg" style={{ color: "var(--muted-foreground)" }}>→</span>
              </button>
            ))}
          </div>

          <button onClick={() => go("invoice")} className="w-full py-4 rounded-2xl font-bold text-base text-white mb-3" style={{ background: "var(--primary)" }}>
            Pay ₹500 →
          </button>
          <button onClick={() => go("invoice")} className="w-full py-3 rounded-2xl text-sm font-medium border" style={{ borderColor: "var(--border)" }}>
            Pay Cash to Worker
          </button>
        </div>
      </div>
    );
  }

  // ─── INVOICE ─────────────────────────────────────────────────────────────────
  if (screen === "invoice") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Invoice" onBack={() => go("payment")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: "rgba(26,122,94,0.1)" }}>✅</div>
          </div>
          <p className="text-center font-bold text-lg mb-1" style={{ color: "var(--secondary)" }}>Payment Successful!</p>
          <p className="text-center text-xs mb-5" style={{ color: "var(--muted-foreground)" }}>₹500 paid via Google Pay</p>

          <div className="rounded-2xl overflow-hidden mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <div className="p-4" style={{ background: "var(--primary)", color: "white" }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: "rgba(255,255,255,0.2)" }}>S</div>
                <div>
                  <div className="font-bold text-sm">SahyogWork</div>
                  <div className="text-xs opacity-70">Digital Invoice</div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
                <span>Invoice #SW-2026-04812</span>
                <span>12 Sep 2026</span>
              </div>
              {[
                { label: "Service", value: "Tap Repair" },
                { label: "Worker", value: "Ramesh Kumar" },
                { label: "Duration", value: "42 minutes" },
                { label: "Service Value", value: "₹500" },
                { label: "Worker Earning", value: "₹450" },
                { label: "Cooperative Fund", value: "₹50" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between py-1.5 text-sm" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span style={{ color: "var(--muted-foreground)" }}>{r.label}</span>
                  <span className="font-semibold" style={{ color: "var(--foreground)" }}>{r.value}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 mt-1">
                <span className="font-bold" style={{ color: "var(--foreground)" }}>Total Paid</span>
                <span className="font-bold text-lg" style={{ color: "var(--foreground)" }}>₹500</span>
              </div>
            </div>
          </div>

          <button onClick={() => go("review")} className="w-full py-4 rounded-2xl font-bold text-base text-white mb-3" style={{ background: "var(--primary)" }}>
            Rate Ramesh →
          </button>
          <button className="w-full py-3 rounded-2xl text-sm font-semibold border" style={{ borderColor: "var(--border)" }}>
            Download Invoice
          </button>
        </div>
      </div>
    );
  }

  // ─── REVIEW ──────────────────────────────────────────────────────────────────
  if (screen === "review") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Rate Your Experience" onBack={() => go("invoice")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-2xl mb-2" style={{ background: "var(--primary)" }}>RK</div>
            <p className="font-bold" style={{ color: "var(--foreground)" }}>Ramesh Kumar</p>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Tap Repair · 12 Sep</p>
          </div>

          <div className="text-center mb-5">
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>How was your experience?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)} className="text-4xl transition-all" style={{ opacity: n <= rating ? 1 : 0.3 }}>⭐</button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Rate by Category</p>
            {["Quality of Work", "Punctuality", "Behaviour", "Professionalism"].map((c) => (
              <div key={c} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="text-sm" style={{ color: "var(--foreground)" }}>{c}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className="text-base" style={{ opacity: n <= 5 ? 1 : 0.3 }}>⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <textarea
              className="w-full text-sm focus:outline-none resize-none"
              rows={3}
              placeholder="Write a review (optional)..."
              style={{ color: "var(--foreground)" }}
            />
          </div>

          <div className="rounded-xl p-3 mb-4 text-xs" style={{ background: "rgba(26,122,94,0.05)", color: "var(--secondary)" }}>
            ⚖️ Two-way accountability: Ramesh can also review you as a customer — creating mutual trust.
          </div>

          <button onClick={() => go("home")} className="w-full py-4 rounded-2xl font-bold text-base text-white" style={{ background: "var(--primary)" }}>
            Submit Review →
          </button>
        </div>
      </div>
    );
  }

  // ─── MY WORKERS ──────────────────────────────────────────────────────────────
  if (screen === "my-workers") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="My Workers" right={<button onClick={() => go("add-worker")} className="text-sm font-bold" style={{ color: "var(--primary)" }}>+ Add</button>} />
        <div className="flex-1 overflow-y-auto px-4 py-3 pb-20">
          {myWorkers.map((w) => (
            <div key={w.id} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "var(--secondary)" }}>
                  {w.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{w.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(26,122,94,0.1)", color: "var(--secondary)" }}>{w.status}</span>
                  </div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{w.role}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--foreground)" }}>📅 {w.schedule} · {w.time}</div>
                </div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>⭐ {w.rating}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["Schedule", "Chat", "History"].map((a) => (
                  <button key={a} onClick={() => a === "Chat" ? go("chat") : undefined} className="py-2 rounded-xl text-xs font-semibold border" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                    {a}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button onClick={() => go("find-replacement")} className="py-2 rounded-xl text-xs font-semibold" style={{ background: "rgba(232,98,10,0.08)", color: "var(--primary)" }}>
                  Find Replacement
                </button>
                <button onClick={() => { setEndEngagement(true); go("release-engage"); }} className="py-2 rounded-xl text-xs font-semibold" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                  End Engagement
                </button>
              </div>
            </div>
          ))}

          {/* Privacy notice */}
          <div className="rounded-xl p-3 text-xs" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            🔒 Availability is visible to others. Your name, address, and engagement details remain private.
          </div>
        </div>
        <BottomNav tabs={bottomTabs} active="my-workers" onChange={handleTab} />
      </div>
    );
  }

  // ─── ADD WORKER ──────────────────────────────────────────────────────────────
  if (screen === "add-worker") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Add a Worker" onBack={() => go("my-workers")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-3 mb-5">
            {[
              { icon: "🔍", title: "Worker is on the platform", sub: "Find and add an existing worker to your household", onClick: () => go("find-replacement") },
              { icon: "📲", title: "Invite a worker", sub: "Share a signup link with your worker", onClick: () => go("add-worker") },
              { icon: "✍️", title: "Create profile for a worker", sub: "Help a local worker join the platform", onClick: () => go("community") },
            ].map((o) => (
              <button key={o.title} onClick={o.onClick} className="p-4 rounded-2xl text-left flex items-start gap-4 transition-all active:scale-98" style={{ background: "white", border: "1px solid var(--border)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "var(--muted)" }}>{o.icon}</div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{o.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{o.sub}</div>
                </div>
                <span className="ml-auto text-lg" style={{ color: "var(--muted-foreground)" }}>→</span>
              </button>
            ))}
          </div>

          {/* Sita example - existing recurring */}
          <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold mb-3" style={{ color: "var(--muted-foreground)" }}>EXAMPLE — RECURRING ENGAGEMENT</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "var(--secondary)" }}>SD</div>
              <div>
                <div className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Sita Devi</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Maid · Mon–Sat · 8 AM–12 PM</div>
                <div className="text-xs font-semibold" style={{ color: "var(--secondary)" }}>✓ Recurring engagement active</div>
              </div>
            </div>
            <div className="text-xs p-3 rounded-xl" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
              🔒 Availability: 8 AM–12 PM (Mon–Sat) is visible. Customer name and address are NOT visible to others.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── RELEASE / END ENGAGEMENT ─────────────────────────────────────────────────
  if (screen === "release-engage") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="End Recurring Engagement" onBack={() => go("my-workers")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col items-center mb-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-xl mb-3" style={{ background: "var(--secondary)" }}>SD</div>
            <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>End engagement with Sita?</h2>
            <p className="text-sm text-center mt-1" style={{ color: "var(--muted-foreground)" }}>This will release her schedule slots after confirmation.</p>
          </div>

          <div className="flex flex-col gap-4 mb-5">
            <div>
              <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>End Date</label>
              <input type="date" className="w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none" style={{ borderColor: "var(--border)", background: "white" }} defaultValue="2026-09-20" />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>Reason (optional)</label>
              <select className="w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none" style={{ borderColor: "var(--border)", background: "white" }}>
                <option>Relocating / Moving</option>
                <option>Service no longer needed</option>
                <option>Found another arrangement</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>Final Payment Status</label>
              <div className="flex gap-2">
                {["Paid", "Pending"].map((p) => (
                  <button key={p} className="flex-1 py-3 rounded-xl text-sm font-semibold border-2" style={{ borderColor: p === "Paid" ? "var(--secondary)" : "var(--border)", background: p === "Paid" ? "rgba(26,122,94,0.08)" : "white", color: p === "Paid" ? "var(--secondary)" : "var(--foreground)" }}>
                    {p === "Paid" ? "✓ All Paid" : "₹ Pending"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl p-3 mb-5 text-xs" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            🔔 Sita will be notified and can confirm the end date. Her schedule slots become available after mutual confirmation.
          </div>

          <button onClick={() => go("my-workers")} className="w-full py-4 rounded-2xl font-bold text-base text-white mb-3" style={{ background: "#DC2626" }}>
            End Engagement
          </button>
          <button onClick={() => go("my-workers")} className="w-full py-3 text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ─── FIND REPLACEMENT ────────────────────────────────────────────────────────
  if (screen === "find-replacement") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Find Replacement" onBack={() => go("my-workers")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-4 mb-4" style={{ background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.2)" }}>
            <div className="flex items-center gap-2 mb-1">
              <span>⚠️</span>
              <span className="font-bold text-sm" style={{ color: "#DC2626" }}>Sita is unavailable tomorrow</span>
            </div>
            <p className="text-xs" style={{ color: "var(--foreground)" }}>Tuesday 10 Sep · 8 AM–12 PM</p>
          </div>

          <p className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Suitable replacements found:</p>

          {[
            { name: "Priya Bose", role: "Maid", distance: "1.8 km", time: "Available 8 AM–12 PM", rating: 4.7 },
            { name: "Anita Mondal", role: "Maid", distance: "2.3 km", time: "Available 8 AM–11 AM", rating: 4.5 },
            { name: "Rekha Roy", role: "Maid", distance: "3.1 km", time: "Available 9 AM–12 PM", rating: 4.6 },
          ].map((w) => (
            <div key={w.name} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "var(--secondary)" }}>
                  {w.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{w.name}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{w.role} · {w.distance} · ⭐ {w.rating}</div>
                  <div className="text-xs" style={{ color: "var(--secondary)" }}>✓ Verified · {w.time}</div>
                </div>
              </div>
              <button className="w-full py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "var(--primary)" }}>
                Request Replacement
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── CHAT ─────────────────────────────────────────────────────────────────────
  if (screen === "chat") {
    const quickReplies = ["I'm on my way.", "I have arrived.", "Please send a photo.", "I need another tool."];
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <div className="px-4 py-3 flex items-center gap-3" style={{ background: "white", borderBottom: "1px solid var(--border)" }}>
          <button onClick={() => go("home")} className="text-2xl">←</button>
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "var(--primary)" }}>RK</div>
          <div>
            <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>Ramesh Kumar</div>
            <div className="text-xs" style={{ color: "var(--secondary)" }}>● Online · On the way</div>
          </div>
          <div className="ml-auto text-xs rounded-full px-2 py-1" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>🔒 Private</div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 pb-2">
          {msgs.map((m) => (
            <div key={m.id} className={`flex mb-3 ${m.sender === "customer" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[75%] px-4 py-2.5 rounded-2xl text-sm"
                style={{
                  background: m.sender === "customer" ? "var(--primary)" : "white",
                  color: m.sender === "customer" ? "white" : "var(--foreground)",
                  border: m.sender === "worker" ? "1px solid var(--border)" : "none",
                }}
              >
                {m.text}
                <div className="text-[10px] mt-1 opacity-60">{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-3 py-2" style={{ borderTop: "1px solid var(--border)", background: "white" }}>
          <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => setMsgs([...msgs, { id: `qr-${Date.now()}`, sender: "customer", text: q, time: "Now" }])}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border font-medium"
                style={{ borderColor: "var(--border)", color: "var(--primary)" }}
              >
                {q}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-2xl text-sm border focus:outline-none"
              style={{ borderColor: "var(--border)", background: "var(--muted)" }}
              placeholder="Type a message..."
            />
            <button
              onClick={() => {
                if (chatInput.trim()) {
                  setMsgs([...msgs, { id: `m-${Date.now()}`, sender: "customer", text: chatInput, time: "Now" }]);
                  setChatInput("");
                }
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: "var(--primary)" }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
  if (screen === "notifications") {
    const icons: Record<string, string> = { booking: "📅", payment: "💰", welfare: "🛡️", emergency: "🚨", training: "📚", cooperative: "🏛️" };
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Notifications" onBack={() => go("home")} />
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="rounded-2xl p-4 mb-3 flex items-start gap-3"
              style={{ background: n.read ? "white" : "rgba(232,98,10,0.04)", border: `1px solid ${n.priority === "high" ? "rgba(220,38,38,0.3)" : "var(--border)"}` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: n.priority === "high" ? "rgba(220,38,38,0.1)" : "var(--muted)" }}
              >
                {icons[n.type]}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{n.title}</span>
                  {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: "var(--primary)" }} />}
                </div>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{n.body}</p>
                <p className="text-[10px] mt-1" style={{ color: "var(--muted-foreground)" }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── COMMUNITY ───────────────────────────────────────────────────────────────
  if (screen === "community") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Community Contribution" onBack={() => go("home")} />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-4 mb-4 text-center" style={{ background: "linear-gradient(135deg, #1A7A5E 0%, #155f4b 100%)" }}>
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-white font-bold text-lg">Your Points: 120</div>
            <div className="text-green-100 text-xs mt-1">Keep contributing to grow the cooperative network</div>
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>How to earn points</h3>
            {[
              { icon: "👷", action: "Add a worker", pts: "+10" },
              { icon: "✅", action: "Help complete a profile", pts: "+15" },
              { icon: "🔍", action: "Confirm valid worker info", pts: "+5" },
              { icon: "⚠️", action: "Report incorrect information", pts: "+8" },
            ].map((i) => (
              <div key={i.action} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="text-xl">{i.icon}</span>
                <span className="flex-1 text-sm" style={{ color: "var(--foreground)" }}>{i.action}</span>
                <span className="font-bold text-sm" style={{ color: "var(--secondary)" }}>{i.pts}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 mb-4" style={{ background: "white", border: "1px solid var(--border)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>Leaderboard</h3>
            {communityLeaderboard.map((l) => (
              <div key={l.rank} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="w-6 text-center font-bold" style={{ color: l.rank <= 3 ? "var(--accent)" : "var(--muted-foreground)" }}>#{l.rank}</span>
                <span className="flex-1 font-semibold text-sm" style={{ color: l.name === "You" ? "var(--primary)" : "var(--foreground)" }}>{l.name}</span>
                <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{l.points} pts</span>
                {l.badge && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(232,98,10,0.1)", color: "var(--primary)" }}>{l.badge}</span>}
              </div>
            ))}
          </div>

          <div className="rounded-xl p-3 text-xs mb-4" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            ⚠️ Added profile ≠ verified worker. Worker verification is done separately by cooperative administrators.
          </div>

          <button onClick={() => go("add-worker")} className="w-full py-4 rounded-2xl font-bold text-base text-white" style={{ background: "var(--primary)" }}>
            + Add a Worker to Earn Points
          </button>
        </div>
      </div>
    );
  }

  // ─── BOOKINGS ────────────────────────────────────────────────────────────────
  if (screen === "bookings") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="My Bookings" />
        <div className="flex-1 overflow-y-auto px-4 py-3 pb-20">
          {[
            { status: "Active", label: "Tap Repair", worker: "Ramesh Kumar", date: "Today, 5:30 PM", amount: "₹350–500", color: "var(--secondary)", onClick: () => go("live-tracking") },
            { status: "Completed", label: "Home Cleaning", worker: "Priya Sharma", date: "10 Sep, 10 AM", amount: "₹400", color: "var(--muted-foreground)", onClick: () => go("invoice") },
            { status: "Scheduled", label: "Gardening", worker: "Rahul Das", date: "15 Sep, 7 AM", amount: "₹300", color: "var(--primary)", onClick: () => go("booking-confirm") },
          ].map((b) => (
            <div key={b.label} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }} onClick={b.onClick}>
              <div className="flex items-start justify-between mb-2">
                <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{b.label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${b.color}15`, color: b.color }}>{b.status}</span>
              </div>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{b.worker} · {b.date}</div>
              <div className="text-xs font-bold mt-1" style={{ color: "var(--foreground)" }}>{b.amount}</div>
            </div>
          ))}
        </div>
        <BottomNav tabs={bottomTabs} active="bookings" onChange={handleTab} />
      </div>
    );
  }

  // ─── DAILY LABOUR ────────────────────────────────────────────────────────────
  if (screen === "daily-labour") {
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--background)" }}>
        <TopBar title="Work Today" onBack={() => go("home")} />
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="rounded-2xl p-4 mb-4" style={{ background: "linear-gradient(135deg, var(--primary) 0%, #c4520a 100%)" }}>
            <div className="text-white font-bold text-base mb-1">Daily Wage Marketplace</div>
            <div className="text-orange-100 text-xs">Find day jobs near you and apply instantly</div>
          </div>
          {[
            { title: "Construction Helper", pay: "₹650/day", distance: "3 km", time: "8 AM–5 PM", date: "Today", workers: 5 },
            { title: "Loading / Unloading", pay: "₹550/day", distance: "2 km", time: "10 AM–4 PM", date: "Today", workers: 3 },
            { title: "Painting Helper", pay: "₹700/day", distance: "5 km", time: "8 AM–5 PM", date: "Tomorrow", workers: 2 },
          ].map((j) => (
            <div key={j.title} className="rounded-2xl p-4 mb-3" style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex items-start justify-between mb-2">
                <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{j.title}</span>
                <span className="font-bold" style={{ color: "var(--primary)" }}>{j.pay}</span>
              </div>
              <div className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>📍 {j.distance} · ⏰ {j.time} · 📅 {j.date}</div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{j.workers} workers needed</span>
                <button className="py-2 px-4 rounded-xl text-sm font-bold text-white" style={{ background: "var(--primary)" }}>Apply</button>
              </div>
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
        <TopBar title="Profile" />
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="flex flex-col items-center px-5 py-6" style={{ background: "white" }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-2xl mb-3" style={{ background: "var(--primary)" }}>AG</div>
            <h2 className="font-bold text-lg" style={{ color: "var(--foreground)" }}>Ayush Gupta</h2>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Household · Haldia, WB</p>
          </div>
          <div className="px-4 py-3">
            {[
              { icon: "👤", label: "Personal Details" },
              { icon: "📍", label: "Saved Addresses" },
              { icon: "💳", label: "Payment Methods" },
              { icon: "👥", label: "My Workers" },
              { icon: "🔒", label: "Privacy Settings" },
              { icon: "🌐", label: "Language" },
              { icon: "🔔", label: "Notifications" },
              { icon: "❓", label: "Help & Support" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="text-xl">{s.icon}</span>
                <span className="flex-1 text-sm font-medium" style={{ color: "var(--foreground)" }}>{s.label}</span>
                <span style={{ color: "var(--muted-foreground)" }}>→</span>
              </div>
            ))}
          </div>
        </div>
        <BottomNav tabs={bottomTabs} active="profile" onChange={handleTab} />
      </div>
    );
  }

  return null;
}
