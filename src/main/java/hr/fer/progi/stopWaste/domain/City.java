package hr.fer.progi.stopWaste.domain;


import com.sun.istack.NotNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class City {

   @Id
   private String CityName;

   @Column(unique = true, nullable = false)
   @NotNull
   private String IdCity;

   public String getCityName() {
      return CityName;
   }

   public void setCityName(String cityName) {
      CityName = cityName;
   }

   public String getIdCity() {
      return IdCity;
   }

   public void setIdCity(String idCity) {
      IdCity = idCity;
   }

   @Override
   public String toString() {
      return "City{" +
              "CityName='" + CityName + '\'' +
              ", IdCity='" + IdCity + '\'' +
              '}';
   }
}
