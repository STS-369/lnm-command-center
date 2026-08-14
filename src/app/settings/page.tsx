'use client';

import { useState } from 'react';
import { seedDemoData, getSettings, saveSettings } from '@/lib/client-db';

function initializeSettings() {
  seedDemoData();
  const data = getSettings();
  const settingsMap = new Map(data.map(s => [s.key, s.value]));
  return {
    companyName: settingsMap.get('company_name') || '',
    companyTagline: settingsMap.get('company_tagline') || '',
    defaultPricing: settingsMap.get('default_pricing_tier') || '',
    aiApiKey: settingsMap.get('ai_api_key') || '',
    aiModel: settingsMap.get('ai_model') || 'gpt-4',
    theme: settingsMap.get('theme') || 'cyberpunk',
  };
}

export default function SettingsPage() {
  const [init] = useState(initializeSettings);
  const [companyName, setCompanyName] = useState(init.companyName);
  const [companyTagline, setCompanyTagline] = useState(init.companyTagline);
  const [defaultPricing, setDefaultPricing] = useState(init.defaultPricing);
  const [aiApiKey, setAiApiKey] = useState(init.aiApiKey);
  const [aiModel, setAiModel] = useState(init.aiModel);
  const [theme, setTheme] = useState(init.theme);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSave = () => {
    if (!validate()) return;

    setSaving(true);
    setMessage('');
    try {
      saveSettings({
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
            <p id="api-key-help" className="text-[10px] text-text-muted mt-1">Your AI service API key (stored locally)</p>
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
