import { useEffect, useState } from "react";
import { todoApi } from "../services/api";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, pending

  const loadTodos = async () => {
    try {
      let data;

      if (searchTerm.trim()) {
        data = await todoApi.searchTodos(searchTerm);
      } else if (filter === "completed") {
        data = await todoApi.getTodosByCompleted(true);
      } else if (filter === "pending") {
        data = await todoApi.getTodosByCompleted(false);
      } else {
        data = await todoApi.getAllTodos();
      }

      setTodos(data);
    } catch (err) {
      console.error("Error loading todos:", err);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await todoApi.getStats();
      setStats(statsData);
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  const createTodo = async (todoData) => {
    try {
      await todoApi.createTodo(todoData);
      await loadTodos();
      await loadStats();
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      await todoApi.updateTodo(id, todoData);
      await loadTodos();
      await loadStats();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      await todoApi.toggleTodoCompleted(id);
      await loadTodos();
      await loadStats();
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await todoApi.deleteTodo(id);
      await loadTodos();
      await loadStats();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  useEffect(() => {
    loadTodos();
    loadStats();
  }, []);

  useEffect(() => {
    loadTodos();
  }, [searchTerm, filter]);

  return {
    todos,
    stats,
    toggleTodo,
    updateTodo,
    deleteTodo,
    createTodo,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
  };
};

export default useTodos;
