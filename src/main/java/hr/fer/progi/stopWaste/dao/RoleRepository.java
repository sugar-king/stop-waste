package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.ERole;
import hr.fer.progi.stopWaste.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
   Optional<Role> findByName(ERole name);
}
