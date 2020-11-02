package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {

    int countBykIme (String kIme);

    int countByEmail (String email);

}
