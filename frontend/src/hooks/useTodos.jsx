import { useEffect, useState } from "react";
import { todoApi } from "../services/api";

const useTodos = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  const loadStats = async () => {
    try {
      const statsData = await todoApi.getStats();
      setStats(statsData);
    } catch (err) {
      console.error("Error loading stats: ", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return { stats };
};

export default useTodos;
