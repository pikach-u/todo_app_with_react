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
    <li className={`todo-item ${todo.completed ? "todo-completed" : ""}`}>
      <div className="flex items-start gap-3">
        <button className="bg-red-100">완료</button>
        <div className="flex-grow">
          <h3
            className={`font-medium ${
              todo.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`text-sm mt-1 ${
                todo.completed ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {todo.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <Clock size={12} />
            <span>생성: {createdAt}</span>
            {createdAt !== updatedAt && <span>수정: {updatedAt}</span>}
          </div>
        </div>
        <div className="bg-blue-100">
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
