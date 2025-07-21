package com.financetracker.controller;

import com.financetracker.dto.CategoryRequest;
import com.financetracker.dto.CategoryResponse;
import com.financetracker.model.TransactionType;
import com.financetracker.model.User;
import com.financetracker.service.CategoryService;
import com.financetracker.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    private final CategoryService categoryService;
    private final UserService userService;

    public CategoryController(CategoryService categoryService, UserService userService) {
        this.categoryService = categoryService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        List<CategoryResponse> categories = categoryService.getAllUserCategories(user.getId());
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{type}")
    public ResponseEntity<List<CategoryResponse>> getCategoriesByType(
            @PathVariable TransactionType type,
            Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        List<CategoryResponse> categories = categoryService.getUserCategories(user.getId(), type);
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(
            @RequestBody CategoryRequest request,
            Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            CategoryResponse category = categoryService.createCategory(user, request);
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id, Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            categoryService.deleteCategory(id, user);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
