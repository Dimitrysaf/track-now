'use client';

import React, { useEffect, useState } from 'react';

const CenterColumn = () => {
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date('2023-06-25').getTime();
    const endDate = new Date('2027-06-25').getTime();

    const calculateProgress = () => {
        const now = new Date().getTime();
        const totalDuration = endDate - startDate;
        const elapsed = now - startDate;
        const currentProgress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
        setProgress(currentProgress);
    }

    const calculateCountdown = () => {
        const now = new Date();
        const end = new Date('2027-06-25');
        
        let years = end.getFullYear() - now.getFullYear();
        let months = end.getMonth() - now.getMonth();
        let days = end.getDate() - now.getDate();
        let hours = end.getHours() - now.getHours();
        let minutes = end.getMinutes() - now.getMinutes();
        let seconds = end.getSeconds() - now.getSeconds();

        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        setCountdown({ years, months, days, hours, minutes, seconds });
    }
    
    calculateProgress();
    calculateCountdown();

    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const CountdownUnit = ({ value, unit }: { value: number, unit: string }) => (
    <div className="flex flex-col items-center">
        <span className="text-[clamp(1.5rem,5vw,2.25rem)] font-bold">{String(value).padStart(2, '0')}</span>
        <span className="text-[clamp(0.6rem,1.5vw,0.75rem)] text-zinc-500 uppercase tracking-widest">{unit}</span>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white overflow-hidden">
      <div className="absolute inset-0 bg-blue-900/5 radial-gradient" />
      <div className="relative w-full h-screen flex flex-col items-center justify-around">
        <div className="flex flex-col items-center">
            <div className="w-full max-w-[95vw] h-[50vh] md:h-[60vh] relative">
              <svg 
                viewBox="0 0 200 100" 
                className="w-full h-full drop-shadow-[0_0_50px_rgba(0,69,136,0.3)]"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="wave-filter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.015 0.03" numOctaves="1" result="warp">
                      <animate attributeName="baseFrequency" values="0.015 0.03; 0.015 0.12; 0.015 0.03" dur="10s" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="warp" scale="8" />
                  </filter>
                  <mask id="nd-mask-massive">
                    <text 
                      x="50%" 
                      y="85" 
                      textAnchor="middle" 
                      fontSize="100" 
                      fontWeight="950" 
                      fill="white"
                      style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.05em' }}
                    >
                      ΝΔ
                    </text>
                  </mask>
                </defs>
                <text 
                  x="50%" 
                  y="85" 
                  textAnchor="middle" 
                  fontSize="100" 
                  fontWeight="950" 
                  className="fill-zinc-900/80"
                  style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.05em' }}
                >
                  ΝΔ
                </text>
                <g mask="url(#nd-mask-massive)">
                  <rect 
                    x="-20" 
                    y={100 - progress} 
                    width="240" 
                    height="120" 
                    fill="#004588"
                    filter="url(#wave-filter)"
                    className="transition-all duration-1000 ease-in-out"
                  />
                </g>
              </svg>
            </div>
            <div className="-mt-8 md:-mt-16 flex flex-col items-center z-10 w-full">
            <h1 className="scroll-m-20 text-center text-8xl font-extrabold tracking-tight text-balance">
                {progress.toFixed(1)}%
              </h1>
              <div className="mt-4 md:mt-6 flex items-center justify-center gap-3 md:gap-6 w-full">
                <span className="h-px w-16 md:w-24 bg-zinc-800" />
                <div className="text-center flex-shrink-0">
                  <p className="text-white font-bold tracking-widest text-[clamp(0.6rem,2vw,0.875rem)] uppercase">ΝΕΑ ΔΗΜΟΚΡΑΤΙΑ</p>
                  <p className="text-zinc-500 uppercase tracking-[0.2em] md:tracking-[0.4em] text-[clamp(0.4rem,1.5vw,0.5625rem)] mt-1 font-bold">
                    ΧΡΟΝΟΣ ΘΗΤΕΙΑΣ
                  </p>
                </div>
                <span className="h-px w-16 md:w-24 bg-zinc-800" />
              </div>
            </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-white">
            <CountdownUnit value={countdown.years} unit="ΕΤΟΣ" />
            <CountdownUnit value={countdown.months} unit="ΜΗΝΕΣ" />
            <CountdownUnit value={countdown.days} unit="ΗΜΕΡΕΣ" />
            <CountdownUnit value={countdown.hours} unit="ΩΡΕΣ" />
            <CountdownUnit value={countdown.minutes} unit="ΛΕΠΤΑ" />
            <CountdownUnit value={countdown.seconds} unit="ΔΕΥΤΕΡ." />
        </div>
      </div>
    </div>
  );
};

export default CenterColumn;
