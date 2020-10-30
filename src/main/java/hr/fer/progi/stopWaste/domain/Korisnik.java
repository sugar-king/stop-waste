package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import org.springframework.lang.NonNull;

import javax.persistence.*;
//import javax.validation.constraints.NotNull;
//import javax.validation.constraints.Size;



@Entity
public class Korisnik {

    @Id
    @GeneratedValue
    private Long idK;

    @Column(unique=true, nullable=false)
    private String kIme;

    @Column(unique=true, nullable=false)
    private String email;

    @NotNull
    private String lozinka;

    @NotNull
    private String ime;


    private String prezime;

    public Long getIdK() {
        return idK;
    }

    public void setIdK(Long idK) {
        this.idK = idK;
    }

    public String getkIme() {
        return kIme;
    }

    public void setkIme(String kIme) {
        this.kIme = kIme;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    @Override
    public String toString() {
        return "Korisnik{" +
                "idK=" + idK +
                ", kIme='" + kIme + '\'' +
                ", email='" + email + '\'' +
                ", lozinka='" + lozinka + '\'' +
                ", ime='" + ime + '\'' +
                ", prezime='" + prezime + '\'' +
                '}';
    }
}
