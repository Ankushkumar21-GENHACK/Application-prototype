type Tab = { id: string; icon: string; label: string };

interface Props {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  primary?: string;
}

export default function BottomNav({ tabs, active, onChange, primary = "var(--primary)" }: Props) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-2 pt-3 pb-5"
      style={{ background: "white", borderTop: "1px solid var(--border)" }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl transition-all"
          style={{ color: active === t.id ? primary : "var(--muted-foreground)" }}
        >
          <span className="text-2xl leading-none">{t.icon}</span>
          <span className="text-[10px] font-semibold">{t.label}</span>
          {active === t.id && (
            <div className="w-1 h-1 rounded-full mt-0.5" style={{ background: primary }} />
          )}
        </button>
      ))}
    </div>
  );
}
