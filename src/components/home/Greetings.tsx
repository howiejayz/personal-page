'use client';

import { Suspense, memo, useEffect, useMemo, useState } from 'react';

import { Skeleton } from '@nextui-org/skeleton';

import getLocalTime from '@/utils/getLocalTime';

import { GlowingText } from '../ui/';

export const Greetings = memo(function Greeting() {
  const getTimePeriod = (date: Date) => {
    const hour = Number(getLocalTime(date).split(':')[0]);

    if (hour >= 0 && hour < 5) return 'midnight';
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 19) return 'afternoon';
    return 'evening';
  };

  const [isMounted, setIsMounted] = useState(false);

  // Use useMemo to avoid unnecessary calculations
  const timePeriod = useMemo(() => getTimePeriod(new Date()), []);

  // Greetings and messages based on time period
  const greetings = {
    midnight: 'Hey, late owl',
    morning: 'Good morning',
    afternoon: 'Hello, afternoon',
    evening: 'Good evening',
  };

  const messages = {
    midnight: "Let's pretend staying up late is totally a good idea!",
    morning: 'Early bird gets worms, but second mouse gets cheese!',
    afternoon: 'Keep calm and fake productivity for a few more hours!',
    evening: "Let's relax and do absolutely nothing!",
  };

  // Set the component to mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Suspense key={isMounted ? 'local' : 'UTC'}>
      <Skeleton isLoaded={isMounted} className="rounded-lg">
        <h2 className="text-5xl sm:text-6xl font-extrabold">
          <GlowingText isActive className="mb-4">
            {greetings[timePeriod]}
          </GlowingText>
          <p className="text-xl font-semibold mb-4">{messages[timePeriod]}</p>
        </h2>
      </Skeleton>
    </Suspense>
  );
});
