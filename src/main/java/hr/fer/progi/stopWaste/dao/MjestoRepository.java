package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MjestoRepository extends JpaRepository<City, Long> {
}
