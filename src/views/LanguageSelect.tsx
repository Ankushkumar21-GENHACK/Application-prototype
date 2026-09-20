const langs = [
  { id: "en", label: "English", script: "English", flag: "🇮🇳" },
  { id: "hi", label: "हिंदी", script: "Hindi", flag: "🇮🇳" },
  { id: "bn", label: "বাংলা", script: "Bengali", flag: "🇮🇳" },
];

interface Props {
  onSelect: (lang: "en" | "hi" | "bn") => void;
  onBack: () => void;
  isWorker?: boolean;
}

export default function LanguageSelect({ onSelect, onBack, isWorker }: Props) {
  return (
    <div className="h-full flex flex-col px-6" style={{ background: "var(--background)" }}>
      <div className="pt-12 pb-6">
        <button onClick={onBack} className="text-2xl mb-6">←</button>
        <div className="text-4xl mb-4">🌐</div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Choose Language
        </h2>
        <p className="text-sm mt-2" style={{ color: "var(--muted-foreground)" }}>
          {isWorker ? "Select your preferred language / अपनी भाषा चुनें / আপনার ভাষা বেছে নিন" : "Select your preferred language"}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {langs.map((l) => (
          <button
            key={l.id}
            onClick={() => onSelect(l.id as "en" | "hi" | "bn")}
            className="w-full p-5 rounded-2xl text-left flex items-center gap-4 transition-all active:scale-98 hover:shadow-md"
            style={{ background: "white", border: "2px solid var(--border)" }}
          >
            <span className="text-3xl">{l.flag}</span>
            <div>
              <div className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{l.label}</div>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{l.script}</div>
            </div>
            <span className="ml-auto text-xl" style={{ color: "var(--muted-foreground)" }}>→</span>
          </button>
        ))}
      </div>

      <div className="mt-auto pb-8 text-center text-xs" style={{ color: "var(--muted-foreground)" }}>
        You can change language anytime in settings
      </div>
    </div>
  );
}
