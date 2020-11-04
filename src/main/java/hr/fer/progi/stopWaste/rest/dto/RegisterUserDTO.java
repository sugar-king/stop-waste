package hr.fer.progi.stopWaste.rest.dto;

import hr.fer.progi.stopWaste.domain.Address;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterUserDTO {

    private String userName;
    private String email;
    private String name;
    private String surname;
    private Address address;
    private String password;


   /* public String getkIme() {
        return kIme;
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
    }*/
}
