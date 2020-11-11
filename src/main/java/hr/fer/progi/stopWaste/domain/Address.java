package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Data
@Entity
//@Table(name = "addresses")
public class Address {

   @Id
   @GeneratedValue
   private Long idAddress;

   @NotNull
   private String street;

   @NotNull
   private String number;

   private String longitude;

   private String latitude;

   @ManyToOne
   @NotNull
   private City city;

   @Override
   public String toString() {
      return "Address{" +
              "idAddress=" + idAddress +
              ", street='" + street + '\'' +
              ", number='" + number + '\'' +
              ", longitude='" + longitude + '\'' +
              ", latitude='" + latitude + '\'' +
              ", city=" + city +
              '}';
   }
}
