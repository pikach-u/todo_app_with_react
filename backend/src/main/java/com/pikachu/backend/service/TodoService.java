package com.pikachu.backend.service;

import com.pikachu.backend.dto.TodoDto;
import com.pikachu.backend.dto.TodoResponseDto;
import com.pikachu.backend.model.Todo;
import com.pikachu.backend.repository.TodoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoService {
    private final TodoRepository todoRepository;

    public TodoResponseDto createTodo(TodoDto dto) {
        Todo todo = new Todo(dto.getTitle(), dto.getDescription());
        Todo savedTodo = todoRepository.save(todo);
        return TodoResponseDto.fromEntity(savedTodo);
    }

    public List<TodoResponseDto> getAllTodos() {
        return todoRepository.findAllByOrderByCreatedAtDesc().stream().map(TodoResponseDto::fromEntity).toList();
    }

    public List<TodoResponseDto> getTodosByCompleted(Boolean completed) {
        return todoRepository.findByCompletedOrderByCreatedAtDesc(completed).stream().map(TodoResponseDto::fromEntity).toList();
    }
}
