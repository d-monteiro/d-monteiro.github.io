
import { useState, useEffect } from 'react';
import { clock } from 'lucide-react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-PT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="flex items-center space-x-2 text-white text-sm">
      <clock size={16} className="text-blue-200" />
      <div className="text-right">
        <div className="font-mono leading-tight">{formatTime(time)}</div>
        <div className="text-xs text-blue-200 leading-tight">{formatDate(time)}</div>
      </div>
    </div>
  );
};

export default Clock;
