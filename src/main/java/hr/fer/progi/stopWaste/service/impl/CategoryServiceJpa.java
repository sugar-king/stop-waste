package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.CategoryRepository;
import hr.fer.progi.stopWaste.domain.Category;
import hr.fer.progi.stopWaste.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryServiceJpa implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceJpa(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }
    @Override
    public List<Category> listAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category createCategory(String categoryName) {
        Category newCategory = new Category();
        newCategory.setCategoryName(categoryName);
        return categoryRepository.save(newCategory);
    }


}
