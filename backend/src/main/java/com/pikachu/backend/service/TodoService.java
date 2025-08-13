package com.pikachu.backend.service;

import com.pikachu.backend.dto.TodoDto;
import com.pikachu.backend.dto.TodoResponseDto;
import com.pikachu.backend.dto.TodoUpdateDto;
import com.pikachu.backend.model.Todo;
import com.pikachu.backend.repository.TodoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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

    public List<TodoResponseDto> searchTodosByTitle(String title) {
        return todoRepository.findByTitleContainingIgnoreCase(title).stream().map(TodoResponseDto::fromEntity).toList();
    }

    public TodoResponseDto getTodoById(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new NoSuchElementException("할 일을 찾을 수 없습니다."));
        return TodoResponseDto.fromEntity(todo);
    }

    public TodoResponseDto updateTodo(Long id, TodoUpdateDto dto){
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new NoSuchElementException("할 일을 찾을 수 없습니다."));
        if(dto.getTitle() != null && !dto.getTitle().trim().isEmpty()){
            todo.setTitle(dto.getTitle());
        }

        if(dto.getDescription() != null) {
            todo.setDescription(dto.getDescription());
        }

        if(dto.getCompleted() != null) {
            todo.setCompleted(dto.getCompleted());
        }

        Todo updatedTodo = todoRepository.save(todo);
        return TodoResponseDto.fromEntity(updatedTodo);
    }

    public TodoResponseDto toggleTodoCompleted(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new NoSuchElementException("할 일을 찾을 수 없습니다"));

        todo.setCompleted(!todo.getCompleted());
        Todo updatedTodo = todoRepository.save(todo);
        return TodoResponseDto.fromEntity(updatedTodo);
    }
}
