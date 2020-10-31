package hr.fer.progi.stopWaste.rest;

import hr.fer.progi.stopWaste.domain.Korisnik;

public class RegistrirajKorisnikaDTO {

    private Korisnik korisnik;
    private String ponovljenaLozinka;

    public Korisnik getKorisnik() {
        return korisnik;
    }

    public void setKorisnik(Korisnik korisnik) {
        this.korisnik = korisnik;
    }

    public String getPonovljenaLozinka() {
        return ponovljenaLozinka;
    }

    public void setPonovljenaLozinka(String ponovljenaLozinka) {
        this.ponovljenaLozinka = ponovljenaLozinka;
    }
}
