import { useEffect, useState } from "react";
import { todoApi } from "../services/api";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  const loadTodos = async () => {
    try {
      const data = await todoApi.getAllTodos();
      setTodos(data);
    } catch (err) {
      console.error("Error loading todos: ", err);
    }
  };
  const loadStats = async () => {
    try {
      const statsData = await todoApi.getStats();
      setStats(statsData);
    } catch (err) {
      console.error("Error loading stats: ", err);
    }
  };

  useEffect(() => {
    loadTodos(); //get요청 실행
    loadStats();
  }, []);

  return { todos, stats };
};

export default useTodos;
