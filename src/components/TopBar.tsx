interface Props {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  transparent?: boolean;
}

export default function TopBar({ title, onBack, right, transparent }: Props) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{ background: transparent ? "transparent" : "white", borderBottom: transparent ? "none" : "1px solid var(--border)" }}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-all active:scale-95"
          style={{ background: "var(--muted)" }}
        >
          <span className="text-lg">←</span>
        </button>
      )}
      {title && (
        <h1 className="flex-1 font-semibold text-base" style={{ color: "var(--foreground)" }}>
          {title}
        </h1>
      )}
      {right && <div className="ml-auto">{right}</div>}
    </div>
  );
}
