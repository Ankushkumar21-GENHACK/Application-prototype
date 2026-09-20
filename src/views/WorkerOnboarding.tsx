import { useState } from "react";

interface Props {
  lang: "en" | "hi" | "bn";
  onComplete: () => void;
  onBack: () => void;
}

const skills = [
  { id: "maid", icon: "🧹", label: "Maid" },
  { id: "cook", icon: "👨‍🍳", label: "Cook" },
  { id: "cleaner", icon: "🫧", label: "Cleaner" },
  { id: "electrician", icon: "⚡", label: "Electrician" },
  { id: "plumber", icon: "🔧", label: "Plumber" },
  { id: "carpenter", icon: "🪚", label: "Carpenter" },
  { id: "painter", icon: "🎨", label: "Painter" },
  { id: "porter", icon: "📦", label: "Porter" },
  { id: "security", icon: "🛡️", label: "Security" },
  { id: "driver", icon: "🚗", label: "Driver" },
  { id: "labourer", icon: "⛏️", label: "Labourer" },
  { id: "hairstylist", icon: "✂️", label: "Hair Stylist" },
  { id: "mehendi", icon: "🌸", label: "Mehendi Artist" },
  { id: "gardener", icon: "🌱", label: "Gardener" },
  { id: "caregiver", icon: "🤲", label: "Caregiver" },
  { id: "other", icon: "➕", label: "Other" },
];

export default function WorkerOnboarding({ onComplete, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["electrician"]);
  const [livePhotoTaken, setLivePhotoTaken] = useState(false);

  const toggleSkill = (id: string) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  if (step === 0) {
    return (
      <div className="h-full overflow-y-auto px-5 pt-8 pb-8" style={{ background: "var(--background)" }}>
        <button onClick={onBack} className="text-2xl mb-4">←</button>
        <h2 className="text-xl font-bold mb-1" style={{ color: "var(--foreground)" }}>What work do you do?</h2>
        <p className="text-sm mb-1" style={{ color: "var(--muted-foreground)" }}>आप क्या काम करते हैं? / আপনি কী কাজ করেন?</p>
        <p className="text-xs mb-5" style={{ color: "var(--muted-foreground)" }}>Select all that apply</p>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {skills.map((s) => (
            <button
              key={s.id}
              onClick={() => toggleSkill(s.id)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all active:scale-95"
              style={{
                borderColor: selectedSkills.includes(s.id) ? "var(--primary)" : "var(--border)",
                background: selectedSkills.includes(s.id) ? "rgba(232,98,10,0.08)" : "white",
              }}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: "var(--foreground)" }}>{s.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setStep(1)}
          disabled={selectedSkills.length === 0}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-98 disabled:opacity-50"
          style={{ background: "var(--primary)" }}
        >
          Continue ({selectedSkills.length} selected) →
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="h-full overflow-y-auto px-6 pt-8 pb-8" style={{ background: "var(--background)" }}>
        <button onClick={() => setStep(0)} className="text-2xl mb-5">←</button>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Your Details</h2>

        <div className="flex flex-col gap-3">
          {[
            { label: "Full Name", placeholder: "Ramesh Kumar", value: "Ramesh Kumar" },
            { label: "Mobile Number", placeholder: "98765 43210", value: "98765 43210" },
            { label: "Years of Experience", placeholder: "e.g. 5", value: "5" },
            { label: "Service Area / Location", placeholder: "Haldia, West Bengal", value: "Haldia, West Bengal" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-sm font-semibold block mb-1.5" style={{ color: "var(--foreground)" }}>{f.label}</label>
              <input
                className="w-full px-4 py-3.5 rounded-2xl text-sm border focus:outline-none"
                style={{ borderColor: "var(--border)", background: "white" }}
                placeholder={f.placeholder}
                defaultValue={f.value}
              />
            </div>
          ))}

          <div>
            <label className="text-sm font-semibold block mb-1.5" style={{ color: "var(--foreground)" }}>Availability</label>
            <div className="grid grid-cols-3 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <button
                  key={d}
                  className="py-2 rounded-xl text-sm font-medium border transition-all"
                  style={{ borderColor: "var(--primary)", background: "rgba(232,98,10,0.08)", color: "var(--primary)" }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep(2)}
          className="w-full mt-5 py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-98"
          style={{ background: "var(--primary)" }}
        >
          Continue →
        </button>
      </div>
    );
  }

  return (
    <div className="h-full px-6 pt-8 pb-8 flex flex-col" style={{ background: "var(--background)" }}>
      <button onClick={() => setStep(1)} className="text-2xl mb-5">←</button>
      <h2 className="text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Live Photo Verification</h2>
      <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
        Take a selfie to verify your identity. This helps prevent fake profiles.
      </p>

      <div
        className="flex-1 rounded-3xl flex flex-col items-center justify-center gap-4 mb-5"
        style={{ background: livePhotoTaken ? "rgba(26,122,94,0.1)" : "var(--muted)", border: "2px dashed var(--border)" }}
      >
        {livePhotoTaken ? (
          <>
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
              style={{ background: "var(--secondary)", color: "white" }}
            >
              ✓
            </div>
            <p className="font-semibold" style={{ color: "var(--secondary)" }}>Live Photo Captured!</p>
            <p className="text-xs text-center px-6" style={{ color: "var(--muted-foreground)" }}>
              Your identity is verified. Profile is being reviewed.
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl">🤳</div>
            <p className="font-semibold text-center px-4" style={{ color: "var(--foreground)" }}>
              Take a live photo to verify your identity
            </p>
            <p className="text-xs text-center px-6" style={{ color: "var(--muted-foreground)" }}>
              Camera opens automatically. Do NOT upload from gallery — live photo ensures authenticity.
            </p>
          </>
        )}
      </div>

      <div
        className="rounded-xl p-3 mb-4 text-xs"
        style={{ background: "rgba(232,98,10,0.05)", color: "var(--muted-foreground)" }}
      >
        🔒 Live photo is used only for identity verification. It will not be publicly visible.
      </div>

      {!livePhotoTaken ? (
        <button
          onClick={() => setLivePhotoTaken(true)}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-98"
          style={{ background: "var(--primary)" }}
        >
          📷 Take Live Photo
        </button>
      ) : (
        <button
          onClick={onComplete}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-98"
          style={{ background: "var(--secondary)" }}
        >
          Complete Registration →
        </button>
      )}
    </div>
  );
}
