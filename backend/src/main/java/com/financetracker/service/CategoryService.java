package com.financetracker.service;

import com.financetracker.dto.CategoryRequest;
import com.financetracker.dto.CategoryResponse;
import com.financetracker.model.Category;
import com.financetracker.model.TransactionType;
import com.financetracker.model.User;
import com.financetracker.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public void initializeDefaultCategories(User user) {
        // Default income categories
        String[] incomeCategories = {"Salary", "Freelance", "Investment", "Business", "Gift", "Other"};
        for (String categoryName : incomeCategories) {
            Category category = new Category(user, categoryName, TransactionType.INCOME, true);
            categoryRepository.save(category);
        }

        // Default expense categories
        String[] expenseCategories = {"Food", "Transportation", "Housing", "Healthcare", "Entertainment",
                "Shopping", "Bills", "Education", "Travel", "Other"};
        for (String categoryName : expenseCategories) {
            Category category = new Category(user, categoryName, TransactionType.EXPENSE, true);
            categoryRepository.save(category);
        }
    }

    public List<CategoryResponse> getUserCategories(Long userId, TransactionType type) {
        List<Category> categories = categoryRepository.findByUserIdAndTypeOrderByNameAsc(userId, type);
        return categories.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<CategoryResponse> getAllUserCategories(Long userId) {
        List<Category> categories = categoryRepository.findByUserIdOrderByTypeAscNameAsc(userId);
        return categories.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public CategoryResponse createCategory(User user, CategoryRequest request) {
        if (categoryRepository.existsByUserIdAndNameAndType(user.getId(), request.getName(), request.getType())) {
            throw new RuntimeException("Category already exists");
        }

        Category category = new Category(user, request.getName(), request.getType(), false);
        Category savedCategory = categoryRepository.save(category);
        return convertToResponse(savedCategory);
    }

    public void deleteCategory(Long categoryId, User user) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        if (category.getIsDefault()) {
            throw new RuntimeException("Cannot delete default category");
        }

        categoryRepository.delete(category);
    }

    private CategoryResponse convertToResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getType(),
                category.getIsDefault()
        );
    }
}
