package hr.fer.progi.stopWaste.domain;


import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Setter
@Getter
@Entity
public class City {

   @Id
   private String cityName;

   @Column(unique = true, nullable = false)
   @NotNull
   private String idCity;

   @Override
   public String toString() {
      return "City{" +
              "CityName='" + cityName + '\'' +
              ", IdCity='" + idCity + '\'' +
              '}';
   }
}
