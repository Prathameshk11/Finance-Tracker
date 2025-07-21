package com.financetracker.repository;

import com.financetracker.model.Category;
import com.financetracker.model.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUserIdAndTypeOrderByNameAsc(Long userId, TransactionType type);
    List<Category> findByUserIdOrderByTypeAscNameAsc(Long userId);
    boolean existsByUserIdAndNameAndType(Long userId, String name, TransactionType type);
}
