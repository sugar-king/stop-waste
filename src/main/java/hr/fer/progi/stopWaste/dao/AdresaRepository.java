package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.Adresa;
import hr.fer.progi.stopWaste.domain.Mjesto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdresaRepository extends JpaRepository<Adresa, Long> {
}
