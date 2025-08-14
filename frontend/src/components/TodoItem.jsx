import { Clock } from "lucide-react";

const TodoItem = ({ todo }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const createdAt = formatDate(todo.createdAt);
  const updatedAt = formatDate(todo.updatedAt);

  return (
    <li>
      <div>
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
        <div>
          <Clock size={12} />
          <span>생성: {createdAt}</span>
          {createdAt !== updatedAt && <span>수정: {updatedAt}</span>}
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
