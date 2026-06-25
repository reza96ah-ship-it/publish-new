import { Search, Bell, HelpCircle } from "lucide-react";

export function TopBar() {
  return (
    <div
      className="
        n-glass-control
        grid min-h-[var(--command-bar-height)]
        grid-cols-[minmax(0,1fr)_minmax(260px,560px)_minmax(0,1fr)]
        items-center gap-3
        rounded-[calc(var(--radius-panel)-4px)]
        px-3 lg:px-4
      "
    >
      {/* Leading Context Area */}
      <div className="flex min-w-0 items-center gap-2 justify-start">
        <span className="truncate text-sm font-semibold text-ink-primary ps-2">
          فضای کاری نشرینو
        </span>
      </div>

      {/* Central Command / Search Input */}
      <div className="min-w-0 relative group hidden md:block">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-ink-tertiary group-focus-within:text-accent transition-colors" />
        <input 
          type="search"
          placeholder="جستجوی سراسری..."
          className="
            w-full bg-[var(--n-hover-bg)] border border-[var(--n-panel-divider)]
            rounded-[var(--radius-rail)] py-2 ps-10 pe-4 text-sm text-ink-primary
            placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-accent/40
            transition-all
          "
        />
      </div>

      {/* Trailing Tools & Profile */}
      <div className="flex min-w-0 items-center justify-end gap-2">
        <button className="n-glass-control grid size-9 shrink-0 place-items-center rounded-control text-ink-secondary hover:text-ink-primary transition-colors focus:ring-2 focus:ring-accent/40 focus:outline-none">
          <HelpCircle className="size-4" />
        </button>
        <button className="n-glass-control grid size-9 shrink-0 place-items-center rounded-control text-ink-secondary hover:text-ink-primary transition-colors focus:ring-2 focus:ring-accent/40 focus:outline-none relative">
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-accent" />
          <Bell className="size-4" />
        </button>
        <div className="ms-2 size-8 rounded-full bg-gradient-to-tr from-accent to-info border border-white/20 shadow-inner" />
      </div>
    </div>
  );
}
