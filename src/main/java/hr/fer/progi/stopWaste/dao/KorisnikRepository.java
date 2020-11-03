package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;

<<<<<<< HEAD
=======
import java.util.Optional;

>>>>>>> origin/controllers
public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {

    int countBykIme (String kIme);

    int countByEmail (String email);

<<<<<<< HEAD
=======
    //Optional<Korisnik> findById(Long idK);

    Optional<Korisnik> findBykIme(String kIme);

>>>>>>> origin/controllers
}
