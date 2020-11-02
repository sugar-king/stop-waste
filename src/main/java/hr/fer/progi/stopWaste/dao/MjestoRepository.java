package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.Mjesto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MjestoRepository extends JpaRepository<Mjesto, Long> {
}
