'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BASE = '/lnm-command-center';

const navItems = [
  { href: `${BASE}/`, label: 'Dashboard', icon: '📊' },
  { href: `${BASE}/pipeline`, label: 'Pipeline', icon: '🎯' },
  { href: `${BASE}/research`, label: 'Research', icon: '🔬' },
  { href: `${BASE}/outreach`, label: 'Outreach', icon: '📧' },
  { href: `${BASE}/tasks`, label: 'Tasks', icon: '✅' },
  { href: `${BASE}/agents`, label: 'Agents', icon: '🤖' },
  { href: `${BASE}/settings`, label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar" id="sidebar-nav" aria-label="Main navigation">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-purple flex items-center justify-center text-black font-bold text-sm" aria-hidden="true">
            L
          </div>
          <div>
            <h1 className="text-sm font-bold text-text-primary font-mono tracking-tight">
              LNM
            </h1>
            <p className="text-[10px] text-text-muted uppercase tracking-widest">
              Command Center
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <ul role="list">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== `${BASE}/` && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="text-lg" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-dim to-purple-dim flex items-center justify-center text-xs font-bold" aria-hidden="true">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-text-primary truncate">Admin</p>
            <p className="text-[10px] text-text-muted truncate">admin@soetech.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
