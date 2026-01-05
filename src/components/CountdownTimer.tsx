'use client';

import React, { useEffect, useState } from 'react';

interface CountdownProps {
  initialCountdown: {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  isLessThanTenDays: boolean;
}

const CountdownUnit = ({ value, unit }: { value: number, unit: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-base md:text-xs text-zinc-500 uppercase tracking-widest">{unit}</span>
    <span className="text-5xl md:text-4xl font-bold">{String(value).padStart(2, '0')}</span>
  </div>
);

const CountdownTimer: React.FC<CountdownProps> = ({ initialCountdown, isLessThanTenDays }) => {
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        let { years, months, days, hours, minutes, seconds } = prev;

        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          // This is a simplification and won't be perfectly accurate
          // when crossing month boundaries, but it's suitable for a ticking clock.
          // A full re-calculation would be needed for perfect accuracy.
          days = 29; 
          months--;
        }
        if (months < 0) {
          months = 11;
          years--;
        }

        return { years, months, days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center ${isLessThanTenDays ? 'text-blue-500' : 'text-white'}`}>
      {countdown.years > 0 && <CountdownUnit value={countdown.years} unit="ΕΤΟΣ" />}
      {countdown.months > 0 && <CountdownUnit value={countdown.months} unit="ΜΗΝΕΣ" />}
      {countdown.days > 0 && <CountdownUnit value={countdown.days} unit="ΗΜΕΡΕΣ" />}
      {countdown.hours > 0 && <CountdownUnit value={countdown.hours} unit="ΩΡΕΣ" />}
      {countdown.minutes > 0 && <CountdownUnit value={countdown.minutes} unit="ΛΕΠΤΑ" />}
      <CountdownUnit value={countdown.seconds} unit="ΔΕΥΤΕΡ." />
    </div>
  );
};

export default CountdownTimer;
