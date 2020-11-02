package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Adresa {

   @Id
   @GeneratedValue
   private Long idAdresa;

   @NotNull
   private String ulica;

   @NotNull
   private String kbr;

   private String geoDuz;

   private String geoSir;

   @ManyToOne
   @NotNull
   private Mjesto grad;

   public Mjesto getGrad() {
      return grad;
   }

   public void setGrad(Mjesto grad) {
      this.grad = grad;
   }

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


   @Override
   public String toString() {
      return "Adresa{" +
              "idAdresa=" + idAdresa +
              ", ulica='" + ulica + '\'' +
              ", kbr='" + kbr + '\'' +
              ", naselje='" + grad + '\'' +
              ", geoDuz='" + geoDuz + '\'' +
              ", geoSir='" + geoSir + '\'' +
              '}';
   }
}
