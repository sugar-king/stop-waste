package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.Korisnik;
import hr.fer.progi.stopWaste.rest.RegistrirajKorisnikaDTO;

import java.util.List;
<<<<<<< HEAD
=======
import java.util.Optional;
>>>>>>> origin/controllers


public interface KorisnikService {

    List<Korisnik> listAll();

    Korisnik stvoriKorisnika(Korisnik korisnik);

    Korisnik stvoriKorisnika(RegistrirajKorisnikaDTO korisnik);

<<<<<<< HEAD
=======
    // Optional<Korisnik> findById(Long idK);

    Optional<Korisnik> findBykIme(String kIme);

    void izmjenaKorisnika(String kIme , Korisnik korisnik);

>>>>>>> origin/controllers
}
