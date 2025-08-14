import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle }) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </>
  );
};

export default TodoList;
