'use client';

import { useEffect } from 'react';
import { loadRealDataFromJSON } from '@/lib/client-db';
import DocumentVault from '@/components/drive/DocumentVault';

export default function VaultPage() {
  useEffect(() => {
    loadRealDataFromJSON();
  }, []);

  return <DocumentVault />;
}
