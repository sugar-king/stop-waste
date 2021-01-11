package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.Condition;
import hr.fer.progi.stopWaste.domain.ECondition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConditionRepository extends JpaRepository<Condition, Long> {
   Optional<Condition> findByConditionName(ECondition name);

}
