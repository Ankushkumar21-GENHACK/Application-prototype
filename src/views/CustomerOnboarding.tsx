import { useState } from "react";

interface Props {
  lang: "en" | "hi" | "bn";
  onComplete: () => void;
  onBack: () => void;
}

const accountTypes = [
  { id: "household", label: "Household", icon: "🏠", desc: "For home services" },
  { id: "business", label: "Business", icon: "🏢", desc: "For workplace services" },
  { id: "contractor", label: "Contractor", icon: "🏗️", desc: "For bulk workforce" },
];

export default function CustomerOnboarding({ onComplete, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [accountType, setAccountType] = useState("household");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);

  const steps = ["Register", "Verify OTP", "Location"];

  if (step === 0) {
    return (
      <div className="h-full overflow-y-auto px-6 pt-8 pb-8" style={{ background: "var(--background)" }}>
        <button onClick={onBack} className="text-2xl mb-6">←</button>
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col gap-1">
              <div className="h-1 rounded-full" style={{ background: i <= step ? "var(--primary)" : "var(--border)" }} />
              <span className="text-[10px]" style={{ color: i === step ? "var(--primary)" : "var(--muted-foreground)" }}>{s}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Create Account</h2>
        <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>Get access to 800+ verified workers</p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>Full Name</label>
            <input
              className="w-full px-4 py-3.5 rounded-2xl text-base border focus:outline-none"
              style={{ borderColor: "var(--border)", background: "white" }}
              placeholder="Ayush Gupta"
              defaultValue="Ayush Gupta"
            />
          </div>
          <div>
            <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>Mobile Number</label>
            <div className="flex gap-2">
              <div className="px-4 py-3.5 rounded-2xl border font-semibold" style={{ borderColor: "var(--border)", background: "white" }}>🇮🇳 +91</div>
              <input
                className="flex-1 px-4 py-3.5 rounded-2xl text-base border focus:outline-none"
                style={{ borderColor: "var(--border)", background: "white" }}
                placeholder="98765 43210"
                defaultValue="98765 43210"
                type="tel"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>Location</label>
            <input
              className="w-full px-4 py-3.5 rounded-2xl text-base border focus:outline-none"
              style={{ borderColor: "var(--border)", background: "white" }}
              placeholder="Haldia, West Bengal"
              defaultValue="Haldia, West Bengal"
            />
          </div>
          <div>
            <label className="text-sm font-semibold block mb-2" style={{ color: "var(--foreground)" }}>Account Type</label>
            <div className="flex flex-col gap-2">
              {accountTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setAccountType(t.id)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all"
                  style={{
                    borderColor: accountType === t.id ? "var(--primary)" : "var(--border)",
                    background: accountType === t.id ? "rgba(232,98,10,0.05)" : "white",
                  }}
                >
                  <span className="text-xl">{t.icon}</span>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{t.label}</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{t.desc}</div>
                  </div>
                  <div
                    className="ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: accountType === t.id ? "var(--primary)" : "var(--border)" }}
                  >
                    {accountType === t.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--primary)" }} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => { setOtpSent(true); setStep(1); }}
          className="w-full mt-6 py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-98"
          style={{ background: "var(--primary)" }}
        >
          Send OTP →
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="h-full px-6 pt-8 pb-8 flex flex-col" style={{ background: "var(--background)" }}>
        <button onClick={() => setStep(0)} className="text-2xl mb-6">←</button>
        <div className="flex gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col gap-1">
              <div className="h-1 rounded-full" style={{ background: i <= step ? "var(--primary)" : "var(--border)" }} />
              <span className="text-[10px]" style={{ color: i === step ? "var(--primary)" : "var(--muted-foreground)" }}>{s}</span>
            </div>
          ))}
        </div>

        <div className="text-4xl mb-4">📱</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Enter OTP</h2>
        <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
          Sent to +91 98765 43210
        </p>

        <div className="flex gap-3 justify-center mb-6">
          {otp.map((d, i) => (
            <input
              key={i}
              value={d}
              onChange={(e) => {
                const v = otp.slice(); v[i] = e.target.value.slice(-1); setOtp(v);
              }}
              className="w-14 h-14 text-center text-2xl font-bold rounded-2xl border-2 focus:outline-none"
              style={{ borderColor: d ? "var(--primary)" : "var(--border)", background: "white" }}
              maxLength={1}
              type="number"
            />
          ))}
        </div>

        <p className="text-center text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
          Didn't receive? <button className="font-semibold" style={{ color: "var(--primary)" }}>Resend OTP</button>
        </p>

        {otpSent && (
          <div className="rounded-xl p-3 mb-4 text-center text-sm" style={{ background: "rgba(26,122,94,0.1)", color: "var(--secondary)" }}>
            Demo OTP: <strong>1234</strong> (pre-filled for prototype)
          </div>
        )}

        <button
          onClick={() => setStep(2)}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-98"
          style={{ background: "var(--primary)" }}
        >
          Verify OTP
        </button>
      </div>
    );
  }

  return (
    <div className="h-full px-6 pt-8 pb-8 flex flex-col" style={{ background: "var(--background)" }}>
      <button onClick={() => setStep(1)} className="text-2xl mb-6">←</button>
      <div className="flex gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex flex-col gap-1">
            <div className="h-1 rounded-full" style={{ background: i <= step ? "var(--primary)" : "var(--border)" }} />
            <span className="text-[10px]" style={{ color: i === step ? "var(--primary)" : "var(--muted-foreground)" }}>{s}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="text-6xl mb-2">📍</div>
        <h2 className="text-2xl font-bold text-center" style={{ color: "var(--foreground)" }}>Allow Location</h2>
        <p className="text-sm text-center px-4" style={{ color: "var(--muted-foreground)" }}>
          Location helps us find nearby workers and calculate realistic arrival times.
        </p>

        <div
          className="w-full rounded-2xl p-4 mt-2"
          style={{ background: "rgba(232,98,10,0.05)", border: "1px solid rgba(232,98,10,0.2)" }}
        >
          {[
            "Find workers within 5–10 km",
            "Show accurate travel time estimates",
            "Enable travel-aware scheduling",
          ].map((b) => (
            <div key={b} className="flex items-center gap-2 py-2 text-sm" style={{ color: "var(--foreground)" }}>
              <span style={{ color: "var(--primary)" }}>✓</span> {b}
            </div>
          ))}
        </div>

        <div
          className="w-full rounded-xl p-3 text-xs"
          style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
        >
          🔒 Your location is only used to match workers. It is never shared with third parties.
        </div>
      </div>

      <button
        onClick={onComplete}
        className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-98"
        style={{ background: "var(--primary)" }}
      >
        Allow Location & Continue →
      </button>
      <button
        onClick={onComplete}
        className="w-full py-3 mt-2 text-sm font-medium"
        style={{ color: "var(--muted-foreground)" }}
      >
        Skip for now
      </button>
    </div>
  );
}
