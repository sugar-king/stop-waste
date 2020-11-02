package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.Korisnik;
import hr.fer.progi.stopWaste.rest.RegistrirajKorisnikaDTO;

import java.util.List;


public interface KorisnikService {

    List<Korisnik> listAll();

    Korisnik stvoriKorisnika(Korisnik korisnik);

    Korisnik stvoriKorisnika(RegistrirajKorisnikaDTO korisnik);

}
