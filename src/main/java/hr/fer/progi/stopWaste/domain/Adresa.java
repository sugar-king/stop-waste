package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Adresa {

    @Id
    @GeneratedValue
    private Long idAdresa;

    @NotNull
    private String ulica;

    @NotNull
    private String kbr;

    @NotNull
    private String geoDuz;

    @NotNull
    private String geoSir;

    @OneToMany
    private Set<Korisnik> stanovnici;

    public Long getIdAdresa() {
        return idAdresa;
    }

    public void setIdAdresa(Long idAdresa) {
        this.idAdresa = idAdresa;
    }

    public String getUlica() {
        return ulica;
    }

    public void setUlica(String ulica) {
        this.ulica = ulica;
    }

    public String getKbr() {
        return kbr;
    }

    public void setKbr(String kbr) {
        this.kbr = kbr;
    }

    public String getGeoDuz() {
        return geoDuz;
    }

    public void setGeoDuz(String geoDuz) {
        this.geoDuz = geoDuz;
    }

    public String getGeoSir() {
        return geoSir;
    }

    public void setGeoSir(String geoSir) {
        this.geoSir = geoSir;
    }

    public Set<Korisnik> getStanovnici() {
        return stanovnici;
    }

    public void setStanovnici(Set<Korisnik> stanovnici) {
        this.stanovnici = stanovnici;
    }

    @Override
    public String toString() {
        return "Adresa{" +
                "idAdresa=" + idAdresa +
                ", ulica='" + ulica + '\'' +
                ", kbr='" + kbr + '\'' +
                ", geoDuz='" + geoDuz + '\'' +
                ", geoSir='" + geoSir + '\'' +
                ", stanovnici=" + stanovnici +
                '}';
    }
}
