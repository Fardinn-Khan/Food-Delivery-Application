package com.desibites.service;

import com.desibites.entity.Category;
import com.desibites.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;


    // Add Category
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }


    // Get All Categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }


    // Get Category By ID
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }


    // Delete Category
    public String deleteCategory(Long id) {
        categoryRepository.deleteById(id);
        return "Category deleted successfully";
    }
}