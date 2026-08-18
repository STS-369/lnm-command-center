'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/pipeline', label: 'Pipeline', icon: '🎯' },
  { href: '/research', label: 'Research', icon: '🔬' },
  { href: '/outreach', label: 'Outreach', icon: '📧' },
  { href: '/vault', label: 'Document Vault', icon: '📁' },
  { href: '/tasks', label: 'Tasks', icon: '✅' },
  { href: '/agents', label: 'Agents', icon: '🤖' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Close mobile sidebar when a link is clicked
  const closeMobileSidebar = useCallback(() => {
    if (window.innerWidth < 768) {
      window.dispatchEvent(new CustomEvent('close-sidebar'));
    }
  }, []);

  return (
    <aside className="sidebar" id="sidebar-nav" aria-label="Main navigation">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-purple flex items-center justify-center text-black font-bold text-sm" aria-hidden="true">L</div>
          <div>
            <h1 className="text-sm font-bold text-text-primary font-mono tracking-tight">LNM</h1>
            <p className="text-[10px] text-text-muted uppercase tracking-widest">Command Center</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        <ul role="list">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link href={item.href} className={`sidebar-link ${isActive ? 'active' : ''}`} aria-current={isActive ? 'page' : undefined} onClick={closeMobileSidebar}>
                  <span className="text-lg" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-dim to-purple-dim flex items-center justify-center text-xs font-bold" aria-hidden="true">A</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-text-primary truncate">Admin</p>
            <p className="text-[10px] text-text-muted truncate">admin@soetech.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
