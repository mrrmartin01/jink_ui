import { useEffect, useState } from "react";

export function useCountdown(expiresAt: string) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    return Math.max(diff, 0);
  });

  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      setTimeLeft(Math.max(diff, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const isExpired = timeLeft <= 0;
  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { minutes, seconds, isExpired };
}
