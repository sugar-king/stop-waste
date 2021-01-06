package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.Ad;
import hr.fer.progi.stopWaste.domain.Condition;
import hr.fer.progi.stopWaste.domain.ECondition;
import hr.fer.progi.stopWaste.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdRepository extends JpaRepository<Ad, Long> {

    List<Ad> getAdByUserSeller_Username(String username);

    List<Ad> getAdByCondition_ConditionNameAndUserSeller_Username(ECondition condition, String username);

    List<Ad> getAdByCondition_ConditionNameAndUserBuyer_Username(ECondition condition, String username);
}
