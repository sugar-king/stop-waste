package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.Korisnik;
import hr.fer.progi.stopWaste.rest.RegistrirajKorisnikaDTO;

import java.util.List;
import java.util.Optional;


public interface KorisnikService {

    List<Korisnik> listAll();

    Korisnik stvoriKorisnika(Korisnik korisnik);

    Korisnik stvoriKorisnika(RegistrirajKorisnikaDTO korisnik);

    // Optional<Korisnik> findById(Long idK);

    Optional<Korisnik> findBykIme(String kIme);

    void izmjenaKorisnika(String kIme , Korisnik korisnik);

}
