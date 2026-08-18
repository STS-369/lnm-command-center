'use client';

import { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '@/lib/client-db';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState('');
  const [companyTagline, setCompanyTagline] = useState('');
  const [defaultPricing, setDefaultPricing] = useState('');
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiModel, setAiModel] = useState('gpt-4');
  const [theme, setTheme] = useState('cyberpunk');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function load() {
      try {
        const data = await getSettings();
        const settingsMap = new Map(data.map(s => [s.key, s.value]));
        setCompanyName(settingsMap.get('company_name') || '');
        setCompanyTagline(settingsMap.get('company_tagline') || '');
        setDefaultPricing(settingsMap.get('default_pricing_tier') || '');
        setAiApiKey(settingsMap.get('ai_api_key') || '');
        setAiModel(settingsMap.get('ai_model') || 'gpt-4');
        setTheme(settingsMap.get('theme') || 'cyberpunk');
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (aiApiKey && !aiApiKey.startsWith('sk-') && !aiApiKey.startsWith('claude-')) {
      newErrors.aiApiKey = 'API key format appears invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    setMessage('');
    try {
      await saveSettings({
        company_name: companyName.trim(),
        company_tagline: companyTagline.trim(),
        default_pricing_tier: defaultPricing,
        ai_api_key: aiApiKey.trim(),
        ai_model: aiModel,
        theme,
      });
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <span className="animate-spin text-2xl">⏳</span>
          <p className="text-sm text-text-muted mt-2">Loading settings...</p>
        </div>
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
      <section className="card" aria-labelledby="business-heading">
        <h2 id="business-heading" className="text-lg font-bold text-text-primary font-mono mb-4">Business Context</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="company-name" className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
              Company Name <span className="text-neon-red">*</span>
            </label>
            <input
              id="company-name"
              type="text"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                if (errors.companyName) setErrors(prev => ({ ...prev, companyName: '' }));
              }}
              className={`input ${errors.companyName ? 'border-neon-red' : ''}`}
              placeholder="SOETech LLC"
              aria-required="true"
              aria-invalid={!!errors.companyName}
              aria-describedby={errors.companyName ? 'company-name-error' : undefined}
            />
            {errors.companyName && (
              <p id="company-name-error" className="text-xs text-neon-red mt-1" role="alert">{errors.companyName}</p>
            )}
          </div>
          <div>
            <label htmlFor="company-tagline" className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">Tagline</label>
            <input
              id="company-tagline"
              type="text"
              value={companyTagline}
              onChange={(e) => setCompanyTagline(e.target.value)}
              className="input"
              placeholder="Web & AI Development Agency"
            />
          </div>
          <div>
            <label htmlFor="pricing-tier" className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">Default Pricing Tier</label>
            <select
              id="pricing-tier"
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
      </section>

      {/* AI Configuration */}
      <section className="card" aria-labelledby="ai-heading">
        <h2 id="ai-heading" className="text-lg font-bold text-text-primary font-mono mb-4">AI Configuration</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="api-key" className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">API Key</label>
            <input
              id="api-key"
              type="password"
              value={aiApiKey}
              onChange={(e) => {
                setAiApiKey(e.target.value);
                if (errors.aiApiKey) setErrors(prev => ({ ...prev, aiApiKey: '' }));
              }}
              className={`input ${errors.aiApiKey ? 'border-neon-red' : ''}`}
              placeholder="sk-..."
              aria-describedby="api-key-help"
            />
            <p id="api-key-help" className="text-[10px] text-text-muted mt-1">Your AI service API key (stored in database)</p>
            {errors.aiApiKey && (
              <p className="text-xs text-neon-red mt-1" role="alert">{errors.aiApiKey}</p>
            )}
          </div>
          <div>
            <label htmlFor="ai-model" className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">AI Model</label>
            <select
              id="ai-model"
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
      </section>

      {/* Theme */}
      <section className="card" aria-labelledby="theme-heading">
        <h2 id="theme-heading" className="text-lg font-bold text-text-primary font-mono mb-4">Theme</h2>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Theme selection">
          <button
            role="radio"
            aria-checked={theme === 'cyberpunk'}
            onClick={() => setTheme('cyberpunk')}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              theme === 'cyberpunk'
                ? 'border-cyan bg-cyan/5'
                : 'border-border hover:border-border-light'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-cyan" aria-hidden="true"></div>
              <div className="w-3 h-3 rounded-full bg-purple" aria-hidden="true"></div>
            </div>
            <p className="text-sm font-medium text-text-primary">Cyberpunk</p>
            <p className="text-[10px] text-text-muted">Dark with neon accents</p>
          </button>
          <button
            role="radio"
            aria-checked={theme === 'midnight'}
            onClick={() => setTheme('midnight')}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              theme === 'midnight'
                ? 'border-cyan bg-cyan/5'
                : 'border-border hover:border-border-light'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-text-muted" aria-hidden="true"></div>
              <div className="w-3 h-3 rounded-full bg-text-secondary" aria-hidden="true"></div>
            </div>
            <p className="text-sm font-medium text-text-primary">Midnight</p>
            <p className="text-[10px] text-text-muted">Clean and minimal</p>
          </button>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary"
          aria-busy={saving}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
        {message && (
          <span className={`text-sm ${message.includes('success') ? 'text-neon-green' : 'text-neon-red'}`} role="status">
            {message}
          </span>
        )}
      </div>
    </div>
  );
}
