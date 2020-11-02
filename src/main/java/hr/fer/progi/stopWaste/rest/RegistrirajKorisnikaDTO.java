package hr.fer.progi.stopWaste.rest;

import hr.fer.progi.stopWaste.domain.Adresa;

public class RegistrirajKorisnikaDTO {

    private String kIme;
    private String email;
    private String ime;
    private String prezime;
    private Adresa adresa;
    private String lozinka;


    public String getkIme() {
        return kIme;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setkIme(String kIme) {
        this.kIme = kIme;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public Adresa getAdresa() {
        return adresa;
    }

    public void setAdresa(Adresa adresa) {
        this.adresa = adresa;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }
}
