const TodoItem = ({ todo }) => {
  return (
    <li>
      <div>
        <h3>{todo.title}</h3>
      </div>
    </li>
  );
};

export default TodoItem;
