import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Counter = () => {
  const { expiresAt } = useSelector((state) => state.auth);
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = expiresAt - currentTime;

      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      setTimeRemaining({ minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [expiresAt]);

  return (
    <div>
      Time remaining: {timeRemaining.minutes}m {timeRemaining.seconds}s
    </div>
  );
};
