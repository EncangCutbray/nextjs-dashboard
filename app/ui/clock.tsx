import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    console.log('Render Clock Component');
    
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-10 bg-gray-900 text-white">
      <div className="text-2xl font-mono p-4 bg-gray-800 rounded-lg shadow-lg">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Clock;
