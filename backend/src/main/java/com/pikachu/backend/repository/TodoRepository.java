package com.pikachu.backend.repository;

import com.pikachu.backend.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findAllByOrderByCreatedAtDesc();
    List<Todo> findByCompletedOrderByCreatedAtDesc(Boolean completed);

    @Query("SELECT t FROM todo t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Todo> findByTitleContainingIgnoreCase(@Param("title") String title);

}
