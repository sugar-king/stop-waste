package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.Ad;
import hr.fer.progi.stopWaste.domain.ECondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdRepository extends JpaRepository<Ad, Long> {

    List<Ad> getAdsByUserSeller_Username(String username);

    List<Ad> getAdsByCondition_ConditionNameAndUserSeller_Username(ECondition condition, String username);

    List<Ad> getAdsByCondition_ConditionNameAndUserBuyer_Username(ECondition condition, String username);

    List<Ad> getAdsByCondition_ConditionName(ECondition condition);

    List<Ad> getAdsByUserBuyer_UsernameOrUserSeller_Username(String usernameBuyer, String usernameSeller);
}
