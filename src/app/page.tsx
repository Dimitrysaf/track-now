"use client";

import React, { useEffect, useState } from 'react';
import TermTracker from '@/components /TermTracker';

export default function GiantNDTracker() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startDate = new Date('2023-06-25').getTime();
    const endDate = new Date('2027-06-25').getTime();
    const now = new Date().getTime();

    const total = endDate - startDate;
    const elapsed = now - startDate;
    const currentProgress = Math.min(Math.max((elapsed / total) * 100, 0), 100);
    
    setProgress(currentProgress);
  }, []);

  return (
    <div>
      <TermTracker />
    </div>
  );
}