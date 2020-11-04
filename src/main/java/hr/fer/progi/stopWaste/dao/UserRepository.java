package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    int countByUserName (String userName);

    int countByEmail (String email);

    //Optional<Korisnik> findById(Long idK);

    Optional<User> findByUserName(String kIme);

}
