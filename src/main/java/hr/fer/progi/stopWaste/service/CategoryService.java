package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.Category;

import java.util.List;

public interface CategoryService {
    List<Category> listAll();

    Category createCategory(Category category);

    Category createCategory(String categoryName);

}
