package com.pikachu.backend.controller;

import com.pikachu.backend.dto.TodoDto;
import com.pikachu.backend.dto.TodoResponseDto;
import com.pikachu.backend.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoResponseDto> createTodo(@Valid @RequestBody TodoDto dto) {
        TodoResponseDto createTodo = todoService.createTodo(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createTodo);
    }

    @GetMapping
    public ResponseEntity<List<TodoResponseDto>> getAllTodos(
            @RequestParam(required = false) Boolean completed,
            @RequestParam(required = false) String search
    ) {
        List<TodoResponseDto> todos;

        if (search != null && !search.trim().isEmpty()) {
            todos = todoService.searchTodosByTitle(search);
        } else if (completed != null) {
            todos = todoService.getTodosByCompleted(completed);
        } else {
            todos = todoService.getAllTodos();
        }
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoResponseDto> getTodoById(@PathVariable Long id) {
        TodoResponseDto todo = todoService.getTodoById(id);
        return ResponseEntity.ok(todo);
    }
}
