package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.Korisnik;

import java.util.List;

public interface KorisnikService {

    List<Korisnik> listAll();

    //Korisnik stvoriKorisnika(Korisnik korisnik);

    Korisnik stvoriKorisnika(Korisnik korisnik, String ponovljenaLozinka);

    //Korisnik registrirajKorisnika(Korisnik korisnik, String ponovljenaLozinka);

}
