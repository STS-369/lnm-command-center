'use client';

import { useState, useEffect, useRef } from 'react';

const PASSCODE = 'somoteitbe';

export default function PasscodeGate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem('lnm_passcode');
    if (stored === PASSCODE) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  // Focus input when auth screen shows
  useEffect(() => {
    if (authenticated === false && inputRef.current) {
      inputRef.current.focus();
    }
  }, [authenticated]);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSCODE) {
      sessionStorage.setItem('lnm_passcode', PASSCODE);
      setAuthenticated(true);
    } else {
      setError('ACCESS DENIED — Invalid passcode');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setInput('');
    }
  };

  // Loading state while checking sessionStorage
  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-text-muted text-sm font-mono">INITIALIZING...</p>
        </div>
      </div>
    );
  }

  // Already authenticated — show the app
  if (authenticated) {
    return <>{children}</>;
  }

  // Passcode screen
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: '#0a0a0f' }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: '#00f0ff' }} aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl" style={{ background: '#b400ff' }} aria-hidden="true" />

      {/* Main card */}
      <div
        className={`relative z-10 w-full max-w-sm mx-4 p-8 rounded-2xl border transition-all duration-300 ${shaking ? 'animate-shake' : ''}`}
        style={{
          background: '#12121a',
          borderColor: '#1e1e30',
          boxShadow: '0 0 60px rgba(0, 240, 255, 0.05)',
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #b400ff)',
              color: '#0a0a0f',
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.3)',
            }}
            aria-hidden="true"
          >
            L
          </div>
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ color: '#e8e8f0', fontFamily: 'JetBrains Mono, monospace' }}
          >
            LNM Command Center
          </h1>
          <p className="text-xs mt-1 uppercase tracking-widest" style={{ color: '#555570' }}>
            Restricted Access
          </p>
        </div>

        {/* Passcode form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="passcode-input"
              className="block text-xs uppercase tracking-wider mb-2"
              style={{ color: '#555570' }}
            >
              Authorization Code
            </label>
            <input
              ref={inputRef}
              id="passcode-input"
              type="password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              placeholder="Enter passcode..."
              className="w-full px-4 py-3 rounded-lg text-sm font-mono outline-none transition-all duration-200"
              style={{
                background: '#0a0a0f',
                border: error ? '1px solid #ff3355' : '1px solid #1e1e30',
                color: '#e8e8f0',
                boxShadow: error ? '0 0 20px rgba(255, 51, 85, 0.2)' : 'none',
              }}
              aria-required="true"
              aria-invalid={!!error}
              aria-describedby={error ? 'passcode-error' : undefined}
              autoComplete="off"
            />
          </div>

          {error && (
            <p id="passcode-error" className="text-xs font-mono mb-4 animate-pulse" style={{ color: '#ff3355' }} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #b400ff)',
              color: '#0a0a0f',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
            }}
          >
            Authenticate
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[10px]" style={{ color: '#555570' }}>
            SOETech — LNM Agent v0.1
          </p>
        </div>
      </div>

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        aria-hidden="true"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />
    </div>
  );
}
