import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, House, Layers, Mic } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { PORTRAIT } from "@/lib/content";
import { useProgress } from "@/lib/progress";

const links = [
  { to: "/", label: "Home", icon: House },
  { to: "/lessons", label: "Lessons", icon: BookOpen },
  { to: "/review", label: "Review", icon: Layers },
  { to: "/speak", label: "Speak", icon: Mic },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const showThai = useProgress((s) => s.showThai);
  const toggleThai = useProgress((s) => s.toggleThai);

  useEffect(() => {
    void Promise.resolve(useProgress.persist.rehydrate()).finally(() => {
      useProgress.getState().touchDay();
      useProgress.setState({ hydrated: true });
    });
  }, []);

  return (
    <div className="min-h-dvh">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-line bg-surface px-4 py-6 md:flex">
        <Brand />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {links.map((link) => (
            <NavLink key={link.to} {...link} pathname={pathname} />
          ))}
        </nav>
        <ThaiToggle showThai={showThai} onToggle={toggleThai} />
        <Link
          to="/privacy"
          className={
            "mt-3 px-3 text-sm " +
            (pathname === "/privacy" ? "font-medium text-lacquer" : "text-muted hover:underline")
          }
        >
          Privacy
        </Link>
      </aside>

      <div className="md:pl-60">
        <header className="flex items-center justify-between px-4 pt-4 md:hidden">
          <Brand compact />
          <div className="flex items-center gap-3">
            <Link to="/privacy" className="text-sm text-muted">
              Privacy
            </Link>
            <ThaiToggle showThai={showThai} onToggle={toggleThai} />
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl px-4 pt-4 pb-28 md:px-8 md:pt-8 md:pb-12">{children}</main>
      </div>

      <nav className="dock fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 backdrop-blur md:hidden">
        <ul className="grid grid-cols-4">
          {links.map((link) => {
            const active = isActive(pathname, link.to);
            const Icon = link.icon;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className={
                    "flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium " +
                    (active ? "text-lacquer" : "text-muted")
                  }
                >
                  <Icon className="size-5" strokeWidth={active ? 2.4 : 1.8} />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src={PORTRAIT}
        alt=""
        className={"rounded-full object-cover ring-2 ring-lacquer/30 " + (compact ? "size-10" : "size-12")}
      />
      <span>
        <span className={"block font-display leading-none " + (compact ? "text-lg" : "text-xl")}>Kru Thee</span>
        <span className="text-xs text-muted" lang="th">
          {compact ? "ครูธี" : "ครูธี · English class"}
        </span>
      </span>
    </Link>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  pathname,
}: {
  to: (typeof links)[number]["to"];
  label: string;
  icon: (typeof links)[number]["icon"];
  pathname: string;
}) {
  const active = isActive(pathname, to);
  return (
    <Link
      to={to}
      aria-current={active ? "page" : undefined}
      className={
        "flex min-h-11 items-center gap-3 rounded-2xl px-3 text-sm font-medium " +
        (active ? "bg-bg text-lacquer" : "text-fg hover:bg-bg")
      }
    >
      <Icon className="size-5" strokeWidth={active ? 2.4 : 1.8} />
      {label}
    </Link>
  );
}

function ThaiToggle({ showThai, onToggle }: { showThai: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={showThai}
      className={"btn min-h-10 px-3 text-sm " + (showThai ? "btn-celadon" : "btn-ghost")}
    >
      {showThai ? "ไทย on" : "ไทย off"}
    </button>
  );
}

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(to + "/");
}
