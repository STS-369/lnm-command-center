'use client';

import { useState, useEffect } from 'react';

interface Setting {
  id: string;
  key: string;
  value: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Form state
  const [companyName, setCompanyName] = useState('');
  const [companyTagline, setCompanyTagline] = useState('');
  const [defaultPricing, setDefaultPricing] = useState('');
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiModel, setAiModel] = useState('');
  const [theme, setTheme] = useState('cyberpunk');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data);
      
      // Populate form
      for (const s of data) {
        switch (s.key) {
          case 'company_name': setCompanyName(s.value); break;
          case 'company_tagline': setCompanyTagline(s.value); break;
          case 'default_pricing_tier': setDefaultPricing(s.value); break;
          case 'ai_api_key': setAiApiKey(s.value); break;
          case 'ai_model': setAiModel(s.value); break;
          case 'theme': setTheme(s.value); break;
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: companyName,
          company_tagline: companyTagline,
          default_pricing_tier: defaultPricing,
          ai_api_key: aiApiKey,
          ai_model: aiModel,
          theme,
        }),
      });
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-text-muted">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary glow-text-cyan">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">Configure your LNM Command Center</p>
      </div>

      {/* Business Context */}
      <div className="card">
        <h2 className="text-lg font-bold text-text-primary font-mono mb-4">Business Context</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input"
              placeholder="SOETech LLC"
            />
          </div>
          <div>
            <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">Tagline</label>
            <input
              type="text"
              value={companyTagline}
              onChange={(e) => setCompanyTagline(e.target.value)}
              className="input"
              placeholder="Web & AI Development Agency"
            />
          </div>
          <div>
            <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">Default Pricing Tier</label>
            <select
              value={defaultPricing}
              onChange={(e) => setDefaultPricing(e.target.value)}
              className="input"
            >
              <option value="Standard">Standard — $199/mo</option>
              <option value="Pro">Pro — $299/mo</option>
              <option value="Enterprise">Enterprise — Custom</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Configuration */}
      <div className="card">
        <h2 className="text-lg font-bold text-text-primary font-mono mb-4">AI Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">API Key</label>
            <input
              type="password"
              value={aiApiKey}
              onChange={(e) => setAiApiKey(e.target.value)}
              className="input"
              placeholder="sk-..."
            />
            <p className="text-[10px] text-text-muted mt-1">Your AI service API key (stored securely)</p>
          </div>
          <div>
            <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">AI Model</label>
            <select
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              className="input"
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="claude-3-opus">Claude 3 Opus</option>
              <option value="claude-3-sonnet">Claude 3 Sonnet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Theme */}
      <div className="card">
        <h2 className="text-lg font-bold text-text-primary font-mono mb-4">Theme</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTheme('cyberpunk')}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              theme === 'cyberpunk'
                ? 'border-cyan bg-cyan/5'
                : 'border-border hover:border-border-light'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-cyan"></div>
              <div className="w-3 h-3 rounded-full bg-purple"></div>
            </div>
            <p className="text-sm font-medium text-text-primary">Cyberpunk</p>
            <p className="text-[10px] text-text-muted">Dark with neon accents</p>
          </button>
          <button
            onClick={() => setTheme('midnight')}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              theme === 'midnight'
                ? 'border-cyan bg-cyan/5'
                : 'border-border hover:border-border-light'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-text-muted"></div>
              <div className="w-3 h-3 rounded-full bg-text-secondary"></div>
            </div>
            <p className="text-sm font-medium text-text-primary">Midnight</p>
            <p className="text-[10px] text-text-muted">Clean and minimal</p>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
        {message && (
          <span className={`text-sm ${message.includes('success') ? 'text-neon-green' : 'text-neon-red'}`}>
            {message}
          </span>
        )}
      </div>
    </div>
  );
}
