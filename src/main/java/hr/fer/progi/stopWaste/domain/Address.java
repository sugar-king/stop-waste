package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
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

   public Long getIdAddress() {
      return idAddress;
   }

   public void setIdAddress(Long idAddress) {
      this.idAddress = idAddress;
   }

   public String getStreet() {
      return street;
   }

   public void setStreet(String street) {
      this.street = street;
   }

   public String getNumber() {
      return number;
   }

   public void setNumber(String number) {
      this.number = number;
   }

   public String getLongitude() {
      return longitude;
   }

   public void setLongitude(String longitude) {
      this.longitude = longitude;
   }

   public String getLatitude() {
      return latitude;
   }

   public void setLatitude(String latitude) {
      this.latitude = latitude;
   }

   public City getCity() {
      return city;
   }

   public void setCity(City city) {
      this.city = city;
   }

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
