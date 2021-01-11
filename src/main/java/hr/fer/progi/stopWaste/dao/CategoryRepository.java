package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
